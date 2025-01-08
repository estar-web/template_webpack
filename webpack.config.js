const { merge } = require('webpack-merge');
const paths = require('./webpack/path');

const common = require('./webpack/common');
const image = require('./webpack/image');
const script = require('./webpack/script');
const php = require('./webpack/php');
const sass = require('./webpack/sass');
const server = require('./webpack/server');

module.exports = merge(
  common,
  image,
  script,
  php,
  sass,
  server,
  {
    resolve: {
      alias: {
        'images': `${paths.dist}/${paths.assets.images}/`,
      },
    },
  }
);