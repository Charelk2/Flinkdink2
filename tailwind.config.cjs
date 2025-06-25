const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
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
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
