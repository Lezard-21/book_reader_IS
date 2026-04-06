import pdfplumber
from pathlib import Path


def extract_text_from_pdf(file_path: Path) -> list[dict]:
    pages = []
    
    with pdfplumber.open(file_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            
            pages.append({
                "page_num": page_num,
                "content": text,
            })
    
    return pages