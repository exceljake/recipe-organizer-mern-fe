// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelpink: "#ffdbe9",
        pastelpeach: "#ffe8d6",
        pastelmint: "#e0f7f1",
        pastellav: "#e9e6ff",
        pastelsky: "#e6f0ff",
      },
      backgroundImage: {
        "pastel-blend": "linear-gradient(135deg,#ffe8d6 0%,#e0f7f1 50%,#e9e6ff 100%)",
      },
    },
  },
  plugins: [],
};
