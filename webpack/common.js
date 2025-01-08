const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./path');

module.exports = {
  mode: 'development',
  entry: './_src/index.js',
  output: {
    path: paths.dist,
    filename: `${paths.assets.js}/bundle.js`,
    assetModuleFilename: `${paths.assets.images}/[name][ext]`,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!style.css'],
    }),
  ]
};