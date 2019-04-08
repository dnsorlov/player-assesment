const path = require('path');
const rules = require('./rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    path.resolve(__dirname, '../src/index.js'),
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
