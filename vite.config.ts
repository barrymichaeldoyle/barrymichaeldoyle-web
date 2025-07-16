import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code && ['SOURCEMAP_BROKEN'].includes(warning.code)) {
          return;
        }

        warn(warning);
      },
    },
  },
  plugins: [
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      target: 'netlify',
      sitemap: { host: 'https://barrymichaeldoyle.com' },
      customViteReactPlugin: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
});
