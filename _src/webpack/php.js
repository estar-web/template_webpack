const CopyPlugin = require('copy-webpack-plugin');
const paths = require('./path');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: paths.src,
          from: './**/*.php',
          to: '[path][name][ext]',
        }
      ]
    }),
  ]
};