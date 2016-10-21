var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: ['./src-frontend/index.js', hotMiddlewareScript]
  },

  output: {
    path: __dirname + '/../public/bundle',
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    preLoaders: [
      {
        test: /\.js|\.spec.js$/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      //Compile ES6/7 to ES5 via babel
      {
        test: /\.(js)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {}
      },
      //CSS
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      // LESS
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'autoprefixer',
          'less')
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    //HMR
    new webpack.HotModuleReplacementPlugin(),
    //Forbid transpile while build has errors
    new webpack.NoErrorsPlugin(),
    //Extract css to single file
    new ExtractTextPlugin('bundle.css'),
  ]
};

