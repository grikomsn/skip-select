// @ts-check

const { extendEslint } = require("@grikomsn/style-guide");

module.exports = extendEslint(["browser-node", "react", "next", "typescript"], {
  extends: ["plugin:@tanstack/eslint-plugin-query/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "react/no-unstable-nested-components": ["off"],
  },
  root: true,
});
