const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    popup: path.resolve(__dirname, 'src/popup', 'popup.js')
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup/popup.html',
      template: path.resolve(__dirname, 'src/popup/', 'popup.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'static/',
          to: './',
          globOptions: {
            ignore: [
              '**/*.bat'
            ]
          }
        }
      ]
    })
  ]
}