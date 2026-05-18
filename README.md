# AI花図鑑

花屋さん向けの試作Webアプリです。花名を検索すると、花の特徴・育て方・花言葉・店頭POP文・Instagram投稿文を表示します。

## 機能

- 花名・読み方・英名で検索
- 花カード表示
- 複数写真の切り替え表示
- 育て方・管理方法の表示
- 花言葉の表示
- 店頭POP文の表示
- Instagram投稿文の表示
- AI相談欄の見た目と固定回答
- スマホ対応のレスポンシブUI

## ファイル構成

```text
.
├── main.py
├── flowers.json
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## 起動方法

1. 依存パッケージをインストールします。

```bash
pip install fastapi uvicorn
```

2. サーバーを起動します。

```bash
uvicorn main:app --reload
```

3. ブラウザで開きます。

```text
http://127.0.0.1:8000
```

## データ追加

花データは `flowers.json` に保存しています。DBは使っていないため、花を追加したい場合は同じ形式でJSONに追記してください。

## 写真について

写真URL、出典、ライセンスは `flowers.json` の `photos` に保存しています。古い表示との互換用に `photo_url`、`photo_source`、`photo_license` も残しています。試作ではUnsplashとWikimedia Commonsのフリー利用可能な画像を使っています。本番公開前には、花名と写真内容が一致しているか、ライセンス表記が必要かを必ず確認してください。
