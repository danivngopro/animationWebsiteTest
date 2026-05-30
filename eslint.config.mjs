// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  {
    rules: {
      // Allow `any` casts where needed (icon maps etc.)
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused vars that are prefixed with _
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
    ignores: ["node_modules/**", ".next/**", "dist/**"],
  }
);
