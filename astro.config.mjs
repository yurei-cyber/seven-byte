// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL || 'https://yurei-cyber.github.io/seven-byte';
const base = process.env.PUBLIC_BASE_PATH || '/seven-byte/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
