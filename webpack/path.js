const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../_src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: {
    images: 'assets/images',
    css: 'assets/css',
    js: 'assets/js'
  }
};