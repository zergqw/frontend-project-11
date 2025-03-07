import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'no-param-reassign': ['error', { props: false }],
      'indent': ['error', 2],
      'semi': ['error', 'always'],
      'quote-props': ['error', 'as-needed'],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-trailing-spaces': ['error'],
      'padded-blocks': ['error', 'never'],
      'space-infix-ops': ['error'],
      'import/newline-after-import': ['error', { count: 1 }],
      'import/order': ['error', { 'newlines-between': 'always' }],
      'no-whitespace-before-property': ['error'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
];
