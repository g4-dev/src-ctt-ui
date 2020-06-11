module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath:
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[name]-[hash]',
        },
        localsConvention: 'camelCaseOnly',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: '',
        onProxyReq: function (request, req) {
          req.setHeader('origin', process.env.VUE_APP_BASE_URL)
        },
      },
    },
    disableHostCheck: true,
  },
}
