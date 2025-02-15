module.exports = {
  extends: ['@snowpact/eslint-config/node-typescript'],
  rules: {
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/require-await': ['off'],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['**/tests/*'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['tests/**/*', 'tests/*', 'fixtures/processor/*'],
      },
    ],
  },
};
