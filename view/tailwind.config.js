const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              foreground: '#000',
              DEFAULT: '#1dddae',
              50: '#dbfffd',
              100: '#b4f7f1',
              200: '#8af1e2',
              300: '#5eead2',
              400: '#34e4bf',
              500: '#1bcba0',
              600: '#0d9e85',
              700: '#017168',
              800: '#004542',
              900: '#001918',
            },
          },
        },
      },
    }),
  ],
};
