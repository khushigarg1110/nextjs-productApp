// module.exports = {
//     collectCoverage: true,
//     collectCoverageFrom: ['src/**/*.{js,jsx}'],
//     coverageDirectory: 'coverage',
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// }

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);