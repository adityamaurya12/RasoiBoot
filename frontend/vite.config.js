import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,       // 💡 Set your fixed port here
    strictPort: true  // 💥 Force Vite to throw error if port is busy
  }
});
