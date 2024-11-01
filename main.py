import platform
import psutil
import time

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