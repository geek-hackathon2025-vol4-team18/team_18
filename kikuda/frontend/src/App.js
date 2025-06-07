// Reactの基本機能とuseState, useEffectというフックをインポート
import React, { useState, useEffect } from "react";

// 外部CSSファイル（App.css）を読み込み、スタイルを適用
import "./App.css";

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
    // 投稿一覧を取得する関数
    const fetchPosts = () => {
      fetch("/posts") // サーバーの/postsエンドポイントにGETリクエスト
        .then((res) => res.json()) // JSONとしてレスポンスを解析
        .then((data) => setPosts(data)); // posts状態を更新
    };

    fetchPosts(); // 初回マウント時に実行
    const intervalId = setInterval(fetchPosts, 3000); // 3秒ごとに実行

    return () => clearInterval(intervalId); // コンポーネントアンマウント時に停止
  }, []); // 空配列によりマウント時のみセットアップ実行

  // 投稿フォームが送信されたときの処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページリロードを防止

    // 入力が空白のみの場合は送信しない
    if (content.trim() === "") {
      return;
    }

    // 新しい投稿をPOSTメソッドで送信
    await fetch("/posts", {
      method: "POST", // HTTPメソッドはPOST
      headers: { "Content-Type": "application/json" }, // JSON形式を指定
      body: JSON.stringify({ content }), // content変数をJSONに変換して送信
    });

    setContent(""); // 入力欄をリセット

    // 投稿を再取得して最新状態に更新
    const res = await fetch("/posts");
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
          .map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <p style={{ fontSize: "0.8em", color: "gray" }}>
                {post.timestamp}
              </p>{" "}
              {/* 日時表示 */}
            </li>
          ))}
      </ul>
    </div>
  );
}

// 他のファイルからこのAppコンポーネントを利用できるようにエクスポート
export default App;
