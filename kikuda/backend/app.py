from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# JSONファイルのパス
DATA_FILE = 'posts.json'

# JSONファイルが存在しない場合、空リストで初期化
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w') as f:
        json.dump([], f)

# 投稿一覧取得（GET /posts）
@app.route('/posts', methods=['GET'])
def get_posts():
    with open(DATA_FILE, 'r') as f:
        posts = json.load(f)
    return jsonify(posts)

# 投稿追加（POST /posts）
@app.route('/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    with open(DATA_FILE, 'r') as f:
        posts = json.load(f)

    # 新しいIDを決定（既存の最大ID + 1）
    new_id = max((p["id"] for p in posts), default=0) + 1
    new_post = {
        'id': new_id, 
        'content': data['content'],
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    posts.append(new_post)

    with open(DATA_FILE, 'w') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    return jsonify({'message': 'Post added'}), 201

if __name__ == '__main__':
    app.run(debug=True)
