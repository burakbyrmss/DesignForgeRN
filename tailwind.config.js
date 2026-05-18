/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8fafc',
          dark: '#0f172a',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#64748b',
        },
      },
    },
  },
  plugins: [],
};
