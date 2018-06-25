const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'example'),
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'example/dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'example/dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    alias: {
      'react-material-ui-super-select': path.resolve(__dirname, 'src/index'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.NamedModulesPlugin()
  ]
};
