module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#1C6758",
        secondary: "#E8AA42",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
