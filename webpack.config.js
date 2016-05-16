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
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.test.js'],
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts',
        exclude: /node_modules/
      }
    ],
  }
};
