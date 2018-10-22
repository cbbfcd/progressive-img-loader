const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        use: [
          'progressive-img-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              publicPath: './'
            }
          }
        ]
      }
    ]
  }
}