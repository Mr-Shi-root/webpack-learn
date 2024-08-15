





26.提取css成单独文件
    css文件目前被打包到js文件中，当js文件加载时，会创建一个style标签来生成样式
    这样对于网站来说，会出现闪屏现象，用户体验不好
    我们应该是单独的css文件，通过link标签加载性能才好
    （仅在prod下进行即可）
    解决：mini-css-extract-plugin
    使用方法：
        1）安装
        2）引入 import MiniCSSxxx from 'mini-xxx'
        3）**替换style-loader**
        4）注册 new MiniCSSxxx({
            fileName: 'css文件目录文件夹路径'
        })
    
27.css兼容性处理
    下载postcss 因为要做智能预设，所以下载 npm i postcss-loader postcss postcss-preset-env -D
    写在css-loader处理器的最后（webpack执行顺序是有下到上，由右到左执行，所以先处理postcss，解决兼容性问题）
    配置：webpack->css
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugin: [
                    'postcss-preset-env', // 能解决大多数样式兼容问题
                ]
            }
        }
    }
    配置：package.json
    "browserslist": [
        "Android >= 4",
        "iOS >= 5",
        "ie > 8"
    ]
    或
    新建postcss.config.js
    module.exports = {
        plugins: [
            require('autoprefixer")({
                overrideBrowserslist: [
                    "Android >= 4",
                    "iOS >= 5",
                    "ie > 8"
                ]
            })
            // postcss-import 需配登在该插件前
        ]
    }

    // 通常兼容性配置 做交集
    [
        'last 2 version', // 最近的两个版本
        '> 1%', // 覆盖市面99%的浏览器
        'not dead' // 不要已经死了的浏览器
    ]

28.css压缩-变成一行
    使用插件 CssMinimizerWebpackPlugin
    npm install css-minimizer-webpack-plugin --save-dev
    require引入
    new CssMinixxx（）

29.sourcemap
    定义：编译后的代码与源代码进行映射
    开发模式：cheap-module-source-map
        优点：打包编译速度快，只包含行映射
        缺点：没有列映射
        webpack.config.js：{
            mode: 'develepment',
            devtool: 'cheap-module-source-map'
        }
    
    生产模式：source-map
        优点：包含行/列映射
        缺点：打包编译速度更慢
         webpack.config.js：{
            mode: 'production',
            devtool: 'source-map'
        }