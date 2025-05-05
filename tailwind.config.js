/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // for dark mode support
    theme: {
      extend: {
        colors: {
          accent: {
            light: '#29ffc6',
            DEFAULT: '#20e3b2',
            dark: '#0cebeb',
          },
        },
        backgroundImage: {
          'accent-gradient': 'linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)',
          'login-gradient': 'linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)',
          'dark-login-gradient': 'linear-gradient(135deg, #0f172a, #1e293b)',
          'button-gradient': 'linear-gradient(to right, #0cebeb, #20e3b2)',
        },
        boxShadow: {
          'card': '0 10px 25px rgba(0, 0, 0, 0.1)',
          'card-hover': '0 5px 15px rgba(32, 227, 178, 0.3)',
          'navbar': '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [],
  }