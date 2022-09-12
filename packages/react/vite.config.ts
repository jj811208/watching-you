import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import rootViteConfig from '../../vite.config';

// https://vitejs.dev/config/
export default mergeConfig(
  rootViteConfig,
  defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'react-watching-you',
        fileName: 'react-watching-you',
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  }),
);
