from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import platform
import psutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/sysinfo")
def get_sysinfo():
    info = {
        "hostname": platform.node(),
        "platform": platform.system(),
        "arch": platform.machine(),
        "release": platform.release(),
        "uptime": psutil.boot_time(),
        "totalMemory": psutil.virtual_memory().total / 1_000_000,
        "freeMemory": psutil.virtual_memory().available / 1_000_000
    }
    return JSONResponse(content=info)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=6969)