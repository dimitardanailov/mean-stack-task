const path = require('path')

module.exports = {
  roots: [path.join(__dirname, '../src')],
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    __dirname,
    path.join(__dirname, '../src'),
  ],
  testMatch: ['**/__tests__/*.*'],
  testEnvironment: 'node',
}
