import tempfile
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models import ExtractionResponse, ExtractedPage
from app.extract import pdf_processor, text_processor


router = APIRouter(prefix="/api")


@router.post("/extract", response_model=ExtractionResponse)
async def extract_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = Path(tmp.name)
    
    try:
        raw_pages = pdf_processor.extract_text_from_pdf(tmp_path)
        
        pages = []
        for raw_page in raw_pages:
            processed_content = text_processor.process_page_content(raw_page["content"])
            pages.append(ExtractedPage(
                page_num=raw_page["page_num"],
                content=processed_content or "[No text content on this page]"
            ))
        
        return ExtractionResponse(
            file_name=file.filename,
            total_pages=len(pages),
            pages=pages
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")
    finally:
        tmp_path.unlink(missing_ok=True)