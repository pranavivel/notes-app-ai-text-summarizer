import daisyui from 'daisyui'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    themes: [{
        // My custom theme
      mytheme: {
        primary: "#563263",
        secondary: "#B23E53",
        accent: "#F14C55",
        neutral: "#FE6345",

        "base-100": "#000000",
        "base-200": "#111111",
        "base-300": "#1a1a1a",

        info: "#00ffff",
        success: "#00ff00",
        warning: "#ffff00",
        error: "#ff0000",
      }

      },]



    
  }
}