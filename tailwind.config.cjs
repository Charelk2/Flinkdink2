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
      },
      fontFamily: {
        sans: ['"Comic Sans MS"', '"Comic Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
