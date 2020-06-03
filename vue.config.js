module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/ctt-ui/' : '/',
  // css: {
  //   loaderOptions: {
  //     css: {
  //       modules: {
  //         localIdentName: '[name]-[hash]'
  //       },
  //       localsConvention: 'camelCaseOnly'
  //     }
  //   }
  // }
}
