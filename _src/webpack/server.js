const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'http://localhost:10029/',
      files: [
        'dist/**/*.php',
        'dist/assets/css/**/*.css',
        'dist/assets/js/**/*.js'
      ]
    })
  ]
};