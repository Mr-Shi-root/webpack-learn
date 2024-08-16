





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

30.webpack提升打包构建速度
    HotModuleReplacement
    webpack更新是点击刷新键，对于大项目来说，改动点很小，重新刷新，浪费时间，性能

    热更新，HMR，可以指定文件进行热更新，监听文件，当发生改变时，文件进行部分更新，不会全局更新
    vue react 中有自己的loader专门解决这个问题 vue-loader react-hot-loader
    如果是一个js内嵌另一个，当另一个发生变化时，不会进行热更新

31.oneof的用法
    当匹配loader过程中，被其中一个loader运行后，不继续被下面的loader继续识别
    开发模式，生产模式都可使用
    rules: [
        {},{},{}
    ]
    变更为
    rules: [
        {
            oneOf: [
                {},{},{}
            ]
        }
    ]

32.include 和 exclude 的用法
    exclude：排除xxx下的文件，其他文件都处理
    include：只处理xxx下的文件，其他都不处理
    
33.cache缓存
    对babel解析的js文件进行缓存，同时关闭对缓存文件的压缩
    压缩需要时间成本，上线后无需上传使用，所以无需进行压缩
    {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        loader: 'babel-loader',
        options: {
            cacheDirectory: true, // 开启babel缓存
            cacheCompression: false, // 关闭缓存文件压缩
        } // cache缓存js路径，是node_modules下的.cache文件下
    }

    new ESLintPlugin({
        // 检测哪个目录下的文件
        context: path.resolve(__dirname, '../src'),
        exclude: "node_modules",
        cache: true,  // 开启缓存
        cacheLocation: path.resolve(__dirname, 
            "../node_modules/.cache/eslintcache"
        ), // 缓存路径(注：原cache缓存js文件路径，是node_modules下的.cache文件下)
    }),


34.多进程打包
    我们CPU目前都是多核，可以同时执行多个任务，所以就可以多个进程干一件事（例如babel编译js）
    **需要注意，必须是特别耗时的情况下使用，因为每个进程启动就要消耗600ms左右**
    使用方法
        1）获取CPU核数
        2）安装thread-loader
            npm i thread-loader -D
        3）使用
            1.引入os
            const os = require("os")
            2.获取cpu内核数量
            const threads = os.cpus().length
            3.注册terserPlugin
            const TerserWebpackPlugin = require('terser-webpack-plugin')
            plugin: {
                // 忽略其他
                new TerserWebpackPlugin({
                    parallel: threads, //开启多进程和设置进程数量
                })
            }
            4.由于处理js需要用到babel-loader，多个loader同时使用，需要用use数组包裹
            use: [
                {
                    loader: 'thread-loader',
                    options: {
                        works: threads, // 开启进程数量
                    }
                },
                {}, // 其他loader，例如babel-loader
            ]
    webpack5中，压缩的一系列操作，一般放在optimization.minimizer中
    （目前也可以放在plugin中，现在是w4向w5转移，二者都适用，但是未来webpack5也许会规范化，可能就只能放在minimizer中了）
    optimization: {
        // 压缩的操作
        minimizer: [
            // 压缩css
            new CssMinimizerWebpackPlugin(),
            // 压缩js
            new TerserWebpackPlugin({
                parallel: threads, //开启多进程和设置进程数量
            })
        ],
    },

35.TreeShaking减少代码体积
    webpack4,5都默认开启，当通过esmodule引入一个方法时，其余未使用的方法，不会进行打包
    例子：import { add, mul } from 'math.js'
    只会打包math.js里export的add和mul两个函数，其余export的函数，不会进行打包

    面试问到，可以通过组件库的打包方式入手，提升性能，自研的组件库，通过common和es6两种方式进行打包，引入可以供选择，建议使用es6，因为可以通过treeshaking来进行减少体积，从而提升性能


36.@babel/pluign-transform-runtime 减少代码体积
    1."useBuiltIns": "usage",
    babel 使用 polyfill 来处理 api，即一些js的内置函数，如includes，filter，map等等，但是这些函数，可能通过智能预设直接编译，编译后的结果如果在未识别的系统上出现，就会报错，所以就有一个 polyfill 去处理这个api，里面有个core-js库，这个库在使用的时候，会把所有方法都打包进去，但是可能我们只用到某个函数，这个时候就要配置babel的这个属性
    // 解决方法：把"useBuiltIns"变成"usage",babel 就可以按需加载 polyfill，并且不需要手动引入 @babel/polyfill
    {
        "presets": [
            [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "debug": true
            }
            ]
        ]
    }
    2.https://juejin.cn/post/7033383643976630302
    简单来说，是babel会为每个文件提供一些辅助代码，100个文件，就提供100分，这个插件的作用就是禁止注入，而是在这里引入，从而减少体积

    深入来说：看文档
    

37.按需引入 /* webpackChunkName： show */ 性能优化
    其中，show就是webpack中output的chunkName,参数值为[name].js，就会输出一个js文件
    当在文件中由路由，或者事件等操作，需要加载时，再去进行请求加载

38.图片压缩 img-minmizer-webpack-plugin
    有损压缩（不推荐）： 压缩后图片体积更小一点，但不完整
        npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
    无损压缩（推荐）：压缩后图片体积稍大一点，但保持了完整
        npm install --ignore-scripts imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D

    安装完会有一个报错，win下是jpegtran-bin报错，linux是optipng-bin报错
    解决方法，重新下载这两个包

------

39.CodeSplit 优化代码运行性能
    entry由字符串变成对象，里面的key是chunk的name，值是入口文件
    output中输出打包名字"[name].js"

    当 index和index1里面都 引入a.js 和 jquery.js等时，打包后每一个bundle里都会有a和juery，使得体积变大，所以需要提炼出来，分包满足以下配置，就会单独打包
    例如：引用次数超过2次，超过5万kb一定打包等等

    如果不配置 miniChunks ，会把所有的modules都打包到一个里面

    拆分第三方库和业务代码 vendors

    拆分指定文件： locallib（diy）

    分包需要配置
    module.exports = {
        //...
        optimization: {
            // 分包的默认配置
            splitChunks: {
                chunks: 'all', 
                // 以下是默认值
                minSize: 20000, // 分割代码最小的大小
                minRemainingSize: 0, // 类似于miniSize，最后确保提取的文件大小不能为0
                minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
                maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量（数量多，请求会变多）
                maxInitialRequests: 30, // 入口js文件最大并行请求数量
                enforceSizeThreshold: 50000, // 超过50000kb一定会单独打包（此时会忽略minRemainingSize，maxAsyncRequests， maxInitialRequests）也就是总数，可能超过30
                cacheGroups: { // 组 那些模块要打包到一个组
                    <!-- defaultVendors: { // 组名
                        test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
                        priority: -10, // 权重（越大越高）
                        reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
                    }, -->
                    default: { // 其他没有写的配置会使用上面的默认值
                        minChunks: 2, // 这里的minChunks圈中更大
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: { //拆分第三方库（通过npm|yarn安装的库）
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'initial',
                        priority: -10
                    },
                    locallib: { //拆分指定文件
                        test: /(src\/locallib\.js)$/,
                        name: 'locallib',
                        chunks: 'initial',
                        priority: -9
                    }
                },
            },
        },
    };






