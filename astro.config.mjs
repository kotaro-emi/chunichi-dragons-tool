// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pagesのプロジェクトサイト（https://kotaro-emi.github.io/chunichi-dragons-tool/）用の設定
// https://astro.build/config
export default defineConfig({
  site: 'https://kotaro-emi.github.io',
  base: '/chunichi-dragons-tool',

  vite: {
    plugins: [tailwindcss()],
  },
});