import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  { ignores: ["src/components/ui"] },
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "eslint-config-next",
    ],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useDispatch", "useSelector"],
              message:
                "Please use the useAppSelector and useAppDispatch instead.",
            },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ["src/lib/store/hooks.ts"],
        rules: {
          "no-restricted-imports": "off",
        },
      },
    ],
  }),
];

export default eslintConfig;
