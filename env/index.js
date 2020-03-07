const hostConfig = require('./hostConfig.' + process.env.NODE_DEPLOY)
// 本地调试代理
module.exports = {
  hostConfig,
  proxy: {
    '/feapi/profasten': {
      target: hostConfig.api,
      changeOrigin: true,
      pathRewrite: {
        '/feapi/profasten': ''
      }
    }
  }
}
