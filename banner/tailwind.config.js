/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Sesuaikan dengan struktur proyek Anda
  theme: {
    extend: {},
  },
  plugins: [require('flowbite'), require("daisyui"), ],
};
