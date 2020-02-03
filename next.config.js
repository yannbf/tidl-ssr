const withCSS = require('@zeit/next-css')
const withOffline = require('next-offline')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const nextConfig = {
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    return config
  },
  target: 'serverless',
}

module.exports = withOffline(withCSS(nextConfig))
