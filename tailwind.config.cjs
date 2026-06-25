module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'coke-red': '#F40009',
        'coke-black': '#000000',
        'coke-white': '#FFFFFF',
        'coke-gray': {
          DEFAULT: '#6B7280',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          500: '#6B7280'
        }
      }
    },
  },
  plugins: [],
};
