var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    
    index: './src/js/index.js',
    search: './src/js/search.js',
    article: './src/js/article.js',
    village: './src/js/village.js',
    modules: './src/js/modules.js'

  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'vux-components': 'vux/src/components/'
    },
    fallback: [path.join(__dirname, "node_modules")]
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  vue: {
    autoprefixer: { browsers: ['last 6 versions'] }
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: []
}

var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin");

module.exports.plugins.push(new CommonsChunkPlugin({name: "commons", minChunks: 2}))


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
