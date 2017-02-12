var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: ['webpack-hot-middleware/client', 'babel-polyfill', './src-frontend/index.js']
  },

  output: {
    path: path.join(__dirname, '..', 'public', 'dist'),
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
      { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url' },
      { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'url' },
      //json
      { test: /\.json$/, loader: 'json' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    //HMR
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //Forbid transpile while build has errors
    new webpack.NoErrorsPlugin(),
    //Extract css to single file
    new ExtractTextPlugin('[name]-styles.css'),
  ]
};
