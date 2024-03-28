const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'md': {'min': '768px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '992px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1201px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }


      // 'lg': {'max': '1023px'},
      // // => @media (max-width: 1023px) { ... }

      // 'md': {'max': '767px'},
      // // => @media (max-width: 767px) { ... }

      // 'sm': {'max': '576px'},
      // // => @media (max-width: 639px) { ... }
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        gelasio: ["'Gelasio'", "serif"],
        merriweather:["'Merriweather'","serif"]
      },
  },
  },
  plugins: [
    createThemes({
      light:{
        'cool-white':'#f5f5f5',
        'cool-black':'#1C1C1C',
        'white': '#FFFFFF',
        'black': '#242424',
        'grey': '#F3F3F3',
        'input' : '#d9d9d9',
        'red' : '#FF4E4E',
        'dark-grey': '#6B6B6B',
        'transparent': 'transparent',
        'purple': '#660066',
        'icons' : '#999999',
        'primary' : '#e86f6f',
        'blue':'#002D62',
        'green':"#32CD32"
      },
      dark:{
        'cool-white':'#1C1C1C',
        'cool-black':'#1C1C1C',
        'white': '#242424',
        'black': '#F3F3F3',
        'grey': '#2A2A2A',
        'input' : '#d9d9d9',
        'red':'#991F1F',
        'dark-grey': '#E7E7E7',
        'transparent': 'transparent',
        'purple': '#582C8E',
        'icons' : '#999999',
        'primary' : '#e86f6f',
        'darkBlack' : '#000'
      }
    })
  ],
}
