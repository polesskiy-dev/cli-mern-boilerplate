var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: {
    app: ['babel-polyfill', './src-frontend/index.js']
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
        loaders: ['babel-loader'],
        include: path.join(__dirname, '../src-frontend')
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
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'url' },
      //json
      { test: /\.json$/, loader: 'json' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    //Forbid transpile while build has errors
    new webpack.NoErrorsPlugin(),
    //Extract css to single file
    new ExtractTextPlugin('[name]-styles.css'),
    //Compress result bundle js
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
