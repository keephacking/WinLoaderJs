const path = require('path');

module.exports = {
  entry: './src/module.js',
  output: {
    filename: 'winloader.min.js',
    path: path.resolve(__dirname, 'dist')
  }
};