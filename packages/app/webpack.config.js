const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = () => {
  return {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'public/'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      port: 3002,
      contentBase: path.join(__dirname, 'public/'),
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        inject: false,
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new ModuleFederationPlugin({
        name: 'app',
        library: { type: 'var', name: 'app' },
        remotes: {
          app2: 'app2',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff2?|ttf|gif|svg|eot|otf|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader',
        },
      ],
    },
  }
}
