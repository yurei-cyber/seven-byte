# Seven Byte（セブンバイト）

浜松・掛川・袋井を中心とした中小企業向けの、ホームページ制作・業務システム・保守を案内する静的サイトです。架空の整備工場デモ（`/demo/`）を含みます。

## 技術選定

**Astro 7（静的出力）** を継続採用しています。

- マーケティング／コーポレートに十分な SSG
- GitHub Pages で運用可能（Node ランタイム不要）
- フォームはクライアント検証 + mailto / 外部エンドポイント（Formspree 等）のサーバー側検証
- 決済・機密データの保管は行いません

静的ホスト単体ではファーストパーティのサーバーバリデーションができないため、本番では `PUBLIC_FORM_ENDPOINT`（Formspree 等）の利用を推奨します。

## ページ

| パス | 内容 |
|------|------|
| `/` | コーポレート（サービス・価格目安・差別化・プロセス・FAQ・相談） |
| `/contact/` | お見積り・相談フォーム |
| `/plan/` | サービス範囲の詳細 |
| `/process/` | 制作の進め方 |
| `/privacy/` | プライバシーポリシー |
| `/demo/` ほか | 架空整備工場デモ（実在しない旨を明示） |

## セットアップ

```bash
npm install
cp .env.example .env
npm run dev
```

```bash
npm run build
npm run preview
```

任意スモーク（preview 起動中）:

```bash
npm install --no-save puppeteer-core
npm run smoke
```

## 環境変数（公開値のみ）

| 変数 | 用途 |
|------|------|
| `PUBLIC_SITE_URL` | canonical / OGP（既定: GitHub Pages URL） |
| `PUBLIC_BASE_PATH` | サブパス（GitHub Pages では `/seven-byte/`） |
| `PUBLIC_CONTACT_EMAIL` | 表示・mailto |
| `PUBLIC_CONTACT_PHONE` | 表示（任意） |
| `PUBLIC_LINE_URL` | LINE公式。**未設定時は非表示** |
| `PUBLIC_FORM_ENDPOINT` | Formspree 等。未設定かつメール未設定なら送信不可 |

偽の成功表示はしません。受付先未設定時はエラーを表示します。

## 公開

### GitHub Pages（現行）

- サイト: https://yurei-cyber.github.io/seven-byte/
- ブランチ `gh-pages` に `dist/` を配置（`.nojekyll` 必須）
- ビルド例:

```bash
PUBLIC_SITE_URL=https://yurei-cyber.github.io/seven-byte \
PUBLIC_BASE_PATH=/seven-byte/ \
npm run build
# dist を gh-pages へデプロイ
```

### Vercel（任意）

- Framework Preset: Astro
- 環境変数に上記 `PUBLIC_*` を設定
- ルートドメイン利用時は `PUBLIC_BASE_PATH=/` を推奨

## 画像

雰囲気写真は Unsplash 由来のローカル保存ファイルです。本番店舗では顧客提供写真への差し替えを推奨します。
