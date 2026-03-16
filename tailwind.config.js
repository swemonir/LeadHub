
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        bengali: ['"Hind Siliguri"', 'sans-serif'],
      },
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        accent: '#FACC15',
        success: '#22C55E',
        text: '#F8FAFC',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.5)' },
        }
      }
    },
  },
  plugins: [],
}
