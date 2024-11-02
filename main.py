import json
import os
import platform
import psutil
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "test.json")

class Student:
    def __init__(self, name, surname, year, ID, GPA):
        self.name = str(name)
        self.surname = str(surname)
        self.year = int(year)
        self.ID = str(ID)
        self.GPA = float(GPA)

    def to_dict(self):
        return {
            'name': self.name,
            'surname': self.surname,
            'year': self.year,
            'ID': self.ID,
            'GPA': self.GPA
        }

def load_students():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []
    return []

def save_students(students):
    with open(DATA_FILE, 'w') as file:
        json.dump(students, file, indent=4)

def add_student(name, surname, year, ID, GPA):
    # print(f"name: {name}")
    # print(f"surname: {surname}")
    # print(f"year: {year}")
    # print(f"ID: {ID}")
    # print(f"GPA: {GPA}")

    students = load_students()
    student = Student(name, surname, year, ID, GPA)
    students.append(student.to_dict())
    save_students(students)
    return 1

def get_all_students():
    return load_students()

def get_sysinfo():
    info = {
            "hostname": platform.node(),
            "platform": platform.system(),
            "arch": platform.machine(),
            "release": platform.release(),
            "uptime": time.time() - psutil.boot_time(),
            "totalMemory": psutil.virtual_memory().total / 1_000_000,
            "freeMemory": psutil.virtual_memory().available / 1_000_000
        }
    return info