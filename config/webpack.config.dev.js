const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // 入口
    entry: './src/pages/index/index.js',
    // 输出
    output: {
        // 所有文件的输出路径
        // path: path.resolve(__dirname, 'dist'),
        path: undefined, // 开发模式下不需要输出
        // 入口文件打包输出文件名
        filename: 'static/js/[hash].js',
        // assetModuleFilename: 'images/[hash][ext][query]',
        // 自动清理上次打包内容
        // 原理：打包前。将path目录下整个目录清空，再 进行打包
        // clean:true // 开发模式下没输出，就不需要clean
    },
    // 加载器
    module: {
        rules:[
            {
                test: /\.css$/,
                // use数组中loader执行顺序，从右到左，从下到上
                // 创建style标签，将js的样式资源插入进行，添加到head中生效
                // 将css资源编译成commonjs模块加载到js中，
                use: ['style-loader', 'css-loader']
            },
            { 
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // sass 需要安装 sass sass-loader两个插件

            // style 需要安装 style-loader 插件

            // 还是没有弄清dependency的作用， webpack5里自带url-loader
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

            // https://blog.csdn.net/MRlaochen/article/details/122158255
            // asset，asset/resource
            // asset/resource：发送一个单独的文件并导出URL，替代file-loader
            // asset/inline：导出一个资源的data URI，替代url-loader
            // asset/source：导出资源的源代码，之前通过使用raw-loader实现
            // asset：介于asset/resource和asset/inline之间，在导出一个资源data URI和发送一个单独的文件并导出URL之间做选择，之前通过url-loader+limit属性实现
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
                use: [
                    'vue-loader'
                ]
            },
            // 专门处理html文件的img图片，（负责引入img，从而能被url-loader处理）
            // 问题：为啥非要在vue-loader下面，。先执行html-loader
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除
                loader: 'babel-loader'
            }
        ]
    }, 
    // 插件
    plugins: [
        new ESLintPlugin({
            // 检测哪个目录下的文件
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            // 模版：以public/index.html为模版创建新的html文件
            // 新的模版特点：1.和原模版结构一致 2.自动引入打包后所需要的资源
            template: path.resolve(__dirname, '../src/pages/index/index.html')
        }),
        new VueLoaderPlugin(),
    ],
    // 开发服务器是不会 输出打包资源，是在内存中编译打包的
    // 问题待解决：webpack-dev-server跑起来开发项目时，硬盘体积越来越小，是为神马
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true,
    },
    // 开发环境
    mode: 'development',
    devtool: 'cheap-module-source-map'
}