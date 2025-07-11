import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '108cd5037353.ngrok-free.app',
      '.ngrok-free.app', // Allow any ngrok subdomain
      'localhost',
      '127.0.0.1'
    ],
    host: '0.0.0.0', // Allow external connections
    port: 3000
  }
})
