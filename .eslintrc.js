/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['mado/base'],
  ignorePatterns: ['dist'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unsafe-call': 'off',
  },
};
