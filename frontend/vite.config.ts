import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ✅ Important for Render (fixes broken CSS / assets)
  base: './',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    proxy: {
      // Local dev ONLY
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ✅ Needed for Render production
  preview: {
    port: 4173,
  },
});
