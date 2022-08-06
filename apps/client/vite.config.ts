import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
  },
  server: {
    proxy: {
      '/socket.io': {
        target: 'ws://localhost:3000/socket.io',
        ws: true,
      },
    },
  },
})
