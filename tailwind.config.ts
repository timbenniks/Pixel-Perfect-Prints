import type { Config } from 'tailwindcss';
import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';

export default <Config>{
  presets: [tailwindConfig],
  content: ['./**/*.vue', './node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        titles: ["Goku", "sans-serif"]
      },
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#F9C066',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
    },
  },
};
