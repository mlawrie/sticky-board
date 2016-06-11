'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appEntries = ['./src/index.tsx']
  .concat(process.env.NODE_ENV === 'development' ? 'webpack-hot-middleware/client?reload=true' : []);

module.exports = {
  entry: {
    app: appEntries,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],

  devtool: 'source-map',

  resolve: {
    root: __dirname,
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.test.ts', '.test.tsx'],
    alias: {
      state: 'src/state',
      sticky: 'src/sticky',
      canvas: 'src/canvas',
      utils: 'src/utils',
      board: 'src/board',
      api: 'src/api',
      testHelpers: 'src/testHelpers'
    }
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  }
};
