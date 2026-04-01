# Book Reader

## Features

- **PDF Text Extraction** - Server-side PDF parsing using pdfplumber with text reconstruction
- **Book-like Formatting** - Proper paragraph handling (hyphenation repair, line break fixing)
- **Dynamic Pagination** - Height-based pagination for consistent reading experience
- **Customizable Themes** - Dark (default), Sepia, and Soft Gray themes
- **Typography Controls** - Adjustable font size, line height, and font family
- **Navigation** - Arrow keys for page navigation, space for next page
- **Reading Progress** - Persistent reading position and progress bar
- **Settings Panel** - Theme and typography controls with easy access

## Tech Stack

### Frontend
- **Astro** - Static site generator and meta-framework
- **React** - UI components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Nanostores** - Lightweight state management

### Backend
- **FastAPI** - Python web framework
- **pdfplumber** - PDF text extraction
- **Uvicorn** - ASGI server
- **Python** - Text processing pipeline

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
├── src/                       # Astro/React frontend
│   ├── components/
│   │   ├── Reader/
│   │   │   ├── BookReader.tsx      # Main component
│   │   │   ├── PageView.tsx        # Renders pages
│   │   │   ├── PageControls.tsx    # Navigation arrows
│   │   │   └── ProgressBar.tsx     # Reading progress
│   │   ├── Config/
│   │   │   └── SettingsPanel.tsx   # Theme/font settings
│   │   └── UI/
│   │       └── FileUploader.tsx     # PDF upload
│   ├── stores/
│   │   └── readerStore.ts           # Nanostores state
│   ├── utils/
│   │   ├── pagination.ts           # Height pagination
│   │   └── textProcessor.ts        # Legacy text utils
│   ├── pages/
│   │   └── index.astro             # Main page
│   ├── layouts/
│   │   └── Layout.astro            # HTML layout
│   └── styles/
│       └── global.css              # Tailwind CSS
└── package.json                    # Node dependencies
```

## Getting Started

### Prerequisites
- Node.js 22+
- Python 3.11+
- [uv](https://github.com/astral-sh/uv) for Python package management

### Setup

1. **Install frontend dependencies:**
```sh
npm install
```

2. **Install backend dependencies:**
```sh
cd backend
uv sync
```

### Running the Application

1. **Start the backend server** (Terminal 1):
```sh
cd backend
uv run uvicorn main:app --reload --port 8000
```

2. **Start the frontend dev server** (Terminal 2):
```sh
npm run dev
```

3. Open `http://localhost:4321` in your browser

## Commands

### Frontend
| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `npm install`             | Install dependencies                       |
| `npm run dev`             | Start dev server at `localhost:4321`       |
| `npm run build`           | Build production site to `./dist/`         |
| `npm run preview`         | Preview build locally                      |

### Backend
| Command                      | Action                              |
| :--------------------------- | :---------------------------------- |
| `cd backend && uv sync`     | Install Python dependencies        |
| `cd backend && uv run uvicorn main:app --reload` | Start API server |

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

## Theme Options

- **Dark** (default) - Easy on the eyes for low-light reading
- **Sepia** - Warm, classic book feel
- **Soft Gray** - Clean, minimal look

## TODO

- [ ] Extract images from PDF
- [ ] Extract tables from PDF
- [ ] Add database for extraction history
- [ ] Add async processing for large PDFs
- [ ] Add caching for repeated extractions