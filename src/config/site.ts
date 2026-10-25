/**
 * Site configuration. Override public values via `.env` (see `.env.example`).
 * Do not put secrets or invented contact/legal data here.
 */

const lineUrl = (import.meta.env.PUBLIC_LINE_URL as string | undefined)?.trim() ?? '';
const formEndpoint = (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined)?.trim() ?? '';
const siteUrl =
  (import.meta.env.PUBLIC_SITE_URL as string | undefined)?.trim() ||
  'https://yurei-cyber.github.io/seven-byte';

export const sevenByte = {
  name: 'Seven Byte',
  nameJa: 'セブンバイト',
  mark: '7',
  headline: 'ビジネスを、次のステージへ。',
  subhead:
    '浜松・掛川・袋井の店舗・事務所のために。ホームページ制作から業務システム開発まで、日々の仕事をもっとシンプルに。',
  complement: '遠州エリアの中小企業のための、実用的なデジタルソリューション。',
  area: '浜松・掛川・袋井',
  areaLabel: '対応エリア',
  areaDetail: '浜松・掛川・袋井を中心に対応（ほか地域はご相談）',
  heroRegion: '静岡県 浜松・掛川・袋井',
  metaDescription:
    'Seven Byte（セブンバイト）は浜松・掛川・袋井の中小企業向けに、ホームページ制作・業務システム開発・保守を提供。遠州エリアの店舗・事務所の実務に寄り添います。',
  email: (import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined)?.trim() || '',
  phone: (import.meta.env.PUBLIC_CONTACT_PHONE as string | undefined)?.trim() || '',
  siteUrl,
  lineUrl,
  lineEnabled: Boolean(lineUrl),
  formEndpoint,
  formMode: formEndpoint ? ('endpoint' as const) : ('mailto' as const),
};

export const services = [
  {
    id: 'website',
    title: 'ホームページ制作',
    price: '¥60,000〜¥100,000',
    priceNote: '参考価格（税別・案件により変動）',
    summary: 'スマホ対応のコーポレート／店舗サイト。必要ページに絞り、問い合わせにつながる構成で制作します。',
    scope: [
      '構成案・デザイン・実装（目安：最大5ページ）',
      'レスポンシブ対応',
      '基本的なメタ情報・OGP',
      'お問い合わせフォーム枠（送信先は別途設定）',
      'LINEボタン枠（公式URL設定後に表示）',
    ],
    outOfScope: [
      '検索順位の保証',
      '大規模CMS・会員機能・決済',
      '原稿・写真の撮影代行（未用意の場合はプレースホルダ可）',
    ],
  },
  {
    id: 'system',
    title: '業務システム開発',
    price: '¥100,000〜¥200,000',
    priceNote: '参考価格（要件定義後に見積もり）',
    summary: '顧客・車両・在庫・見積など、現場の繰り返し作業を減らす小さな業務ツールを個別に設計します。',
    scope: [
      '要件ヒアリングと画面・データの整理',
      'Webベースの業務画面（規模は合意範囲内）',
      '操作説明の簡易ドキュメント',
    ],
    outOfScope: [
      '未構築の機能を「完成品」として販売すること',
      '大規模ERPや既存基幹の全面置換',
      '無期限の追加開発込みの一式価格',
    ],
  },
  {
    id: 'support',
    title: '保守・運用サポート',
    price: '¥5,000〜¥15,000／月',
    priceNote: '参考価格（契約内容により変動）',
    summary: '公開後の文言修正・軽微な改修・稼働確認など、合意した範囲のサポートです。',
    scope: [
      '契約書に定めた時間／回数内の更新対応',
      '軽微な不具合の確認と修正',
      'ドメイン／DNS／フォーム接続の相談（範囲内）',
    ],
    outOfScope: [
      '24時間365日の監視保証',
      '無制限バックアップや災害復旧の包括保証',
      '契約外の大規模改修',
    ],
  },
] as const;

export const differentiators = [
  {
    title: '遠州エリアへの理解',
    body: '浜松・掛川・袋井の店舗ビジネスを前提に、来店・電話・アクセスが迷わない情報設計を重視します。',
  },
  {
    title: '中小企業向けの実用スコープ',
    body: '最初から機能を盛りすぎず、公開に必要な範囲で始め、後から拡張できる形を提案します。',
  },
  {
    title: '価格の目安を先に示す',
    body: '参考価格帯を公開し、追加費用が出やすい点も事前に説明します。確定見積はヒアリング後です。',
  },
  {
    title: '自動車関連の現場感',
    body: '整備・中古車など、メニュー・営業時間・在庫導線など現場で使う情報の置き方に慣れています。',
  },
  {
    title: '公開後も続けられる保守',
    body: '制作だけで終わらず、合意した範囲の保守オプションで運用を支えられます。',
  },
] as const;

export const processSteps = [
  {
    title: 'ヒアリング',
    body: '業種、強み、連絡手段、今困っている点を伺い、載せること／載せないことを整理します。',
  },
  {
    title: '構成と見積',
    body: 'ページ構成と参考範囲を共有し、確定見積をご提示します。虚偽の実績表現は使いません。',
  },
  {
    title: 'デザイン・実装',
    body: '合意した範囲でデザインと実装を進め、確認ポイントを絞ってレビューします。',
  },
  {
    title: '公開・引き継ぎ',
    body: '公開、基本操作の共有、フォーム／LINE接続の設定サポート（契約範囲内）を行います。',
  },
] as const;

export const faqs = [
  {
    q: '費用の目安を教えてください。',
    a: 'ホームページ制作は参考で¥60,000〜¥100,000、業務システムは¥100,000〜¥200,000、保守は¥5,000〜¥15,000／月です。いずれも税別の目安で、要件により変動します。',
  },
  {
    q: '制作期間はどのくらいですか。',
    a: '素材と確認がスムーズな場合、ホームページはおおよそ2〜4週間程度を目安にしています。システムは要件により前後します。',
  },
  {
    q: '写真や原稿が揃っていなくても頼めますか。',
    a: '可能です。公開に必要な最低限の構成から始め、後から差し替えできます。撮影や長文ライティングの代行は原則スコープ外です。',
  },
  {
    q: '浜松以外でも依頼できますか。',
    a: 'はい。浜松・掛川・袋井を中心としつつ、オンラインでのヒアリング前提で他地域にも対応します。',
  },
  {
    q: 'SEOで上位表示を保証できますか。',
    a: 'できません。基本的なメタ情報や見出し構造などは整えますが、検索順位の保証は行いません。',
  },
  {
    q: '支払い方法や契約の流れは？',
    a: 'ヒアリング後に見積と範囲を文書化し、合意のうえ着手します。支払い条件は案件ごとにご案内します（本サイトでは未設定の決済は扱いません）。',
  },
] as const;

export const portfolioItems = [
  {
    title: '架空ガレージ浜松',
    label: 'デモプロジェクト',
    href: '/demo/',
    summary: '整備工場向けサイトの構成サンプル。実在店舗・実績・評価ではありません。',
  },
  {
    title: '店舗サイト構成コンセプト',
    label: 'コンセプトデザイン',
    href: '/#services',
    summary: 'サービス／アクセス／問い合わせを短くまとめる中小店舗向けの情報設計コンセプトです。',
  },
] as const;

export const demoWorkshop = {
  name: '架空ガレージ浜松',
  nameEn: 'Kakū Garage Hamamatsu',
  legalNote:
    '本サイトは Seven Byte が制作した架空の整備工場デモです。実在の店舗・実績・評価ではありません。',
  area: '静岡県浜松市（架空）',
  hours: '平日 9:00–18:00 / 土曜 9:00–15:00（架空の営業時間）',
  email: '',
  phone: '',
  lineUrl: '',
  lineEnabled: false,
};
