module.exports = {
	bail: 1,
	testTimeout: 30000,
	verbose: true,
	testEnvironment: 'node',
	testPathIgnorePatterns: ['<rootDir>/node_modules'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  watchPathIgnorePatterns:['<rootDir>/node_modules']
}
