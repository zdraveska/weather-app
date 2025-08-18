import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.js', 'public/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },

    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports
    },

    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'none',
          argsIgnorePattern: '^_'
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'no-unused-expressions': 'error',
      'quotes': ['error', 'single'],
      'no-console': 'off',
      'import/no-unresolved': 'error'
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs'],
          moduleDirectory: ['node_modules', 'src']
        }
      }
    }
  }
];
