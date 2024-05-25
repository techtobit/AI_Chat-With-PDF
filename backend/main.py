from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import fitz  # PyMuPDF
import os
import uuid

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Models
class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    upload_date = Column(DateTime, default=datetime.utcnow)
    text_content = Column(Text)

Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Upload PDF Endpoint
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...), db: SessionLocal = Depends(get_db)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    file_path = f"uploads/{uuid.uuid4()}.pdf"
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # Extract text from PDF
    doc = fitz.open(file_path)
    text_content = ""
    for page in doc:
        text_content += page.get_text()

    # Save document metadata and text content to database
    db_document = Document(filename=file.filename, text_content=text_content)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)

    return {"id": db_document.id, "filename": db_document.filename}

# Question Answer Endpoint
@app.post("/ask/")
async def ask_question(document_id: int, question: str, db: SessionLocal = Depends(get_db)):
    # Fetch the document text from database
    document = db.query(Document).filter(Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    # Process the question and document content to generate answer
    # Placeholder for NLP processing with LangChain/LLamaIndex
    answer = f"Processed answer for the question: {question} based on document ID: {document_id}"

    return {"question": question, "answer": answer}
