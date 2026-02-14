/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.js",
    "./App.js",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        success: "#10b981",
        muted: "#64748b",
      },
    },
  },
  plugins: [],
};
