module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testPathIgnorePatterns: ['<rootDir>/examples'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.pnpm|@babel/code-frame|@babel/highlight|@babel/helper-validator-identifier|chalk|color|d3|dateformat|delaunator|internmap|jsondiffpatch|lodash-es|nanoid|robust-predicates|uuid)',
  ],
};
