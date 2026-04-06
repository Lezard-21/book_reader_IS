from pydantic import BaseModel


class ExtractedPage(BaseModel):
    page_num: int
    content: str


class ExtractionResponse(BaseModel):
    file_name: str
    total_pages: int
    pages: list[ExtractedPage]


class HealthResponse(BaseModel):
    status: str
    version: str