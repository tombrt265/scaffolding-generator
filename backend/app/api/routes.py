from fastapi import APIRouter, UploadFile, File
from app.api.pdf_utils import extract_text_from_pdf

router = APIRouter()

@router.post("/extract-study-material")
async def extract_study_material(file: UploadFile = File(...)):
    content = await file.read()
    return {"text": extract_text_from_pdf(content)}