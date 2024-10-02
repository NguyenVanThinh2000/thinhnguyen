import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      react: react,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      // sort props
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
)
