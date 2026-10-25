/**
 * Site configuration. Override public values via `.env` (see `.env.example`).
 * Do not put secrets here — only public contact/display settings.
 */

const lineUrl = (import.meta.env.PUBLIC_LINE_URL as string | undefined)?.trim() ?? '';
const formEndpoint = (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined)?.trim() ?? '';
const siteUrl = (import.meta.env.PUBLIC_SITE_URL as string | undefined)?.trim() || 'https://example.com';

export const sevenByte = {
  name: 'Seven Byte',
  nameJa: 'セブンバイト',
  tagline: '浜松・掛川・袋井の整備工場・中古車販売店のためのホームページ制作',
  area: '浜松・掛川・袋井',
  email: (import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined)?.trim() || '',
  phone: (import.meta.env.PUBLIC_CONTACT_PHONE as string | undefined)?.trim() || '',
  siteUrl,
  lineUrl,
  /** Show LINE CTA only when a real URL is configured */
  lineEnabled: Boolean(lineUrl),
  formEndpoint,
  /** mailto fallback when no form endpoint is set */
  formMode: formEndpoint ? ('endpoint' as const) : ('mailto' as const),
};

export const demoWorkshop = {
  name: '架空ガレージ浜松',
  nameEn: 'Kakū Garage Hamamatsu',
  legalNote: '本サイトは Seven Byte が制作した架空の整備工場デモです。実在の店舗・実績・評価ではありません。',
  area: '静岡県浜松市（架空）',
  hours: '平日 9:00–18:00 / 土曜 9:00–15:00（架空の営業時間）',
  email: '',
  phone: '',
  lineUrl: '',
  lineEnabled: false,
};
