const withCSS = require('@zeit/next-css')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = withCSS({
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
  target: 'serverless',
})