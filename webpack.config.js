let path = require('path');
let webpack = require('webpack');
let nodeExternals = require('webpack-node-externals');

let browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
  ],
};

let serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [{ test: /\.(js)$/, use: 'babel-loader' }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};

module.exports = [browserConfig, serverConfig];
