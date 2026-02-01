/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'landscape-tablet': {
          'raw': '(max-width: 1024px) and (orientation: landscape)'
        }
      }
    },
  },
  plugins: [],
  // Важно: не конфликтовать с существующими SCSS стилями
  corePlugins: {
    preflight: false, // Отключаем reset чтобы не ломать существующие стили
  }
}
