module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb-base"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    // todos os metodos da clase usam this
    "class-methods-use-this": "off",
    // não pode manipular parametros recebidos
    "no-param-ressign": "off",
    // use apenas camelCase
    "camelcase": "off",
    // Não de erro quando não utilizar a var next do express
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  }
};
