/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
