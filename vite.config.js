import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion'))  return 'motion-vendor'
            if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor'
            if (id.includes('lenis'))          return 'lenis-vendor'
            if (id.includes('@emailjs'))       return 'email-vendor'
          }
        },
      },
    },
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lenis', '@emailjs/browser'],
  },
})
