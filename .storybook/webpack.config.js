const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['next/babel', { flow: false, typescript: true }]],
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')

  if (config.resolve.plugins) {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
  } else {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
  }
  return config
}
