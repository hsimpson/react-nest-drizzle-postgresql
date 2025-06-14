import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: { minify: true, outDir: '../dist' },
  root: 'src',
});
