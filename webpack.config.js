const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  if (!options) options = {};

  const MODE = (options.production)
    ? 'production'
    : 'development';

  return {
    mode: MODE,

    entry: path.resolve('src', 'frontend', 'index.tsx'),

    output: {
      path: __dirname + '/lib/static',
      filename: 'bundle.js'
    },

    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader?limit=1024&name=[name].[ext]' },
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("src", "frontend", "index.html")
      }),
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    }

  }
}
