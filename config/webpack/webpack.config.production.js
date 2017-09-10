const webpack = require('webpack');
const merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  entry: './index',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new UglifyJSPlugin(),
  ],
});