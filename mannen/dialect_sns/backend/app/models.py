from sqlalchemy import (Column, Integer, DateTime, Text, func, JSON)
from app.db import Base

class DialectConversion(Base):
    __tablename__ = "conversions"

    id = Column(Integer, primary_key=True)
    original_text = Column(Text, nullable=False)
    converted_texts = Column(JSON, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        nullable=False
    )