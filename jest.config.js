module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testRegex: ['.*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: [
    './infra/**',
    './src/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!./infra/Types.d.ts',
    '!./infra/config/**'
  ],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}
