import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` must match how the site is served on GitHub Pages: a project page
// lives at https://<user>.github.io/behnke/, so every asset URL is prefixed
// with /behnke/. Keeping this unconditional means `dev`, `build` and `preview`
// all agree, so local preview matches production exactly.
// If you move to a custom domain or the repo root, change this to '/'.
export default defineConfig({
  base: '/behnke/',
  plugins: [react()],
})
