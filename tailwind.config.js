/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Matte, dark surfaces — never pure black
        ink: {
          900: '#0b0b0d',
          800: '#121216',
          700: '#17171c',
          600: '#1f1f26',
          500: '#2a2a33',
        },
        // Neon accents for the underground studio look
        electric: '#00e5ff',
        hotpink: '#ff2d95',
        acid: '#c6ff00',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 0 1px rgba(0,229,255,0.6), 0 0 24px rgba(0,229,255,0.25)',
        pink: '0 0 0 1px rgba(255,45,149,0.6), 0 0 24px rgba(255,45,149,0.25)',
      },
      keyframes: {
        glitch: {
          '0%,100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
      },
      animation: {
        glitch: 'glitch 0.4s steps(2) infinite',
      },
    },
  },
  plugins: [],
}
