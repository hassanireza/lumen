import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE_PATH is set by the GitHub Actions workflow to "/<repo-name>/"
// so assets resolve correctly when served from https://<user>.github.io/<repo-name>/.
// Locally (and for a custom domain / user-site deploy) it defaults to "/".
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
})
