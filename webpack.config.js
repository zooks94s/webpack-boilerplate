const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const devMode = process.env.NODE_ENV !== 'production';
const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist');

module.exports = {
  mode: process.env.NODE_ENV,

  entry: path.join(srcDir, '/js/index.js'),

  output: {
    path: distDir,
    filename: 'js/main.js',
    assetModuleFilename: 'img/[name][ext]',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'pug-plain-loader',
                options: {
                  basedir: srcDir
                }
              }
            ]
          },
          {
            use: [
              {
                loader: 'pug-loader',
                options: {
                  pretty: true
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },

  devServer: {
    static: distDir,
    open: true,
    port: 3000
  },

  devtool: devMode ? 'eval-source-map' : false,

  watchOptions: {
    ignored: /node_modules/
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(srcDir, '/index.pug'),
      filename: 'index.html',
      minify: false,
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new StylelintWebpackPlugin()
  ],

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },

  target: ["web", "es5"],
};
