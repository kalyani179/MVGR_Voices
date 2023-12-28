/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      'white': '#FFFFFF',
      'black': '#242424',
      'grey': '#F3F3F3',
      'dark-grey': '#6B6B6B',
      'red': '#FF4E4E',
      'transparent': 'transparent',
      'twitter': '#1DA1F2',
      'purple': '#660066',
      'icons' : '#999999'
    },
    screens: {
      'sm': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '991px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '992px', 'max': '1200px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1201px', 'max': '1500px'},
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
        gelasio: ["'Gelasio'", "serif"]
      },
  },
  },
  plugins: [],
}
