import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import rootViteConfig from '../../vite.config';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default mergeConfig(
  rootViteConfig,
  defineConfig({
    plugins: [react(), vue()],
    test: {
      globals: true,
      environment: 'happy-dom',
    },
  }),
);
