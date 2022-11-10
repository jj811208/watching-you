import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['>0.05%', 'defaults'],
    }),
  ],
  build: { outDir: process.env.OUT_DIR || 'dist' },
  base: './',
});
