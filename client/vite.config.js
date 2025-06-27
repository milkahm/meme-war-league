import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/memes': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/battles': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/votes': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
});
