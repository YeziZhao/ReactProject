// 将CSS从文件中分离出来，为每一个包含了css的js文件创建css file。它支持CSS和SourceMaps的按需加载
// 该插件在production构建时使用。不需要在开发环境（特别是HMR）与style-loader一起使用。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 常用的每项的格式为{from: 'path', to: 'path'}。将form目录 copy 到to的目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。会产生一个包含以下内容的文件 dist/index.html。如果你有任何CSS assets 在webpack的输出中（例如， 利用MiniCssExtractPlugin提取CSS）， 那么这些将被包含在HTML head中的<link>标签内。
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 为css添加前缀
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';
const VERSION = `v${pkg.version}`;
const IS_PROD = ENV === 'production';

const SOURCE_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
const CLIENT_DIR = path.join(OUTPUT_DIR, VERSION);

// 多国语注入文件
const buildConfig = require('./buildConfig.js');
const BUILD_DOMAIN = process.env.BUILD_DOMAIN || 'localhost';
const config = buildConfig[BUILD_DOMAIN];
const localeMessages = require(`./src/i18n`);
module.exports = {
    mode: ENV,
    target: 'web',
    context: SOURCE_DIR, // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和loader
    entry: { // entry: 如果是一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。
        client: './index.js',
    },
    output: {
        path: CLIENT_DIR,
        filename: 'assets/[name].[hash:8].js', // 使用入口名称: [name].bundle.js, 使用内部 chunk id: [id].bundle.js, 每次构建过程中，唯一的 hash 生成:[name].[hash].bundle.js , 基于每个 chunk 内容的 hash:[chunkhash].bundle.js
        libraryTarget: 'umd', // umd将你的 library 暴露为所有的模块定义下都可运行的方式,它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量
    },
    optimization: { // 代码分割。参考https://segmentfault.com/a/1190000013476837
        splitChunks: {
          cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
          },
        },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    // module: {
    //     rules: [{
    //         test: /\.(jsx|js)$/,
    //         exclude: /node_modules/,
    //         use: {
    //             loader: 'babel-loader'
    //         },
    //     },
    //     {
    //         test: /\.scss$/,
    //         exclude: /node_modules/,
    //         use: IS_PROD ? [
    //             MiniCssExtractPlugin.loader, // production环境，使用MiniCssExtractPlugin插件处理样式
    //             {
    //                 loader: 'css-loader', // 处理css
    //                 options: { minimize: true },
    //             },
    //             {
    //                 loader: 'postcss-loader', // 处理postcss
    //                 options: {
    //                     plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
    //                     sourceMap: true,
    //                 },
    //             },
    //             {
    //                 loader: 'sass-loader', // 处理sass
    //                 options: {
    //                     includePaths: [ // sass-loader 的 includePaths 设置为 src/ 目录，这是为了项目中的 scss 文件可以方便地使用绝对路径相互引用，而不需要使用较为繁琐且不利用重构的相对路径
    //                         SOURCE_DIR,
    //                     ],
    //                 },
    //             },
    //         ] : 
    //         [
    //             {
    //                 loader: 'style-loader', // HMR 熱加載使用style-loader。将样式动态添加到页面。开发时使用 style-loader 而不是 css-loader 来加载 CSS，这是为了结合 webpack-dev-server 的热更新（hot reload）功能，在本地开发时将所有的 CSS 都直接内嵌至 HTML 中以加快热更新的速度。
    //                 options: { singleton: true },
    //             },
    //             'css-loader',
    //             {
    //                 loader: 'postcss-loader',
    //                 options: {
    //                     plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
    //                     sourceMap: true,
    //                 },
    //             },
    //             {
    //                 loader: 'sass-loader',
    //                 options: {
    //                     includePaths: [
    //                         SOURCE_DIR,
    //                     ],
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         test: /\.css$/,
    //         include: /node_modules/, // 项目开发中，我们可能会引入第三方CSS库，为了避免第三方提供的CSS没有做浏览器兼容处理，在加载node_modules中的css时使用postcss-loader 再统一处理一遍，确保所有进入生产环境的 CSS 都经过了相应的浏览器兼容性处理
    //         use: [
    //             MiniCssExtractPlugin.loader,
    //             'css-loader',
    //             {
    //                 loader: 'postcss-loader',
    //                 options: {
    //                     plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
    //                     sourceMap: true,
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
    //         use: IS_PROD ? 
    //             {
    //                 loader: 'file-loader',
    //                 options: {
    //                     name: '[name].[hash:8].[ext]',
    //                     outputPath: 'assets/images/',
    //                 },
    //             } :
    //             {
    //                 loader: 'url-loader',
    //             },
    //     }
    //     ]
    // },
    module: {
      rules: [{
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: IS_PROD ? [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                SOURCE_DIR,
              ],
            },
          },
        ] : [
          {
            loader: 'style-loader',
            options: { singleton: true },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                SOURCE_DIR,
              ],
            },
          },
        ],
      }, {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      }, {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: 'last 5 versions' })],
              sourceMap: true,
            },
          },
        ],
      }, {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: IS_PROD ? {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'assets/images/',
          },
        } : {
          loader: 'url-loader',
        },
      }],
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(ENV),
          'process.env.BUILD_CONFIG': JSON.stringify(config),
          'process.env.BUILD_LOCALE_MESSAGES': JSON.stringify(localeMessages),
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.[hash:8].css',
            chunkFilename: 'assets/css/[id].[hash:8].css',
        }),
        new CopyWebpackPlugin([
            { from: 'favicon.ico' },
        ]),
        new HtmlWebpackPlugin({
            title: 'YEZI App',
            filename: './index.html',
            template: './index.ejs',
        }),
    ],
    devtool: IS_PROD ? 'source-map' : 'eval-source-map',
    devServer: {
        port: process.env.PORT || 8082,
        host: 'localhost',
        publicPath: '/',
        contentBase: SOURCE_DIR,
        historyApiFallback: true,
    },
};