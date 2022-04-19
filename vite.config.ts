import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

const pathResolve = (dir: string): any => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'@': pathResolve('./src/')
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
	resolve: { alias },
  server: {
    open: true,
    port: 3005,
    host: '0.0.0.0',
    proxy: {
      // with options
      '/api': {
        target: 'https://hn.algolia.com',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
