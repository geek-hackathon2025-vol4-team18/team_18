// React本体をインポート
import React from "react";

// React 18以降で推奨されるDOMレンダリング用のcreateRootをインポート
import { createRoot } from "react-dom/client";

// 自作のAppコンポーネントをインポート（投稿アプリの本体）
import App from "./App";

// HTMLファイル内の <div id="root"></div> を取得（Reactが描画するターゲット）
const container = document.getElementById("root");

// 取得したDOM要素にReactアプリを紐づけるルートを作成
const root = createRoot(container);

// Appコンポーネントをルートにレンダリング（画面に表示）
root.render(<App />);
