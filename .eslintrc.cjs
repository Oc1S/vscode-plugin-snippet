const { getEslintConfig } = require('@kiefer/config')

module.exports = getEslintConfig('default', {
  ignorePatterns: ['test-workspace', 'README.md'],
})
