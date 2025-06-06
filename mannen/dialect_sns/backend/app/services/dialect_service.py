from google import genai
import json
from config import Config
from app.db import SessionLocal, engine
from app.models import Base, DialectConversion

Base.metadata.create_all(bind=engine)


class DialectConverter:
    def __init__(self):
        self.client = genai.Client(api_key=Config.GEMINI_API_KEY)
        self.model = Config.GEMINI_MODEL

    def text2dialects(self, text):
        instruction = "以下の入力テキストを指定された複数の方言に変換し、結果をJSONオブジェクト（キーは方言名、値は変換後テキスト）で出力してください。\n\n"

        inputs = f"""### 入力
        テキスト: {text}
        方言名リスト: {Config.DIALECT_LIST}\n\n"""

        template = {dialect: "[変換後のテキスト]" for dialect in Config.DIALECT_LIST}
        output_format = "### 出力形式\n" + json.dumps(template, ensure_ascii=False, indent=4)
        contents = instruction + inputs + output_format

        response = self.client.models.generate_content(
            model=self.model, contents=contents
        )
        raw = response.text.replace("```", "").replace("json", "").strip()

        try:
            result = json.loads(raw)
        except json.JSONDecodeError:
            result = {"エラー": "変換に失敗しました"}

        result = {
            Config.DIALECT_KEY_MAP.get(k, k): v
            for k, v in result.items()
        }

        session = SessionLocal()
        try:
            obj = DialectConversion(
                original_text=text,
                converted_texts=result
            )
            session.add(obj)
            session.commit()
        finally:
            session.close()
        return result

    def get_all_conversions(self):
        session = SessionLocal()
        try:
            recs = session.query(DialectConversion).all()
            return [
                {
                    "id": r.id,
                    "original_text": r.original_text,
                    "converted_texts": r.converted_texts,
                    "created_at": r.created_at.isoformat()
                }
                for r in recs
            ]
        finally:
            session.close()

if __name__ == "__main__":
    dc = DialectConverter()
    print(dc.get_all_conversions())