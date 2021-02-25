
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const Autoprefixer = require('autoprefixer')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = env => {
  let compile_path = 'js/index'
  let bundle_name_path = './src/js/index.js'
  return {
    // context: path.resolve(__dirname,'src'),
    mode: "production",
    entry: {
      [compile_path]: bundle_name_path,
      "css/style":`./src/sass/style.sass`
    },
    watch: true,
    cache: false,
    output: {
      path: path.resolve(__dirname,'dist'),
      filename: "[name].js"
    },
    devServer: {
      contentBase: path.resolve(__dirname,'dist'),
      open: true,
      overlay: true,
      port: 3000
    },
    devtool: 'source-map',
    module: {
      rules: [
       // {
       //    enforce: "pre",
       //    test: /\.js$/,
       //    exclude: /node_modules/,
       //    loader: "eslint-loader",
       //    options: {
       //      fix: true,
       //      failOnError: true
       //    }
       //  },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
       
         {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
             {
                loader: 'css-loader',
                // options: { url: false }
              },{
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      Autoprefixer({
                        browers:['last 2 versions','Android >= 4']
                      })
                    ]
                  },
                }
              },
              'sass-loader'
           ],
         },
         {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true
              }
            }
          ]
         },
      ]
    },
    plugins:[
      new CleanWebpackPlugin ({ verbose: true }),
      new ImageminWebpackPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant:{
          quality: '95-100'
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 10,
          colors: 256
        },
        svgo:{},
        plugins: [
          ImageminMozjpeg({
            quality: 85,
            progressive: true
          })
        ]
      }),
      // new MiniCssExtractPlugin({
      //   filename: 'css/style.css',
      //   ignoreOrder: true
      // }),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
        chunkFilename: "css/style.css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/pug/index.pug",
        filename: "index.html",
        minify: false
      }),
      // new StylelintWebpackPlugin({
      //   configFile:".stylelintrc",
      //   fix: true
      // })
    ],
    resolve: {
      extensions: [".js", ".json"]
    }
  }
};