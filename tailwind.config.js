/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{html,js}", 
    "./src/public/**/*.{html,js}"
  ],
  theme: {
    colors : {
      'pink' : '#F7DCEF',
      'blue' : '#DFF5FD',
      'brown' : '#543601',
      'dark' : '#1C1B1B',
      'white' : '#FFFFFF'
    },
    extend: {
      fontFamily : {
        'primary' : ["Krungthep", "sans-serif"],
        'secondary' : ["lao-sangam-mn", "sans-serif"]
      },
      screens : {
        md : '820px'
      }
    },
  },
  plugins: [],
}
