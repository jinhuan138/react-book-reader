module.exports = {
  semi: false,
  singleQuote: true,
  pluginSearchDirs: false,
  printWidth: 80,
  proseWrap: 'never',
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
        parser: 'json'
      },
    },
  ],
};
