const webpack = require('webpack')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const resolve = (file) => path.resolve(__dirname, file)
let env = {}
if (process.env.NODE_DEPLOY !== 'production') {
  env = require('./env')
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: env.proxy
  },
  configureWebpack: (config) => ({
    plugins: [
      new webpack.DefinePlugin({
        'process.host': getDeployConfigDefine()
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }),
  chainWebpack: (config) => {
    // alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
    config.resolve.modules.add('assets/images/sprites/build')
  }
}
// deploy config converter
function getDeployConfigDefine() {
  let config = {}
  Object.keys(env).forEach(function(key) {
    config[key] = `${JSON.stringify(env[key])}`
  })
  return config
}
