const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const raw = require('./webpack.config.json');
const { $schema, ...json } = raw;

const config = {
  ...json,
  mode: process.env.NODE_ENV || json.mode || 'development',
  entry: json.entry,
  output: {
    ...json.output,
    path: path.resolve(__dirname, json.output.path)
  },
  resolve: json.resolve,
  module: {
    rules: json.module.rules.map(r => ({
      ...r,
      test: new RegExp(r.test),
      exclude: r.exclude ? path.resolve(__dirname, r.exclude) : undefined
    }))
  },
  plugins: [new HtmlWebpackPlugin(json.plugins[0][1])],
  devServer: {
    ...json.devServer,
    static: { directory: path.resolve(__dirname, json.devServer.static.directory) }
  }
};

module.exports = config;
