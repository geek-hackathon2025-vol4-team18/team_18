from google import genai
import json
from config import Config

class DialectConverter:
    def __init__(self):
        self.client = genai.Client(api_key=Config.API_KEY)
        self.model = Config.GEMINI_MODEL

    def text2dialects(self, text):
        instruction = "以下の入力テキストを指定された複数の方言に変換し、結果をJSON配列形式で出力してください。\n\n"

        inputs = f"""### 入力
        テキスト: {text}
        方言名: {Config.DIALECT_LIST}\n\n"""

        output_format = """### 出力形式
        [
            {
                "dialect": "[変換先の方言名]",
                "converted_text": "[変換後のテキスト]"
            }
        ]"""

        contents = instruction + inputs + output_format

        response = self.client.models.generate_content(
            model=self.model, contents=contents
        )
        row_response = response.text
        json_text = row_response.replace("```", "").replace("json", "").strip()

        try:
            result = json.loads(json_text)
            return result
        except json.JSONDecodeError:
            return [{"dialect": "エラー", "converted_text": "変換に失敗しました"}]