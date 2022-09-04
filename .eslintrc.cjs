module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // parsesrOptions 參考了 https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/index.js
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:react/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    /** 感覺設 warn 比較好，但 CRA 預設模板不關注 - start */
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'prefer-const': 'off',
    'no-case-declarations': 'off',
    // 官方提到自動推導很好，但如果明確定義 function 返回值型別的話，會減少編譯的負擔
    // https://github.com/microsoft/TypeScript/wiki/Performance#using-type-annotations
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** 設 warn 比較好，但 CRA 預設模板不關注 - end */
  },
};
