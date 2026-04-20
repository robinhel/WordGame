import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001',
      '/gamehub': {
        target: 'http://localhost:5001',
        ws: true
      }
    }
  }
});