const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: './src/codialog.js',

  output: {
    path: __dirname + "/dist",
    filename: 'co-dialog.js',
    libraryTarget: 'umd',
    // library: 'Coog',
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
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,

        uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {
              drop_console: false,
              drop_debugger: false
            },
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: true,
            toplevel: false,
            nameCache: null,
            comments: true,
            ie8: false,
            keep_fnames: true,
            parallel: false,
            cache: true
         }
      })
    ]
  },

  plugins: [
    
  ]
};