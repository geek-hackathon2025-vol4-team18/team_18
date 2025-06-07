// Reactの基本機能とuseState, useEffectというフックをインポート
import React, { useState, useEffect } from "react";

// 外部CSSファイル（App.css）を読み込み、スタイルを適用
import "./App.css";

const API_BASE = ""

// 投稿アプリのメインコンポーネントを定義
function App() {
  // 投稿一覧を格納する状態変数postsを初期化（空配列）
  const [posts, setPosts] = useState([]);

  // 投稿入力欄の内容を保持する状態変数contentを初期化（空文字列）
  const [content, setContent] = useState("");

  // 言語設定を保持する状態変数languageを初期化（初期値は日本語）
  const [language, setLanguage] = useState("random");

  // コンポーネント初回マウント時と3秒ごとに投稿一覧を取得
  useEffect(() => {
    const fetchPosts = async () => {
      const url = `/conversions`;
      console.log("[fetchPosts] hitting:", url);
      try {
        const res = await fetch(url);
        console.log("[fetchPosts] status:", res.status);
        const text = await res.text();
        // console.log("[fetchPosts] raw body:", text);
        // JSON に変換できなければここで例外になる
        const data = JSON.parse(text);

        const onlyConverted = data.map((p) => p.converted_texts);
        console.log("[fetchPosts] onlyConverted:", onlyConverted);
        setPosts(onlyConverted);
      } catch (err) {
        console.error("[fetchPosts] error:", err);
      }
    };

    fetchPosts();
    const id = setInterval(fetchPosts, 3000);
    return () => clearInterval(id);
  }, []); // 空配列によりマウント時のみセットアップ実行

  // 投稿フォームが送信されたときの処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページリロードを防止

    // 入力が空白のみの場合は送信しない
    if (content.trim() === "") {
      return;
    }

    // 新しい投稿をPOSTメソッドで送信
    await fetch(`${API_BASE}/convert`, {
      method: "POST", // HTTPメソッドはPOST
      headers: { "Content-Type": "application/json" }, // JSON形式を指定
      body: JSON.stringify({ content }), // content変数をJSONに変換して送信
    });

    setContent(""); // 入力欄をリセット

    // 投稿を再取得して最新状態に更新
    const res = await fetch(`${API_BASE}/conversions`);
    const data = await res.json();
    setPosts(data); // 投稿一覧を更新
  };

  // 言語選択が変更されたときの処理
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // 選択された言語にstateを更新

    // サーバーに言語設定を送信（将来の拡張用）
    // fetch(`/aFpi/set_language`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ language: e.target.value }),
    // });
  };

  // 実際のHTMLのような表示内容を定義（JSX）
  return (
    <div>
      {/* タイトル */}
      <h1>方言SNS</h1>

      <div className="language-switch">
        {["random", "ja", "osaka", "tohoku", "hakata", "okinawa"].map(
          (lang) => (
            <button
              key={lang}
              className={`lang-button ${language === lang ? "active" : ""}`}
              onClick={() => setLanguage(lang)}
            >
              {
                {
                  random: "ランダム",
                  ja: "日本語",
                  osaka: "大阪弁",
                  tohoku: "東北弁",
                  hakata: "博多弁",
                  okinawa: "沖縄方言",
                }[lang]
              }
            </button>
          )
        )}
      </div>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content} // contentのstateと同期
          onChange={(e) => setContent(e.target.value)} // 入力が変わるたびに更新
          rows="4" // テキストエリアの行数
          cols="40" // テキストエリアの列数
        />
        <br />
        <button type="submit">投稿</button> {/* 投稿ボタン */}
      </form>

      {/* 投稿一覧の表示 */}
      <ul>
        {posts
          .slice()
          .reverse()
          .map((texts, idx) => (
            <li key={idx}>
              {/* 全方言を出す場合 */}
              {Object.entries(texts).map(([dialect, txt]) => (
                <p key={dialect}>
                  {/* 方言名を付けたいなら `${dialect}: ${txt}` */}
                  {txt}
                </p>
              ))}

              {/* あるいは選択中の方言だけを出すならこちらを使う */}
              {/* <p>{texts[language]}</p> */}
            </li>
          ))}
      </ul>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを利用できるようにエクスポート
export default App;
