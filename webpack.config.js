const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    path: __dirname + "/dist",
    filename: 'co-dialog.js',
    library: 'coog',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },

  plugins: [
  ]
};