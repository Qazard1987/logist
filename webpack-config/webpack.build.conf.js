const merge = require('webpack-merge'),
      baseWebpackConfig = require('./webpack.base.conf'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
