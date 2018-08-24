const os = require('os')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: {
    host: '0.0.0.0'
  },
  mode: 'development',
  devtool: 'source-map',
  entry: ['@babel/polyfill/noConflict', path.resolve(__dirname, 'src', 'index')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /(node_modules)/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      // Including node_mdodules
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      'AGENT_URL': 'http://localhost:2018',
      'HOME_DIR': os.homedir()
    }),
    new webpack.HotModuleReplacementPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ],
  // Required for hot reload inside docker container
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}
