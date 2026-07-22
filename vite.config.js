import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` is set to the repo name for the production build so assets resolve on
// GitHub Pages (served from /behnke/). Dev/preview stay at the root path.
// If you later host at a custom domain or repo root, change this back to '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/behnke/' : '/',
  plugins: [react()],
}))
