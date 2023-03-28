# mtg-search

https://aw-t-daigo.github.io/mtg-search/

Vue3 系 + TypeScript と rxjs で検索フォームに入力した内容をリアクティブに反映させる習作です。
Scryfall という Magic: the Gathering (以下 MtG) のカードを検索する API を利用しています。

見た目はとっても手抜きなので悪しからず。

## いまできること
- カード名検索
  - インクリメンタルサーチに対応
  - 英語のみ
- 検索結果表示
  - 一覧 … マジで名前だけ
  - 詳細 … 一応画像とかも表示

## プロジェクトのセットアップ

```sh
npm install
```

### ホットリロードつきで起動

```sh
npm run dev
```

### ビルド

```sh
npm run build
```

### [ESLint](https://eslint.org/)

```sh
npm run lint
```
