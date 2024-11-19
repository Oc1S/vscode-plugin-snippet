const { getEslintConfig } = require('@kiefer/config')
module.exports = getEslintConfig('', {
  ignorePatterns: ['test-workspace', 'README.md'],
})
