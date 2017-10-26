const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/winloader.js',
  output: {
    filename: 'winloader.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};