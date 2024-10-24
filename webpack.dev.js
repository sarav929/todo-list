const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',  // Faster rebuilds with inline source maps for debugging
  devServer: {
    static: './dist',  // Directory to serve content from
    hot: true,  // Enable hot module replacement
  },
});