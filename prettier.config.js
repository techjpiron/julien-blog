/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  tailwindStylesheet: "./app/app.css",
  importOrder: [
    "react",
    "react-router",
    "react-router/*",
    "<THIRD_PARTY_MODULES>",
    "~/components/*",
  ],
};

export default config;
