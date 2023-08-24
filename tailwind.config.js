/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grapefruit": {
          "soft":"#ED5565",
          "hard":"#DA4453"
        },
        "bittersweet": {
          "soft":"#FC6E51",
          "hard":"#E9573F"
        },
        "bluejeans": {
          "soft":"#5D9CEC",
          "hard":"#4A89DC"
        },
        "lightgray": {
          "soft":"#F5F7FA",
          "hard":"#E6E9ED"
        },
        "darkgray": {
          "soft":"#656D78",
          "hard":"#434A54"
        }
      }
    },
  },
  plugins: [],
}

