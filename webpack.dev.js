const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
 devtool: 'inline-source-map',
 devServer: {
   contentBase: path.join(__dirname, 'public'),
   historyApiFallback: true,
   publicPath: '/dist/'
 },
 mode: 'development'
});
