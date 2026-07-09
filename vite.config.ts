import netlify from '@netlify/vite-plugin-tanstack-start';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    rolldownOptions: {
      onwarn(warning, warn) {
        if (warning.code && ['SOURCEMAP_BROKEN'].includes(warning.code)) {
          return;
        }

        warn(warning);
      },
    },
  },
  plugins: [
    tanstackStart({
      sitemap: { host: 'https://barrymichaeldoyle.com' },
    }),
    netlify(),
    viteReact(),
    tailwindcss(),
  ],
});
