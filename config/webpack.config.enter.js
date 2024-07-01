const path = require('path');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const Components = require("../components.json")
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 所有文件的输出路径
        path: path.resolve(__dirname, '../dist'),
        // 入口文件打包输出文件名
        filename: 'static/js/main.js',
        chunkFilename: '[id].js',
        libraryExport: 'default',
        // assetModuleFilename: 'images/[hash][ext][query]',
        // 自动清理上次打包内容
        // 原理：打包前。将path目录下整个目录清空，再 进行打包
        // clean:true,
        libraryTarget: 'umd'
    },
    // 加载器
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { 
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
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
                loader: 'babel-loader'
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
        new VueLoaderPlugin()
    ],
    // 生产模式不需要devServer
    // devServer: {
    //     host: 'localhost',
    //     port: '3000',
    //     open: true
    // },
    // 生产环境
    mode: 'production'
}