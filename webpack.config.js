let path = require('path');
let webpack = require('webpack');
let nodeExternals = require('webpack-node-externals');

let broswerConfig = {
  entry: './src/broswer/index.js',
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
      __isBroswer__: 'true',
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
      __isBroswer__: 'false',
    }),
  ],
};

module.exports = [broswerConfig, serverConfig];
