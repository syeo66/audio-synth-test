import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import reactCompiler from 'eslint-plugin-react-compiler'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/node_modules'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier,
      'simple-import-sort': simpleImportSort,
      'react-compiler': reactCompiler,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
      },
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      complexity: ['warn', 10],
      eqeqeq: 'error',
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-shadow': 'error',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'react-compiler/react-compiler': 'error',
    },
  },
]
