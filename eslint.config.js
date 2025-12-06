import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: pluginVue,
    },
    rules: {
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',

      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',

      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'off',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
    },
    ignores: ['node_modules', 'dist'],
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },

  // 最后覆盖，显式关闭 no-explicit-any
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
