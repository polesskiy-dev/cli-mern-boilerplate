var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [hotMiddlewareScript, 'babel-polyfill', './src-frontend/index.js']
  },

  output: {
    path: __dirname + '/../public/bundle',
    publicPath: '/',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['./node_modules'],
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
        test: /\.(less)$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'autoprefixer',
          'less')
      },
      // Font and images. Generate hashed file names to make them easy to cache.
      { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' },
      //json
      { test: /\.json$/, loader: 'json' }
    ]
  },

  plugins: [
    //HMR
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //Forbid transpile while build has errors
    new webpack.NoErrorsPlugin(),
    //Extract css to single file
    new ExtractTextPlugin('bundle.css'),
  ]
};

