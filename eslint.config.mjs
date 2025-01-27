import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // 1) Base ESLint recommended config for JS
  {
    // Spread the recommended config from @eslint/js
    ...js.configs.recommended,
    env: {
      browser: true, // Enables browser globals like `document`
      es2021: true,  // Enables ES2021 features like `let` and `const`
    },
  },

  // 2) TypeScript config
  {
    // Apply these rules only to TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      // If you want "type-aware" linting, point to your tsconfig:
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Pull in TypeScript recommended rules
      ...tsPlugin.configs.recommended.rules,

      // If you want stricter type-aware rules, also spread these:
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules,

      // Example: override some rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Add more TS-specific rules here
    },
  },

  // 3) React + React Hooks config
  {
    // Apply these rules to TSX (and possibly JS/JSX if you want)
    files: ["**/*.tsx", "**/*.jsx"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // React recommended rules
      ...react.configs.recommended.rules,
      // React Hooks recommended rules
      ...reactHooks.configs.recommended.rules,
       "@typescript-eslint/no-misused-promises": [2, {
      "checksVoidReturn": {
      "attributes": false
    }}],

      // TS already handles prop-types, so disable this:
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect", // Automatically pick the installed React version
      },
    },
  },
];
