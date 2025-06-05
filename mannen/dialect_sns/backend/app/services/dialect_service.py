from google import genai
import json
from config import Config

class DialectConverter:
    def __init__(self):
        self.client = genai.Client(api_key=Config.API_KEY)
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
        row_response = response.text
        json_text = row_response.replace("```", "").replace("json", "").strip()

        print(json_text)

        try:
            result = json.loads(json_text)
            return result
        except json.JSONDecodeError:
            return [{"dialect": "エラー", "converted_text": "変換に失敗しました"}]

if __name__ == "__main__":
    dc = DialectConverter()
    res = dc.text2dialects("今日はいい天気です")
    print(res)