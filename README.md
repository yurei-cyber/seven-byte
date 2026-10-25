# Seven Byte（セブンバイト）サイト

浜松・掛川・袋井の自動車整備工場・中古車販売店向けに、ホームページ制作を案内する静的サイトです。架空の整備工場デモ（`/demo/`）も同梱しています。

## 技術選定

**Astro（静的出力）** を採用しています。

- マーケティングサイトに十分な SSG / 静的 HTML
- パフォーマンスと運用の単純さ（Node ランタイム不要でホスティング可）
- フォームはクライアント検証 + mailto / 外部エンドポイント（Formspree 等）
- 決済・機密データの保存は行いません

## ページ構成

| パス | 内容 |
|------|------|
| `/` | Seven Byte ご案内 |
| `/plan/` | 初期プランの範囲 |
| `/process/` | 制作の進め方 |
| `/contact/` | お見積りフォーム |
| `/demo/` | 架空整備工場デモ（トップ） |
| `/demo/services/` | デモ：サービス |
| `/demo/contact/` | デモ：お問い合わせ |

デモはバナーと文言で架空であることを明示しています。偽の口コミ・評価・実績は掲載しません。

## セットアップ

```bash
npm install
cp .env.example .env
npm run dev
```

本番ビルド:

```bash
npm run build
npm run preview
```

成果物は `dist/` です。

任意のブラウザスモーク（preview 起動中、`puppeteer-core` が必要）:

```bash
npm install --no-save puppeteer-core
npm run smoke
```


## 環境変数（公開設定のみ）

`.env.example` を参照。すべて `PUBLIC_` 付きの公開値です。秘密鍵を置かないでください。

| 変数 | 用途 |
|------|------|
| `PUBLIC_SITE_URL` | 正規 URL / OGP / canonical |
| `PUBLIC_CONTACT_EMAIL` | 表示用メール・mailto 送信先 |
| `PUBLIC_CONTACT_PHONE` | 表示用電話（任意） |
| `PUBLIC_LINE_URL` | LINE 公式アカウント URL。**未設定時はボタン非表示** |
| `PUBLIC_FORM_ENDPOINT` | Formspree 等の POST 先。未設定時は mailto |

### LINE ボタン

架空の LINE URL は入れません。`PUBLIC_LINE_URL` を設定するまで CTA は出ません。

例: `PUBLIC_LINE_URL=https://line.me/R/ti/p/@your-id`

### フォーム配線

1. **簡易**: `PUBLIC_CONTACT_EMAIL` のみ設定 → 送信でメーラー起動（mailto）
2. **推奨**: [Formspree](https://formspree.io/) などでフォーム ID を作成し `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxx` を設定

カード番号・マイナンバー等は送らない運用です。

## 公開手順

GitHub への自動作成ができない環境では、次でリポジトリ化してデプロイします。

### 1. GitHub リポジトリ作成

```bash
cd seven-byte
git init
git add .
git commit -m "Initial Seven Byte marketing site"
gh auth login
gh repo create seven-byte --public --source=. --remote=origin --push
```

`gh` が使えない場合は GitHub 上で空リポジトリ `seven-byte` を作成し:

```bash
git remote add origin https://github.com/<YOUR_USER>/seven-byte.git
git branch -M main
git push -u origin main
```

### 2. ホスティング例（Cloudflare Pages / Netlify / GitHub Pages）

- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `dist`
- 環境変数に `.env.example` の値を設定
- `PUBLIC_SITE_URL` を本番ドメインに合わせ、`public/robots.txt` と `public/sitemap.xml` のドメインも更新

## 画像クレジット

雰囲気写真は Unsplash のストック画像をローカルに保存して使用しています（デモ・雰囲気用）。本番店舗では顧客提供写真への差し替えを推奨します。

## ライセンス

プロジェクトコードの利用条件はリポジトリオーナーが別途定める想定です。コンテンツ（文言）は Seven Byte 向け原稿です。
