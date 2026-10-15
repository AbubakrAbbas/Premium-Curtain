import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The 3D viewer (three.js) is lazy-loaded, so its chunk is large by design.
    chunkSizeWarningLimit: 1500,
  },
})
