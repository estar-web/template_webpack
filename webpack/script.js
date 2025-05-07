const paths = require('./path');

module.exports = {
  entry: {
    bundle: `${paths.src}/index.js`
  },
  output: {
    filename: `${paths.assets.js}/[name].js`,
    path: paths.dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ]
  }
};