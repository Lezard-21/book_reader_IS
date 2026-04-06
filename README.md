# Book Reader

This application is an experiment to learn how to use AI in programming. Here are my thoughts:

    In fact, AI is very useful to make something usable, but it doesn't make it all by itself.
    To have the context of the generated code, it is necessary to generate blocks of code in small pieces.
    It is necessary to make a methodology for generating the blocks of code efficiently.


A full-stack PDF reading application with server-side text extraction and a book-like reading experience.

## Overview

Book Reader consists of:
- **Frontend**: An Astro/React app for displaying PDFs in a book-reading format
- **Backend**: A FastAPI service for extracting text from PDF files

## Tech Stack

### Frontend
- Astro (static site generator + meta-framework)
- React (UI components)
- TypeScript
- Tailwind CSS
- Nanostores (state management)

### Backend
- FastAPI (Python web framework)
- pdfplumber (PDF text extraction)
- Uvicorn (ASGI server)

## Project Structure

```
book_reader/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── extract/
│   │   │   ├── pdf_processor.py    # PDF text extraction
│   │   │   └── text_processor.py   # Text cleaning pipeline
│   │   ├── models.py              # Pydantic models
│   │   └── router.py              # API endpoints
│   ├── main.py                    # FastAPI app entry point
│   └── pyproject.toml             # Python dependencies (uv)
├── frontend/                     # Astro/React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Reader/            # Book reading components
│   │   │   ├── Config/            # Settings panel
│   │   │   └── UI/                # File uploader
│   │   ├── stores/                # Nanostores state
│   │   ├── utils/                 # Pagination utilities
│   │   ├── pages/                 # Astro pages
│   │   ├── layouts/               # HTML layouts
│   │   └── styles/                # Global styles
│   └── package.json
└── README.md
```

## Features

- **PDF Text Extraction** - Server-side PDF parsing using pdfplumber
- **Book-like Formatting** - Proper paragraph handling (hyphenation repair, line break fixing)
- **Dynamic Pagination** - Height-based pagination for consistent reading
- **Customizable Themes** - Dark, Sepia, and Soft Gray themes
- **Typography Controls** - Adjustable font size, line height, and font family
- **Navigation** - Arrow keys for page navigation, space for next page
- **Reading Progress** - Persistent reading position and progress bar
- **Settings Panel** - Theme and typography controls

## Prerequisites

- Node.js 22+
- Python 3.11+
- [uv](https://github.com/astral-sh/uv) for Python package management

## Setup

1. **Install frontend dependencies:**
```sh
cd frontend
npm install
```

2. **Install backend dependencies:**
```sh
cd backend
uv sync
```

## Running the Application

1. **Start the backend server** (Terminal 1):
```sh
cd backend
uv run uvicorn main:app --reload --port 8000
```

2. **Start the frontend dev server** (Terminal 2):
```sh
cd frontend
npm run dev
```

3. Open `http://localhost:4321` in your browser

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

## Keyboard Controls

- **Space** - Next page
- **Left Arrow** - Previous page
- **Right Arrow** - Next page
- **Up/Down Arrows** - Scroll within current page
- **Escape** - Close settings panel

## Commands

### Frontend
| Command           | Action                              |
| :---------------- | :--------------------------------- |
| `npm install`     | Install dependencies               |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/` |
| `npm run preview` | Preview build locally              |

### Backend
| Command                              | Action                    |
| :----------------------------------- | :------------------------ |
| `cd backend && uv sync`             | Install Python dependencies |
| `cd backend && uv run uvicorn main:app --reload` | Start API server |
