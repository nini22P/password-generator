const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve(__dirname, 'src', 'popup.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'popup.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'static/',
          to: './',
          globOptions: {
            ignore: [
              '**/*.bat',
              '**/password-generator-lite.png'
            ]
          }
        }
      ]
    }),
    new ESLintPlugin(),
  ],
  performance: {
    hints: false
  },
}