---
title: webpack相关
date: 2020-09-30
tags:
 - webpack
categories:
 - 前端
---



## Webpack 易混淆的概念

https://juejin.cn/post/6844904007362674701#heading-21



## 常用loader

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader:   file-loader的进阶,可以根据需要压缩文件
- html-loader:  将html中的img的路径正确打包,但如果同时使用htmlWebpackPlugin的话,由于html-loader将html解析成字符串，进而无法解析jsp模板语法

- source-map-loader：加载额外的 Source Map 文件，以方便断点调试

- image-loader：加载并且压缩图片文件

- babel-loader：把 ES6 转换成 ES5

- css-loader：解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回

- style-loader: 以style标签的方式将css插入DOM树中。

- eslint-loader：通过 ESLint 检查 JavaScript 代码

- define-plugin：定义环境变量

- commons-chunk-plugin：提取公共代码

- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码



## webpack配置

```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
const OptimiziCssAssetsWebpackPlugin = require('optimizi-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引用plugin

// 定义node.js的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader的写法
const commonCssLoader = [
  // 这个loader取代style-loader。作用：提取js中的css成单独文件然后通过link加载
  MiniCssExtractPlugin.loader,
  // css-loader：将css文件整合到js文件中
  // 经过css-loader处理后，样式文件是在js文件中的
  // 问题：1.js文件体积会很大2.需要先加载js再动态创建style标签，样式渲染速度就慢，会出现闪屏现象
  // 解决：用MiniCssExtractPlugin.loader替代style-loader
  'css-loader',
  /*
    postcss-loader：css兼容性处理：postcss --> 需要安装：postcss-loader postcss-preset-env
    postcss需要通过package.json中browserslist里面的配置加载指定的css兼容性样式
    在package.json中定义browserslist：
    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [ // 只需要可以运行即可
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境。默认是生产环境
      "production": [ // 需要满足绝大多数浏览器的兼容
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    },
  */
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // 基本写法
      plugins: () => [
        // postcss的插件
        require('postcss-preset-env')(),
      ],
    },
  },
]

module.exports = {
  // webpack配置
  entry: './src/js/index.js', // 入口起点
  output: {
    // 输出
    // 输出文件名
    // 加上hash，避免浏览器强缓存，不推荐使用hash和chunkhash
    filename: 'js/build.[contenthash:10].js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'), // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同loader处理
      /*
          正常来讲，一个文件只能被一个loader处理
          loader的执行顺序：
          一般情况下，loader的执行顺序为从右往左，从下往上。
          可以通过enforce属性去改变执行顺序。
          enforce:‘pre’ 前置 权重最高
          enforce:‘normal’ 不变 权重第二
          enforce:‘inline’ 行内 权重第三
          enforce:‘post’ 后置 权重第四
          如这里，不做处理的话会从下往上先执行babel再执行eslint，
          如果在eslint用enforce指定pre可以先执行eslint再执行babel
        */
      {
        /*
            js的语法检查： 需要下载 eslint-loader eslint
            注意：只检查自己写的源代码，第三方的库是不用检查的
            airbnb(一个流行的js风格) --> 需要下载 eslint-config-airbnb-base eslint-plugin-import
            设置检查规则：
              package.json中eslintConfig中设置
                "eslintConfig": {
                  "extends": "airbnb-base"， // 继承airbnb的风格规范
                  "env": {
                    "browser": true // 可以使用浏览器中的全局变量(使用window不会报错)
                  }
                }
          */
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },

      // 使用oneOf优化匹配效率，在oneOf里面的规则只会命中一次，不用oneOf的话，每个文件都要检查一下，
      // 但要注意，在oneOf里面的loader不能处理同一类型的文件，如对js处理的两个loader就不能一起放在oneOf里面
      oneOf:[
      	{
          // 匹配哪些文件
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader'],
        },
        {
          test: /\.css$/,
          use: [...commonCssLoader],
        },
        {
          // url-loader：处理图片资源，问题：默认处理不了html中的img图片
          test: /\.(jpg|png|gif)$/,
          // 需要下载 url-loader file-loader
          loader: 'url-loader',
          options: {
            // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
            // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
            limit: 8 * 1024,
            // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
            name: '[hash:10].[ext]',
            // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
            // 解决：关闭url-loader的es6模块化，使用commonjs解析
            esModule: false,
            outputPath: 'imgs',
          },
        },
        {
          test: /\.html$/,
          // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
          loader: 'html-loader',
        },
        // 打包其他资源(除了html/js/css资源以外的资源)
        {
          // 排除html|js|css|less|jpg|png|gif文件
          exclude: /\.(html|js|css|less|jpg|png|gif)/,
          // file-loader：处理其他文件
          loader: 'file-loader',
          options: {
            name: '[contenthash:10].[ext]',
            outputPath: 'media',
          },
        },
        /*
          js兼容性处理：需要下载 babel-loader @babel/core
            1. 基本js兼容性处理 --> @babel/preset-env
              问题：只能转换基本语法，如promise高级语法不能转换
            2. 全部js兼容性处理 --> @babel/polyfill
              问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
            3. 需要做兼容性处理的就做：按需加载  --> core-js
        */
        {
          // 第三种方式：按需加载
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            // 预设：指示babel做怎样的兼容性处理
            presets: [
              '@babel/preset-env', // 基本预设
              {
                useBuiltIns: 'usage', //按需加载
                corejs: { version: 3 }, // 指定core-js版本
                targets: { // 指定兼容到什么版本的浏览器
                  chrome: '60',
                  firefox: '50',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                },
              },
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            ],
          },
        },
    	]

    ],
  },
  // plugin的配置
  plugins: [
    // 生产环境使用，将css文件抽离
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.[contenthash:10].css',
    }),
    // 压缩css
    new OptimiziCssAssetsWebpackPlugin(),
    // HtmlWebpackPlugin：html文件的打包和压缩处理
    // 通过这个插件会自动将单独打包的样式文件通过link标签引入
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 模式
  mode: 'development', // 开发模式
  // 开发服务器 devServer：用来自动化，不用每次修改后都重新输入webpack打包一遍（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样在外面看到打包输出的build包，而是在内存中，关闭后会自动删除）
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 开启热更,可能还需要对入口js文件做一些修改，加上module.hot.accept...,参考下面的react配置热更
    hot: true,
  },
  devtool: 'eval-source-map',
}
```



## source-map

source-map：一种提供**源代码到构建后代码的映射**的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

参数：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

代码：

```
devtool: 'eval-source-map'
```

可选方案：[生成source-map的位置|给出的错误代码信息]

- source-map：外部，错误代码准确信息 和 源代码的错误位置
- inline-source-map：内联，只生成一个内联 source-map，错误代码准确信息 和 源代码的错误位置
- hidden-source-map：外部，错误代码错误原因，但是没有错误位置（为了隐藏源代码），不能追踪源代码错误，只能提示到构建后代码的错误位置
- eval-source-map：内联，每一个文件都生成对应的 source-map，都在 eval 中，错误代码准确信息 和 源代码的错误位
- nosources-source-map：外部，错误代码准确信息，但是没有任何源代码信息（为了隐藏源代码）
- cheap-source-map：外部，错误代码准确信息 和 源代码的错误位置，只能把错误精确到整行，忽略列
- cheap-module-source-map：外部，错误代码准确信息 和 源代码的错误位置，module 会加入 loader 的 source-map

内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

开发/生产环境可做的选择：

**开发环境**：需要考虑速度快，调试更友好

- 速度快( eval > inline > cheap >... )
  1. eval-cheap-souce-map
  2. eval-source-map
- 调试更友好
  1. souce-map
  2. cheap-module-souce-map
  3. cheap-souce-map

**最终得出最好的两种方案 --> eval-source-map（完整度高，内联速度快） / eval-cheap-module-souce-map（错误提示忽略列但是包含其他信息，内联速度快）**

**生产环境**：需要考虑源代码要不要隐藏，调试要不要更友好

- 内联会让代码体积变大，所以在生产环境不用内联
- 隐藏源代码
  1. nosources-source-map 全部隐藏
  2. hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

**最终得出最好的两种方案 --> source-map（最完整） / cheap-module-souce-map（错误提示一整行忽略列）**



## webpack缓存优化

1. 配饰babel缓存

   ```js
   {
     test: /\.js$/,
     exclude: /node_modules/,
     loader: 'babel-loader',
     options: {
       presets: [
         [
           '@babel/preset-env',
           {
             useBuiltIns: 'usage',
             corejs: { version: 3 },
             targets: {
               chrome: '60',
               firefox: '50'
             }
           }
         ]
       ],
       // 开启babel缓存
       // 第二次构建时，会读取之前的缓存
       cacheDirectory: true
     }
   },
   ```

2. 优化静态资源缓存

文件名不变，就不会重新请求，而是再次用之前缓存的资源

- hash: 每次 wepack 打包时会生成一个唯一的 hash 值。

 问题：重新打包，所有文件的 hsah 值都改变，会导致所有缓存失效。（可能只改动了一个文件）

- chunkhash：根据 chunk 生成的 hash 值。来源于同一个 chunk的 hash 值一样

 问题：js 和 css 来自同一个chunk，hash 值是一样的（因为 css-loader 会将 css 文件加载到 js 中，所以同属于一个chunk）

- contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样(文件内容修改，文件名里的 hash 才会改变)

修改 css 文件内容，打包后的 css 文件名 hash 值就改变，而 js 文件没有改变 hash 值就不变，这样 css 和 js 缓存就会分开判断要不要重新请求资源 --> 让代码上线运行缓存更好使用



## tree shaking（树摇）

tree shaking：去除无用代码

前提：1. **必须使用 ES6 模块化** (开启ssr后tree shaking是失效的)2. 开启 production 环境 （这样就自动会把无用代码去掉）

作用：减少代码体积

在 package.json 中配置：

`"sideEffects": false` 表示所有代码都没有副作用（都可以进行 tree shaking）

这样会导致的问题：可能会把 css 或 @babel/polyfill 文件干掉（副作用）

不同webpack版本的默认配置可能不同，所以最好配置：`"sideEffects": ["*.css", "*.less"]` 不会对css/less文件tree shaking处理



## code split（代码分割）

代码分割。将打包输出的一个大的 bundle.js 文件拆分成多个小文件，这样可以并行加载多个文件，比加载一个文件更快。

1.多入口拆分

```js
entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
```

2.optimization：

```js
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

- 将 node_modules 中的代码单独打包（大小超过30kb）
- 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk(比如两个模块中都引入了jquery会被打包成单独的文件)（大小超过30kb）

3.import 动态导入语法：

```js
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包(test文件不会和index打包在同一个文件而是单独打包)
  webpackChunkName:指定test单独打包后文件的名字
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```





## lazy loading（懒加载/预加载）

1.懒加载：当文件需要使用时才加载（需要代码分割）。但是如果资源较大，加载时间就会较长，有延迟。

2.正常加载：可以认为是并行加载（同一时间加载多个文件）没有先后顺序，先加载了不需要的资源就会浪费时间。

3.预加载 prefetch（兼容性很差）：会在使用之前，提前加载。等其他资源加载完毕，浏览器空闲了，再偷偷加载这个资源。这样在使用时已经加载好了，速度很快。所以在懒加载的基础上加上预加载会更好。

代码：

```js
document.getElementById('btn').onclick = function() {
  // 将import的内容放在异步回调函数中使用，点击按钮，test.js才会被加载(不会重复加载)
  // webpackPrefetch: true表示开启预加载
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
  import('./test').then(({ mul }) => {
    console.log(mul(2, 5))
  })
};
```

### 补充: `Prefetch` 和 `Preload` 有什么区别呢？

具体来讲，`Preload` 来告诉浏览器预先请求当前页需要的资源，从而提高这些资源的请求优先级。

比如，对于那些本来请求优先级较低的关键请求，我们可以通过设置 `Preload` 来提升这些请求的优先级。
 `Prefetch` 来告诉浏览器用户将来可能在其他页面（非本页面）可能使用到的资源，那么浏览器会在空闲时，就去预先加载这些资源放在 `http` 缓存内，最常见的 `dns-prefetch`。

比如，当我们在浏览A页面，如果会通过A页面中的链接跳转到B页面，而B页面中我们有些资源希望尽早提前加载，那么我们就可以在A页面里添加这些资源 `Prefetch` ，那么当浏览器空闲时，就会去加载这些资源。

 所以，对于那些可能在当前页面使用到的资源可以利用 `Preload`，而对一些可能在将来的某些页面中被使用的资源可以利用 `Prefetch`。如果从加载优先级上看，`Preload` 会提升请求优先级；而Prefetch会把资源的优先级放在最低，当浏览器空闲时才去预加载。



## 多进程打包

多进程打包：某个任务消耗时间较长会卡顿，多进程可以同一时间干多件事，效率更高。

优点是提升打包速度，缺点是每个进程的开启和交流都会有开销（babel-loader消耗时间最久，所以使用thread-loader针对其进行优化）

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /*
      thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。
      进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
      只有工作消耗时间比较长，才需要多进程打包
      注意顺序,thread-loader一定是放前面,进而在babel-loader之后执行
    */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程2个
      }
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              targets: {
                chrome: '60',
                firefox: '50'
              }
            }
          ]
        ],
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true
      }
    }
  ]
},
```





## react配置热更

下面两种方案二选一,推荐用第二个

1. [react-hot-loader](https://medium.com/itsoktomakemistakes/%E4%BD%BF%E7%94%A8-react-hot-loader-%E5%8A%A0%E9%80%9F%E9%96%8B%E7%99%BC-a51ffe0b5685)
2. [React Fast Refresh](https://medium.com/itsoktomakemistakes/react-hot-loader-%E4%B8%8B%E4%B8%80%E4%BB%A3%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%A1%88-react-fast-refresh-%E4%BE%86%E4%BA%86-fd5087889e16)

