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
    disableHostCheck: true,
  },
}
