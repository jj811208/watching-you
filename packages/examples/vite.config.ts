import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';
import rootViteConfig from '../../vite.config';

// https://vitejs.dev/config/
export default mergeConfig(
  rootViteConfig,
  defineConfig({
    plugins: [react()],
  }),
);
