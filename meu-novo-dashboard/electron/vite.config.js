import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Plugin customizado para garantir que o Vite encerre quando o processo Electron fechar.
const exitOnClosePlugin = {
  name: 'exit-on-close',
  configureServer(server) {
    process.stdin.on('end', () => {
      server.close()
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './', // Essencial para o build do Electron
  plugins: [react(), exitOnClosePlugin],
})
