const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./path');

module.exports = {
  mode: 'production',
  entry: './_src/index.js',
  output: {
    clean: {
      keep: /style\.css$/, // style.cssファイルを保持する
    },
    path: paths.dist,
    assetModuleFilename: `${paths.assets.images}/[name][ext]`,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!style.css'],
    }),
  ]
};