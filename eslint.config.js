// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const unusedImports = require('eslint-plugin-unused-imports');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  // TypeScript
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettierRecommended,
    ],
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    processor: angular.processInlineTemplates,
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },

  // Angular templates
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },

  // Prettier in Angular templates
  {
    files: ['**/*.html'],
    ignores: ['**/inline-template-*.component.html'],
    extends: [prettierRecommended],
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },
]);
