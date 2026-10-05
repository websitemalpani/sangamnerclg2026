import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/legacy-pages/**/*.html",
  ],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ink: "#111d45", forest: "#183b73", leaf: "#1f5cac",
        lime: "#ffd84d", cream: "#fffaf0", sand: "#f3e5cc", coral: "#f15b3a",
      },
    },
  },
} satisfies Config;
