from fastapi import APIRouter, UploadFile, File, HTTPException


router = APIRouter(prefix="/parse", tags=["Parse"])


@router.post("/resume-text")
async def resume_text(file: UploadFile = File(...)):
    # Minimal stub: expect .txt now; you can add PDF/DOCX parsing later
    if not file.filename.lower().endswith(".txt"):
     raise HTTPException(400, detail="For now, upload .txt resumes.")
    content = (await file.read()).decode("utf-8", errors="ignore")
    return {"text": content}