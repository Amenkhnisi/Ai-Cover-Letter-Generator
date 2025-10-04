from pydantic import BaseModel
from typing import Optional


class GenerateRequest(BaseModel):
    resume_text: str
    job_description: str
    tone_hint: Optional[str] = ""


class GenerateResponse(BaseModel):
    cover_letter: str
    bullets: str


class JDOnlyRequest(BaseModel):
    job_description: str
