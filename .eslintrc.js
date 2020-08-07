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
    WebFontConfig: true,
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
    'lines-between-class-members': 'off',
    'max-len': ['error', { code: 120 }],
    'object-curly-newline': ['error', {
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true,
        minProperties: 5,
      },
    }],
    'no-new': 'off',
  },
};
