
import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import rootViteConfig from '../../vite.config';


// https://vitejs.dev/config/
export default mergeConfig(
  rootViteConfig,
  defineConfig({
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'vue-watching-you',
        fileName: 'vue-watching-you',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }),
);