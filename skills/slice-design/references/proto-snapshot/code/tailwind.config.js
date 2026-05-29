/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // slice DLS 2.0 tokens
        'v-500': '#D30AD7',
        'v-400': '#E14ED7',
        'v-100': '#F4E5F8',
        'v-50': '#FAF2FC',
        'slate-10': 'rgba(0,0,0,0.1)',
        'slate-40': 'rgba(0,0,0,0.4)',
        'slate-60': 'rgba(0,0,0,0.6)',
      },
      fontFamily: {
        rubik: ['Rubik', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'nav-active': '0px 0px 16px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
