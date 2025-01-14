import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Resolve @ to ./src
    },
  },
  server: {
    port: 3000, // Specify the development server port
    open: true, // Automatically open the browser on server start
  },
  build: {
    outDir: 'dist', // Specify the output directory for the build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor libraries for optimization
        },
      },
    },
  },
});
