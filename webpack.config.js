const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    watchFiles: ['./src/**/*', './index.html'],
    static: './dist',
  },
}
