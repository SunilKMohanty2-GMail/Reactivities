import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: '../API/wwwroot',
    chunkSizeWarningLimit: 2000,
    emptyOutDir: true,
  },
  server: {
    port: 3000
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    mkcert()
  ],
})
