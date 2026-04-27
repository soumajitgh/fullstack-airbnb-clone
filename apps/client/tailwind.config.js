/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    animations,
  ],
  daisyui: {
    themes: [
      {
        myTheme: {
          'primary': '#FF5A5F',
          'secondary': '#00A699',
          'accent': '#FC642D',
          'neutral': '#0f0f3d',
          'base-100': '#fbfbfe',
        },
      },
    ],
  },
};

