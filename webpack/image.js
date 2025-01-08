const CopyPlugin = require('copy-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const paths = require('./path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${paths.assets.images}/[name][ext]`,
        }
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: `${paths.src}/images`,
          from: "**/*.{png,jpg,jpeg}",
          to: `${paths.assets.images}/[name].webp`,
          noErrorOnMissing: true,
          force: true
        },
        {
          context: `${paths.src}/images`,
          from: "**/*.{svg,gif,ico,mp4,webp}",
          to: `${paths.assets.images}/[name][ext]`,
          noErrorOnMissing: true,
          force: true
        }
      ]
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(png|jpe?g)$/i,
        options: {
          quality: 75
        }
      }],
      overrideExtension: true,
      silent: false,
      detailedLogs: true
    }),
  ]
};