module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'mocha': true
  },
  'extends': ['eslint:recommended', 'plugin:node/recommended'],
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': [
      'error',
      2,
      {
        'MemberExpression': 0
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'node/exports-style': [
      'error',
      'module.exports'
    ],
    'node/prefer-global/buffer': [
      'error',
      'always'
    ],
    'node/prefer-global/console': [
      'error',
      'always'
    ],
    'node/prefer-global/process': [
      'error',
      'always'
    ],
    'node/prefer-global/url-search-params': [
      'error',
      'always'
    ],
    'node/prefer-global/url': [
      'error',
      'always'
    ],
    'node/no-unpublished-require': ['error', {
      'allowModules': ['chai-http', 'chai']
    }],
    'node/no-extraneous-require': ['error', {
      'allowModules': ['expect']
    }]
  }
};