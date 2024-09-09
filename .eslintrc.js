const ALLOW_PASCAL_CASE = '^[A-Z][a-z]+(?:[A-Z][a-z]+)*$'
const ALLOW_KEBAB_CASE = '^[a-z-.1-9]+$'
const ALL_CAMEL_CASE = '[a-z]+((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?'

module.exports = {
  extends: ['airbnb-typescript/base', 'plugin:jest/recommended', 'prettier'],

  env: {
    jest: true,
    node: true,
    es6: true
  },
  plugins: ['import', 'filenames'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },

  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'max-statements': ['error', 25],
    'filenames/match-regex': ['error', `${ALLOW_KEBAB_CASE}|${ALLOW_PASCAL_CASE}|${ALL_CAMEL_CASE}`, true],
    'no-tabs': 0,
    complexity: ['error', { max: 5 }],
    'max-params': ['error', 3],
    'max-depth': ['error', 3],
    'max-lines': ['error', 200],
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'layer/crm-logging-and-exception-handling-layer/nodejs/node_modules']
      }
    }
  }
}
