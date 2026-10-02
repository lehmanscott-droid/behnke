import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// The site is hosted on Vercel at the root of its own domain
// (https://scottlehmanart.com), so asset URLs start at '/'. Keeping this
// unconditional means `dev`, `build` and `preview` all agree, so local preview
// matches production exactly.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
