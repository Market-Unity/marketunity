const path = require('path');
const SRC_DIR = path.join(__dirname, '/src');
const DES_DIR = path.join(__dirname, '/dist');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
  filename: 'styles.css'
});

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: DES_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015' ]
        }
      },
      { 
        test: /\.css$/, 
        loader: ["style-loader", "css-loader"] 
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};