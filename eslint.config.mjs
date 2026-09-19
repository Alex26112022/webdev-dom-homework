import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '.next/',
      '.nuxt/',
      '.vscode/',
      '.git/',
      '.github/',
      '*.config.js',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      eqeqeq: ['error', 'always'],
    },
  },

  eslintPluginPrettierRecommended,
];
