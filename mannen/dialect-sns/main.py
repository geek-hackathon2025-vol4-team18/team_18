from google import genai
from dotenv import load_dotenv
import os

def main():
    print("Hello from dialect-sns!")

    load_dotenv()
    API_KEY = os.getenv("API_KEY")

    client = genai.Client(api_key=API_KEY)

    instruction = "以下の入力テキストを指定された複数の言語に変換し、結果をJSON形式で出力してください。\n\n"

    inputs = """### 入力
    テキスト: 日本語ってすごくいい言語だね！
    方言名: [石川弁, 京都弁, 大阪弁, 北海道弁, 津軽弁]\n\n"""

    output_format = """### 出力形式
    {
        "dialect": "[変換先の方言名]",
        "converted_text": "[変換後のテキスト]"
    }
    """

    contents = instruction + inputs + output_format

    print(contents)

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=contents
    )

    print(response.text)

if __name__ == "__main__":
    main()
