from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from slowapi import Limiter, _rate_limit_exceeded_handler
from fastapi.responses import JSONResponse
from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

# from .security import IPBlockMiddleware
from .routers import generate, parse
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="AI Resume + Cover Letter Generator API")


# Initialize limiter
limiter = Limiter(key_func=get_remote_address,
                  default_limits=["200/day", "50/hour"])


# Add SlowAPI middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Custom rate limit exceeded handler


@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Rate limit exceeded. Please slow down your requests.",
            "retry_after": getattr(exc, 'retry_after', 60)
        },
        headers={"Retry-After": str(getattr(exc, 'retry_after', 60))}
    )

origins = (os.getenv("ALLOWED_ORIGINS"))
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(generate.router)
app.include_router(parse.router)
# app.add_middleware(IPBlockMiddleware, max_failures=10, block_duration=3600)


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok"}
