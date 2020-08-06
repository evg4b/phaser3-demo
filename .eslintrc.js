module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Phaser: 'readonly',
  },
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ts',
        ],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      js: 'never',
    }],
    'no-plusplus': 'off',
  },
};
