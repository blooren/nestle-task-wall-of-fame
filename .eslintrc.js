module.exports = {
    root: true,
    env: {
      browser: true,
      jquery: true,
      es6: true,
      node: true
    },
    extends: 'eslint:recommended',
    globals: {
      Drupal: true,
      drupalSettings: true,
      drupalTranslations: true,
      jQuery: true,
      _: true,
      Modernizr: true
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'strict': ['error', 'function'],
      'quotes': ['warn', 'single'],
      'indent': ['warn', 2],
      'semi': ['error', 'always']
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    }
  };