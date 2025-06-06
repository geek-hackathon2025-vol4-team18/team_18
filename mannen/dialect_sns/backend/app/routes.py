from flask import request, jsonify, render_template
from app.services.dialect_service import DialectConverter

dc = DialectConverter()

def register_routes(app):
    @app.route('/')
    def index():
        return render_template('index.html')

    # 以下のコマンドでテスト
    # curl -X POST http://localhost:8080/convert \
    #   -H "Content-Type: application/json" \
    #   -d '{"text": "今日はいい天気ですね"}'
    @app.route('/convert', methods=['POST'])
    def text2dialect():
        data = request.get_json()
        text = data.get('text', '')

        if not text:
            return jsonify({'error': '入力テキストを指定してください'}), 400

        try:
            result = dc.text2dialects(text)
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/conversions', methods=['GET'])
    def list_conversions():
        try:
            data = dc.get_all_conversions()
            return jsonify(data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500