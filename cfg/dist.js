'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  // entry: path.join(__dirname, '../src/index'),
  entry :{
    app: path.join(__dirname, '../src/index'),
    vendor: ['antd-mobile'],
    antd: ['antd'],
    common: ['react','react-dom','react-router','moment']
  },
  output: { // 覆盖bese的输出
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].js',
    publicPath: '.'+defaultSettings.publicPath,
    // chunkFilename: path.join(__dirname, '/../dist/assets/[name].js')
    chunkFilename: '[name].js'
  },
  cache: false,
  devtool: 'false', // false 或者 cheap-module-source-map
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false //去掉注释
      },
      compress: {
        warnings: false //去掉警告
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','antd','common']
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
