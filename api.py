from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import main

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Student(BaseModel):
    name: str
    surname: str
    year: int
    ID: str
    GPA: float

@app.get("/api/sysinfo")
def get_sysinfo():
    return JSONResponse(content=main.get_sysinfo())

@app.get("/api/students")
def get_all_students():
    return main.get_all_students()

@app.post("/api/add_student")
def add_student(student: Student):
    return main.add_student(student.name, student.surname, student.year, student.ID, student.GPA)