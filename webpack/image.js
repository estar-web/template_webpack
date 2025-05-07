const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require('path');
const fs = require('fs');
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
    // 画像ファイルをコピー
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${paths.src}/images`),
          to: path.resolve(__dirname, `${paths.dist}/assets/images`),
          noErrorOnMissing: true,
          force: true
        }
      ]
    }),
    
    // 画像の圧縮とWebP変換
    new ImageMinimizerPlugin({
      // 圧縮設定
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['mozjpeg', { quality: 75 }], // JPEGの圧縮
            ['pngquant', { quality: [0.75, 0.75] }], // PNGの圧縮
          ],
        },
      },
      // WebP変換
      generator: [
        {
          type: 'asset',
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ['webp', { quality: 75 }], // WebP変換
            ]
          },
        },
      ],
    }),
    
    // WebP変換後に元のPNG/JPEGファイルを削除
    // 別のアプローチでFileManagerPluginを使用
    new FileManagerPlugin({
      events: {
        onEnd: {
          // カスタムの削除処理
          delete: [
            {
              source: path.resolve(__dirname, `${paths.assets.images}/**/*.{png,jpg,jpeg}`),
              options: {
                force: true
              }
            }
          ]
        }
      }
    }),
  ]
};