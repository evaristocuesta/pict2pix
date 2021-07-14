const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pict2pix.min.js',
    library: {
      name: 'pict2pix',
      type: 'var'
    }
  },
};