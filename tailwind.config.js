
module.exports = {
  darkMode: 'class', // dark mode works by adding 'dark' class
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: {
  themes: ["light", "dark"],
}
};
