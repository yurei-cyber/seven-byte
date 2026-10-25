/** Prefix site paths with Astro `base` (needed for GitHub Pages project sites). */
export const base = import.meta.env.BASE_URL;

export function path(to: string): string {
  const cleaned = to.replace(/^\//, '');
  return `${base}${cleaned}`;
}
