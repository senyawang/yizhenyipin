var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin");

var plugins = [];

// plugins.push(new CommonsChunkPlugin({name: "commons", minChunks: 1}))

if(process.env.WEBPACK_ENV === "build"){
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true }));
}

module.exports = {

  entry: {
    
    index: './src/js/index.js'

  },


  vue: {
    autoprefixer: { browsers: ['last 6 versions'] },
    loaders: {
        js: 'babel?{"presets":["es2015", "stage-2"], "plugins": [ "transform-runtime"]}'
    }
  },

  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'vux-components': 'vux/src/components/'
    },
    fallback: [path.join(__dirname, "node_modules")]
  },

  resolveLoader: { fallback: [path.join(__dirname, "node_modules")] },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
    // path: './js/build', // This is where images AND js will go
    // filename: '[name].js',
    // library: '[name]',
    // libraryTarget: 'umd',
    // umdNamedDefine: true
  },

  devtool: 'source-map',

  watch: true,
  
  module: {
    loaders: [
      {test: /\.html$/,   loader: 'html'},
      {test: /\.json$/,   loader: 'json'},
      {test: /\.vue$/,    loader: 'vue' },
      {test: /vux.src.*?js$/, loader: 'babel'},
      {test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/, query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime']
        }},
      {test: /\.css$/,    loader: 'style!css!autoprefixer'},
      {test: /\.scss$/,   loader: 'style!css!autoprefixer!sass!compass'},
      // {test: /\.woff$/,   loader: "url?limit=10000&minetype=application/font-woff"},
      // {test: /\.ttf$/,    loader: "file"},
      // {test: /\.eot$/,    loader: "file"},
      // {test: /\.svg$/,    loader: "file"}
    ]
  },
  plugins: plugins
};