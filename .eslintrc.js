module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    env: {
      browser: true,
      amd: true,
      node: true
    },
    rules: {
      indent: ['error', 2],
      quotes: [2, 'single', { avoidEscape: true }],
      'linebreak-style': ['error','unix'],
      semi: ['error','always'],
      'no-console': ['warn', { 'allow': ['info', 'error'] }]
    },
    extends: ['eslint:recommended', 'plugin:react/recommended']
  };
  