const config = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
    'test-utils': '<rootDir>/test-utils',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
}

export default config
