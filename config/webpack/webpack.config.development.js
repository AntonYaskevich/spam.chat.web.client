const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const sourcePath = path.join(__dirname, '../../src');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${process.env.SCHEME}://${process.env.HOST}:${process.env.PORT}`,
    'webpack/hot/only-dev-server',
    './index',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: sourcePath,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: {
      '/signal': {
        target: `ws://${process.env.WS_HOST}:${process.env.WS_PORT}`,
        ws: true,
      },
    },
  },
});
