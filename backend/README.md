# Book Reader Backend

FastAPI backend for PDF text extraction.

## Quick Start

```sh
uv sync
uv run uvicorn main:app --reload --port 8000
```

The API runs at `http://localhost:8000`

## API Endpoints

### POST /api/extract
Extract text from a PDF file.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF file)

**Response:**
```json
{
  "file_name": "document.pdf",
  "total_pages": 42,
  "pages": [
    { "page_num": 1, "content": "..." },
    { "page_num": 2, "content": "..." }
  ]
}
```

### GET /health
Health check endpoint.

## Dependencies

- FastAPI
- Uvicorn
- pdfplumber
- Pydantic