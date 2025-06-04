// Reactの基本機能とフックをインポート
import React, { useState, useEffect } from "react";
import "./App.css";

// Appコンポーネントの定義（投稿アプリ）
function App() {
  // posts: 投稿一覧の状態変数, setPosts: その更新関数（初期値は空配列）
  const [posts, setPosts] = useState([]);

  // content: 入力中の投稿内容, setContent: その更新関数（初期値は空文字列）
  const [content, setContent] = useState("");

  // コンポーネント初回マウント時に投稿一覧を取得（GETリクエスト）
  useEffect(() => {
    const fetchPosts = () => {
      fetch("/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data));
    };

    fetchPosts(); // 初回実行
    const intervalId = setInterval(fetchPosts, 3000); // 3秒ごと

    return () => clearInterval(intervalId); // アンマウント時に停止
  }, []); // 空配列により初回のみ実行

  // 投稿フォームの送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信のデフォルト動作（ページリロード）を防止

    // 空文字列のチェック（空白だけも含めて除外）
    if (content.trim() === "") {
      return; // 何もしないで終了
    }

    // POSTリクエストで新しい投稿を送信
    await fetch("/posts", {
      method: "POST", // POSTメソッドで送信
      headers: { "Content-Type": "application/json" }, // JSONとして送ることを指定
      body: JSON.stringify({ content }), // 入力されたcontentをJSON文字列に変換して送信
    });

    setContent(""); // テキストエリアを空にする

    // 新しい投稿を含めた一覧を再取得（GET）
    const res = await fetch("/posts");
    const data = await res.json();
    setPosts(data); // 状態を更新して再描画
  };

  // 実際に画面に表示する部分（JSX）
  return (
    <div>
      <h1>方言SNS</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content} // テキストエリアの内容をstateと同期
          onChange={(e) => setContent(e.target.value)} // 入力内容が変わるたびに更新
          rows="4"
          cols="40"
        />
        <br />
        <button type="submit">投稿</button>
      </form>
      <ul>
        {/* 投稿一覧をリスト表示（投稿内容のみ表示） */}
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <li key={post.id}>{post.content}</li>
          ))}
      </ul>
    </div>
  );
}

// このコンポーネントを他ファイルから使えるようにエクスポート
export default App;
