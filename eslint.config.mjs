// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
