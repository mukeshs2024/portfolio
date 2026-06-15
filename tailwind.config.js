/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#B3B3B3",
        accent: "#F97316",
        darkbg: "#000000",
        surface: "#111111",
        bordercol: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(13, 27, 76, 0.12)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top left, rgba(245,166,35,0.16), transparent 34%), radial-gradient(circle at top right, rgba(13,27,76,0.12), transparent 30%), linear-gradient(180deg, rgba(250,250,250,1), rgba(245,247,252,1))",
        "dark-hero": "radial-gradient(circle at top left, rgba(245,166,35,0.18), transparent 35%), radial-gradient(circle at top right, rgba(59,92,189,0.18), transparent 32%), linear-gradient(180deg, rgba(6,10,26,1), rgba(10,16,38,1))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};
