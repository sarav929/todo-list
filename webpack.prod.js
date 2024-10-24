const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',  // Source maps for production, but in a separate file
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),  // JavaScript minification
      new CssMinimizerPlugin(),  // CSS minification
    ],
  },
});