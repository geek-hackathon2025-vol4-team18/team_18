from run import create_app
from app.extensions import db
from config import Config
from os import path, remove

def main():
    base_dir = path.abspath(path.dirname(__file__))
    db_file = path.join(base_dir, 'data', 'app.db')

    if path.exists(db_file):
        remove(db_file)
        print(f"🗑️ 古いデータベースを削除しました: {db_file}")

    app = create_app()
    with app.app_context():
        db.create_all()
        print(f"✅ データベースを初期化しました: {Config.SQLALCHEMY_DATABASE_URI}")

if __name__ == "__main__":
    main()