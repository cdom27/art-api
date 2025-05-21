import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000',
  //   },
  //   allowedHosts: [
  //     '8f52-2607-fb91-8292-4bc5-4c17-96f3-f9db-ff44.ngrok-free.app',
  //   ],
  // },
});
