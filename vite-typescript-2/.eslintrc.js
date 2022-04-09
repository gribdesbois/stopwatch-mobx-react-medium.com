module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './vite.config.ts',
  },
  ignorePatterns: [
    'node_modules/**',
    '.storybook/**',
    'src/stories/**',
    '*.scss',
    '*.js',
  ],
  rules: {
    semi: 'off',
    /* '@typescript-eslint/no-unsafe-assignment': 'error', */
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/prefer-default-export': 'off',
    /* 'comma-dangle': ['error', 'always'], */
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended',
    /* 'eslint-plugin-prettier', */
    'prettier',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
}
