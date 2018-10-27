const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  resolve: {
    extensions: ['.js'],
  },

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
        use: [
           'css-loader'
        ]
      }
    ]
  },

  plugins: []
};