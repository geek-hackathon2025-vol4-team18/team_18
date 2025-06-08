import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL = "gemini-2.5-flash-preview-05-20"

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:////backend/db/data/app.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DIALECT_LIST = [
        "金沢弁",
        "博多弁",
        "京都弁",
        "大阪弁",
        "北海道弁",
        "津軽弁",
        "沖縄弁",
        "会津弁",
        "群馬弁",
        "千葉弁",
        "三河弁"
    ]

    DIALECT_KEY_MAP = {
        "金沢弁": "kanazawa_ben",
        "博多弁": "hakata_ben",
        "京都弁": "kyoto_ben",
        "大阪弁": "osaka_ben",
        "北海道弁": "hokkaido_ben",
        "津軽弁": "tsugaru_ben",
        "沖縄弁": "okinawa_ben",
        "会津弁": "aidu_ben",
        "群馬弁": "gunma_ben",
        "千葉弁": "chiba_ben",
        "三河弁": "mikawa_ben"
    }