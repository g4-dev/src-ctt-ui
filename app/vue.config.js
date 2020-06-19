module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
