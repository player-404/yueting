const path = require('path');
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 3000
      }
    },
  },
}
