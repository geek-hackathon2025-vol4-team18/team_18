import sqlite3
import pandas as pd
from os import path

base_dir = path.abspath(path.dirname(__file__))
db_path = path.join(base_dir, 'data', 'app.db')

def show_table_info():
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    cur.execute("PRAGMA table_info(conversions)")
    columns = cur.fetchall()
    print("【テーブル構造】")
    for col in columns:
        print(f"カラム名: {col[1]}, 型: {col[2]}")

    conn.close()


def show_all_data():
    conn = sqlite3.connect(db_path)
    df = pd.read_sql("SELECT * FROM conversions", conn)
    print("【登録済みデータ】")
    print(df)
    conn.close()

show_table_info()
show_all_data()