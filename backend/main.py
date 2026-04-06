from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.router import router
from app.models import HealthResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting Book Reader API...")
    yield
    print("Shutting down Book Reader API...")


app = FastAPI(
    title="Book Reader API",
    description="PDF text extraction backend",
    version="0.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="healthy", version="0.1.0")