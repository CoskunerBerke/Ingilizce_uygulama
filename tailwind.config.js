/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.35s cubic-bezier(.36,.07,.19,.97) both',
        'pop': 'pop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-5px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(5px, 0, 0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
