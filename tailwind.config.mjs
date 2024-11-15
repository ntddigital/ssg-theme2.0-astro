/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
import typographyPlugin from "@tailwindcss/typography";
import defaultTheme from 'tailwindcss/defaultTheme';
import { UI } from "../website/config/siteConfig";

export default {
  // safelist: [{ pattern: /./ }],
  content: [
    "./theme/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "../website/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue},",
    "!../node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        primary: UI.primaryColor,
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
  
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-medium": "spin 1.5s linear infinite",
        "spin-fast": "spin 0.75s linear infinite",
      },
      scrollMargin: {
        50: "50px",
        100: "100px",
        150: "150px",
        200: "200px",
        250: "250px",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        middle: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        all: "1px 1px 2px var(--tw-shadow-color), -1px -1px 2px var(--tw-shadow-color), 1px -1px 2px var(--tw-shadow-color), -1px 1px 2px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
  darkMode: "class",
};
