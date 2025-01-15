const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')(),
                  require('css-declaration-sorter')({
                    order: 'smacss'
                  }),
                  require('postcss-sort-media-queries')({
                    sort: 'desktop-first',
                  })
                ],
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
          {
            loader: 'webpack-dart-sass-glob',
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${paths.assets.css}/style.css`,
      ignoreOrder: true,
    }),
  ]
};