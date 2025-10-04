from contextlib import asynccontextmanager
import asyncio
from functools import lru_cache
import logging
from typing import Optional
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi import Limiter
from fastapi import APIRouter, HTTPException, Request, Depends
from app.deps import verify_api_key
from ..schemas import GenerateRequest, GenerateResponse
from ..prompts import (
    COVER_LETTER_USER_TEMPLATE, RESUME_BULLETS_USER_TEMPLATE,)
from ..openai_client import get_client
import re

router = APIRouter(prefix="/generate", tags=["Generate"])

SAFE_MIN = 50

# basic prompt hygiene
FORBIDDEN = re.compile(
    r"(password|ssn|social\s*security|credit\s*card|api\s*key)", re.I)


def sanitize(text: str) -> str:
    if FORBIDDEN.search(text or ""):
        raise HTTPException(422, detail="Sensitive secrets detected in input.")
    return text.strip()


# Initialize limiter
limiter = Limiter(key_func=get_remote_address)

# Configure logging
logger = logging.getLogger(__name__)

# Constants
SAFE_MIN = 200
MAX_RESUME_LENGTH = 1000
MAX_JD_LENGTH = 500
REQUEST_TIMEOUT = 30  # seconds


# Cached client - reuse across requests
@lru_cache()
def get_cached_client():
    return get_client()


# Dependency for rate limiting per API key
async def get_rate_limit_key(
    request: Request,
    api_key: str = Depends(verify_api_key)
) -> str:
    """
    Rate limit by API key if available, otherwise by IP
    """
    if api_key:
        return f"api_key:{api_key}"
    return get_remote_address(request)


# Async timeout wrapper
async def generate_with_timeout(func, *args, timeout=REQUEST_TIMEOUT, **kwargs):
    """
    Execute generation with timeout protection
    """
    try:
        return await asyncio.wait_for(
            asyncio.to_thread(func, *args, **kwargs),
            timeout=timeout
        )
    except asyncio.TimeoutError:
        logger.error(f"Request timeout after {timeout}s")
        raise HTTPException(
            status_code=504,
            detail="Request timeout. Please try again with shorter content."
        )


# Main route with multiple protection layers
@router.post(
    "/all",
    response_model=GenerateResponse,
    dependencies=[Depends(verify_api_key)]
)
@limiter.limit("1/minute")  # 1 requests per minute per IP
@limiter.limit("100/hour")   # 10 requests per hour per IP
async def generate_all(
    request: Request,
    req: GenerateRequest,
    rate_limit_key: str = Depends(get_rate_limit_key)
):
    """
    Generate cover letter and resume bullets with rate limiting and timeout protection.

    Rate limits:
    - 10 requests per minute
    - 10 requests per hour
    - Per IP address or API key
    """
    try:
        # Sanitize inputs
        resume = sanitize(req.resume_text)
        jd = sanitize(req.job_description)
        tone = sanitize(req.tone_hint or "balanced professional")

        # Additional validation after sanitization
        if len(resume) < SAFE_MIN or len(jd) < SAFE_MIN:
            raise HTTPException(
                status_code=422,
                detail=f"Resume and job description must be at least {SAFE_MIN} characters after sanitization."
            )

        # Get cached client
        client = get_cached_client()

        # Generate cover letter with timeout
        logger.info(
            f"Generating cover letter for rate_limit_key: {rate_limit_key[:50]}...")

        cl_user = (
            COVER_LETTER_USER_TEMPLATE
            .replace("{{RESUME}}", resume)
            .replace("{{JD}}", jd)
            .replace("{{TONE}}", tone)
        )

        cl = await generate_with_timeout(
            client.models.generate_content,
            model="gemini-2.5-flash",
            contents=cl_user,
            config={
                "temperature": 0.5,
                "topP": 0.95,
                "maxOutputTokens": 2048,  # Limit output size
            }
        )

        cover_letter = cl.text.strip() if cl and cl.text else ""

        if not cover_letter:
            logger.error("Empty cover letter generated")
            raise HTTPException(
                status_code=500,
                detail="Failed to generate cover letter. Please try again."
            )

        # Generate resume bullets with timeout
        logger.info(
            f"Generating resume bullets for rate_limit_key: {rate_limit_key[:50]}...")

        rb_user = (
            RESUME_BULLETS_USER_TEMPLATE
            .replace("{{RESUME}}", resume)
            .replace("{{JD}}", jd)
        )

        rb = await generate_with_timeout(
            client.models.generate_content,
            model="gemini-2.5-flash",
            contents=rb_user,
            config={
                "temperature": 0.5,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            }
        )

        bullets_text = rb.text.strip() if rb and rb.text else ""

        if not bullets_text:
            logger.error("Empty bullets generated")
            raise HTTPException(
                status_code=500,
                detail="Failed to generate resume bullets. Please try again."
            )

        # Clean up bullets formatting
        bullets = bullets_text.replace("\n\n", "\n").strip()

        logger.info(
            f"Successfully generated content for rate_limit_key: {rate_limit_key[:10]}...")

        return GenerateResponse(
            cover_letter=cover_letter,
            bullets=bullets
        )

    except RateLimitExceeded as e:
        logger.warning(f"Rate limit exceeded for {rate_limit_key[:10]}...")
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Please try again later.",
            headers={"Retry-After": str(e.retry_after)
                     if hasattr(e, 'retry_after') else "60"}
        )

    except HTTPException:
        raise

    except Exception as e:
        logger.error(
            f"Unexpected error in generate_all: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later."
        )
