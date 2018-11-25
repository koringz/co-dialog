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
        },
        exclude: path.resolve(__dirname, 'node_module'),
        include: path.resolve(__dirname, 'src')
      },
    ]
  },

  plugins: [
  ]
};