const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    host: '127.0.0.1',
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    },
    setup(app) {
      app.post('*', (req, res) => {
        res.redirect(req.originalUrl);
      });
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
