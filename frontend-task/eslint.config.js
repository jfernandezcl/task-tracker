import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  tsPlugin.config(js.configs.recommended, tsPlugin.configs.recommended),

  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
  },

  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react: reactPlugin },
    ...reactPlugin.configs.flat.recommended,
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  }
);
