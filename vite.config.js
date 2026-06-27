import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CRA -> Vite. base './' = relative asset paths (served at shop.ddsplm.com root).
// The CRA-style source uses JSX inside .js files, so tell esbuild to load
// src/*.js with the jsx loader (build + dep pre-bundle).
export default defineConfig({
  base: './',
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },
  build: { outDir: 'dist', sourcemap: false },
});
