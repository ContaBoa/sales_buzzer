const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');


const common = {
  entry: {
    app: './client/src/app'
  },
  output: {
      filename: 'app.js',
      path: path.join(__dirname, 'client/build/')
  },
  module: {
      rules: [{
          test: /\.jsx?$/,
          include: path.join(__dirname, 'client/src'),
          exclude: path.join(__dirname, 'node_modules'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
      }]
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
}

const devConfig = {devtool: 'eval-source-map'}

const prodConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
}

module.exports = (env) => {
  if(env === 'production')
    return merge(common, prodConfig)
  else
    return merge(common, devConfig)
}
