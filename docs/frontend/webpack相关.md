---
title: webpack相关
date: 2020-09-30
tags:
 - webpack
categories:
 - 前端
---

## 常用loader

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader:   file-loader的进阶,可以根据需要压缩文件
- html-loader:  将html中的img的路径正确打包,但如果同时使用htmlWebpackPlugin的话,由于html-loader将html解析成字符串，进而无法解析jsp模板语法

- source-map-loader：加载额外的 Source Map 文件，以方便断点调试

- image-loader：加载并且压缩图片文件

- babel-loader：把 ES6 转换成 ES5

- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

- eslint-loader：通过 ESLint 检查 JavaScript 代码

- define-plugin：定义环境变量

- commons-chunk-plugin：提取公共代码

- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码


