// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue,svelte}"],
  theme: {
    extend: {
      keyframes: {
        "scale-down": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.8)" },
        },
      },
      animation: {
        "scale-down": "scale-down 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  plugins: [],
};
