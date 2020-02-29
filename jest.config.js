const makeModuleNameMapper = (srcPath, tsconfigPath) => {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions

  const aliases = {}

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '/(.*)')
    const path = paths[item][0].replace('/*', '/$1')
    aliases[key] = srcPath + '/' + path
  })
  return aliases
}

const TS_CONFIG_PATH = './jest.tsconfig.json'
const SRC_PATH = '<rootDir>/src'

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)', '**/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/init.ts', 'jest-canvas-mock'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  // necessary for using ts path alias on tests
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: 'jest.tsconfig.json',
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
}
