// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  // 1) Reglas básicas de JS + TS
  tsPlugin.config(js.configs.recommended, tsPlugin.configs.recommended),

  // 2) Ajustes de entorno y parsing ESM/JSX para todos los archivos
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

  // 3) Reglas específicas de React en JSX/TSX
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react: reactPlugin },
    ...reactPlugin.configs.flat.recommended,
    rules: {
      // React 17+ no necesita import React en cada componente
      "react/react-in-jsx-scope": "off",
    },
  }
);
