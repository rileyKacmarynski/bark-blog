module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",    
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'medium': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
