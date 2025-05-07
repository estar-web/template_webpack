const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const paths = require('./path');

module.exports = {
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'http://localhost:8884/',
      files: [
        'dist/**/*.php',
        'dist/assets/css/**/*.css',
        'dist/assets/js/**/*.js',
        'dist/assets/images/**/*.*'
      ]
    })
  ]
};