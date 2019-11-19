module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    //prettier enviar errors
    'prettier/prettier': 'error',
    // todos os metodos da clase usam this
    'class-methods-use-this': 'off',
    // não pode manipular parametros recebidos
    'no-param-reassign': 'off',
    // use apenas camelCase
    'camelcase': 'off',
    // Não de erro quando não utilizar a var next do express
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
  },
};
