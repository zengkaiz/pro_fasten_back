const webpack = require('webpack')
const path = require('path')
const resolve = (file) => path.resolve(__dirname, file)
let env = {}
if (process.env.NODE_DEPLOY !== 'production') {
  env = require('./env')
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: env.proxy
  },
  configureWebpack: (config) => ({
    plugins: [
      new webpack.DefinePlugin({
        'process.host': getDeployConfigDefine()
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
    config[key] = `'${env[key].api}'`
  })
  return config
}
