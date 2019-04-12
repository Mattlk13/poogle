// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/node_modules/**', '!src/index.ts'],
  coverageReporters: ['json', 'text'],
};
