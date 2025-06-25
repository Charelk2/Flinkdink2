const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          orange: '#FFA726',
        },
        background: '#FFFBEA',
        text: '#1F2937',
        secondary: '#6B7280',
      },
      fontFamily: {
        sans: ['"Comic Sans MS"', '"Comic Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
