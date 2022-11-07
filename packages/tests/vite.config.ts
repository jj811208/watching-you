import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import rootViteConfig from '../../vite.config';

// https://vitejs.dev/config/
export default mergeConfig(
  rootViteConfig,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'watching-you',
        fileName: 'watching-you',
      },
    },
  }),
);
