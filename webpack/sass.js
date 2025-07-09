const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./path');
const path = require('path');
const chokidar = require('chokidar');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '../images/[name].[ext]',
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('css-declaration-sorter')({
                    order: 'alphabetical'
                  }),
                  require('postcss-sort-media-queries')({
                    sort: 'desktop-first',
                  }),
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'webpack-dart-sass-glob',
            options: {
              includePaths: [`${paths.src}/scss`],
              globOptions: {
                follow: true,
                dot: true
              }
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${paths.assets.css}/style.css`,
      ignoreOrder: true,
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEnvironment.tap('ScssWatcher', () => {
          const watcher = chokidar.watch(path.join(paths.src, 'scss/**/*.scss'), {
            ignored: [
              /(^|[\/\\])\../,
              '**/node_modules/**'
            ],
            persistent: true,
            ignoreInitial: false,
            awaitWriteFinish: {
              stabilityThreshold: 300,
              pollInterval: 100
            },
            usePolling: true,
            interval: 100,
            depth: null,
            followSymlinks: true
          });

          watcher.on('add', (filepath) => {
            console.log(`New SCSS file detected: ${filepath}`);
            if (compiler.watching) {
              compiler.watching.invalidate();
              if (compiler.cache) {
                try {
                  compiler.cache.reset();
                } catch (e) {
                  console.error('Cache reset error:', e);
                }
              }
            }
          });

          watcher.on('change', (filepath) => {
            console.log(`SCSS file changed: ${filepath}`);
            if (compiler.watching) {
              compiler.watching.invalidate();
              if (compiler.cache) {
                try {
                  compiler.cache.reset();
                } catch (e) {
                  console.error('Cache reset error:', e);
                }
              }
            }
          });

          watcher.on('unlink', (filepath) => {
            console.log(`SCSS file deleted: ${filepath}`);
            if (compiler.watching) {
              compiler.watching.invalidate();
              if (compiler.cache) {
                try {
                  compiler.cache.reset();
                } catch (e) {
                  console.error('Cache reset error:', e);
                }
              }
            }
          });

          watcher.on('error', error => {
            console.error('Watcher error:', error);
          });
        });
      }
    }
  ],
  watch: true,
  watchOptions: {
    ignored: ['**/node_modules/**'],
    aggregateTimeout: 300,
    poll: 1000,
  },
  cache: false,
  infrastructureLogging: {
    level: 'info',
    debug: true
  },
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    warnings: true
  }
};