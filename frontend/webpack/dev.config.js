'use strict'

const webpack = require('webpack')
const common = require('./common')
const HtmlPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    common.entry.main
  ],

  output: Object.assign({}, common.output, {
    filename: '[name].js',
    publicPath: '/'
  }),

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HtmlPlugin(common.htmlPluginConfig),
    new CleanWebpackPlugin([common.paths.public])
  ],

  module: {
    rules: [
      common.jsLoader,
      common.stylusLoader,
      common.fileLoader,
      common.urlLoader
    ]
  },

  resolve: common.resolve
}
