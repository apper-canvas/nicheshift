/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Fredoka One', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f4edff',
          500: '#7C3AED',
          600: '#6d28d9',
          700: '#5b21b6',
        },
        secondary: {
          50: '#fdf2f7',
          100: '#fce7f3',
          500: '#EC4899',
          600: '#db2777',
          700: '#be185d',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#F59E0B',
          600: '#d97706',
          700: '#b45309',
        },
        surface: '#FAFAF9',
        background: '#FFFFFF',
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '400' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', fontWeight: '400' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      boxShadow: {
        'soft': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'lift': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        'card': '16px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}