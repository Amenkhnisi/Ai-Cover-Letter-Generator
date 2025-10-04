from pydantic import BaseModel, Field
from typing import Optional

class GenerateRequest(BaseModel):
    resume_text: str = Field(min_length=50)
    job_description: str = Field(min_length=50)
    tone_hint: Optional[str] = ""

class GenerateResponse(BaseModel):
    cover_letter: str
    bullets: str
    
class JDOnlyRequest(BaseModel):
    job_description: str = Field(min_length=50)