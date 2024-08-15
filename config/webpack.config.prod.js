const os = require('os')
const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const {VueLoaderPlugin} = require('vue-loader'); // vue-loader新版本引入方法
const Components = require("../components.json");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// 自带的
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); //本地图片压缩

const threads = os.cpus().length
console.log('------', threads)

function getStyleLoader(pre) {
    return [
        MiniCssExtractPlugin.loader, 'css-loader', {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugin: [
                        'postcss-preset-env', // 能解决大多数样式兼容问题
                    ]
                }
            }
        },
        pre,
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: Components,
    // 输出
    output: {
        // 所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包输出文件名
        filename: 'static/js/[name].js',
        chunkFilename: '[id].js',
        libraryExport: 'default',
        // assetModuleFilename: 'images/[hash][ext][query]',
        // 自动清理上次打包内容
        // 原理：打包前。将path目录下整个目录清空，再 进行打包
        // clean:true,
        libraryTarget: 'commonjs2'
    },
    // 加载器
    module: {
        rules:[
            {
                test: /\.css$/,
                use: getStyleLoader()
            },
            { 
                test: /\.less$/,
                use: getStyleLoader(
                    'less-loader'
                )
            },
            // 后续sass-loader stule等等，也可以用函数

            // sass 需要安装 sass sass-loader两个插件

            // styl 需要安装 style-loader 插件

            // 还是没有弄清dependency的作用
            // {
            //     test: /\.(png|jpg|gif)$/i,
            //     dependency: { not: ['url'] },
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 20000,
            //             },
            //         },
            //     ],
                
            // },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 14 * 1024
                    }
                },
                generator: {
                    // [hash:10] hash值取前10位
                    filename: "static/image/[hash][ext][query]"
                }

            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    // [hash:10] hash值取前10位
                    filename: "static/media/[hash][ext][query]"
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            works: threads, // 开启进程数量
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // 开启babel缓存
                            cacheCompression: false, // 关闭缓存文件压缩
                        },
                    }
                ]
            },
        ]
    }, 
    // 插件
    plugins: [
        // new ESLintPlugin({
        //     // 检测哪个目录下的文件
        //     context: path.resolve(__dirname, '../src')
        // }),
        // new HtmlWebpackPlugin({
        //     // 模版：以public/index.html为模版创建新的html文件
        //     // 新的模版特点：1.和原模版结构一致 2.自动引入打包后所需要的资源
        //     template: path.resolve(__dirname, '../public/index.html')
        // })
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css'
        }),
        new CssMinimizerWebpackPlugin(),
        new TerserWebpackPlugin({
            parallel: threads, //开启多进程和设置进程数量
        })
    ],
    optimization: {
        // 压缩的操作
        minimizer: [
            // 压缩css
            new CssMinimizerWebpackPlugin(),
            // 压缩js
            new TerserWebpackPlugin({
                parallel: threads, //开启多进程和设置进程数量
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      [
                        "svgo",
                        {
                          plugins: [
                            "preset-default",
                            "prefixIds",
                            {
                              name: "sortAttrs",
                              params: {
                                xmlnsOrder: "alphabetical",
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              }),
        ],
    },
    // 生产模式不需要devServer
    // devServer: {
    //     host: 'localhost',
    //     port: '3000',
    //     open: true
    // },
    // 生产环境
    mode: 'production',
    devtool: 'source-map'
}