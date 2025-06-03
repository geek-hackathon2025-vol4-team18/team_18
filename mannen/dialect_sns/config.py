import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    API_KEY = os.getenv("API_KEY")
    GEMINI_MODEL = "gemini-2.5-flash-preview-05-20"

    DIALECT_LIST = [
        "石川弁",
        "博多弁",
        "大阪弁",
        "北海道弁",
        "津軽弁",
        "沖縄弁"
    ]