/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blanco: '#ECF0F1',
        azul: '#3498DB',
        rojo: '#E74C3C',
        negro: '#000000',
        headerText: '#ffffff',
        indigo: {
          600: '#4c51bf',
          700: '#434190',
        },
        gradientBlue: {
          from: '#3498DB',
          to: '#434190',
        },
      },
    },
  },
  plugins: [aspectRatio, forms],
};
