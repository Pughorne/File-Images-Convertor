module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {"^@/(.+)$": "<rootDir>/src/$1"},
  testPathIgnorePatterns: ['/build/', '/node_modules/']
};
