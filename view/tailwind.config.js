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
            pink: {
              foreground: '#1a1a1a',
              DEFAULT: '#f38ba3',
              50: '#ffe5ef',
              100: '#fab9ca',
              200: '#f38ba3',
              300: '#ed5e89',
              400: '#e73273',
              500: '#ce1b66',
              600: '#a11358',
              700: '#740c47',
              800: '#460530',
              900: '#1d0014',
            },
          },
        },
      },
    }),
  ],
};
