import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://wearesocial-sg.github.io/Whatsup/",
  server:{
    watch: {
      usePolling: true
    },
    port:8000
  }
})
