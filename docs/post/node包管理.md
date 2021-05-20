---
title: node包管理
date: 2021-03-10
tags:
 - yarn 
 - npm
categories:
 - 前端

---



## 不同的依赖包

### dependencies

生产环境的包

### devDependencies

  开发环境的包

### peerDependencies

同等依赖，或者叫同伴依赖，用于指定当前包兼容的宿主版本， peerDependencies 在npm v3发布后废弃了，npm v3后对包依赖的树形结构做了扁平优化，包含了peerDependencies 的功能，所以被取消掉了

### optionalDependencies

  可选依赖，如果有一些依赖包即使安装失败，项目仍然能够运行或者希望`npm`继续运行，就可以使用`optionalDependencies`。另外`optionalDependencies`会覆盖`dependencies`中的同名依赖包，所以不要在两个地方都写。

### bundledDependencies/ bundleDependencies

打包依赖，`bundledDependencies`是一个包含依赖包名的数组对象，在发布时会将这个对象中的包打包到最终的发布包里。如：

```
{
  "name": "fe-weekly",
  "description": "ELSE 周刊",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {
    "fw2": "^0.3.2",
    "grunt": "^1.0.1",
    "webpack": "^3.6.0"
  },
  "dependencies": {
    "gulp": "^3.9.1",
    "hello-else": "^1.0.0"
  },
  "bundledDependencies": [
    "fw2",
    "hello-else"
  ]
}
复制代码
```

执行打包命令`npm pack`, 在生成的`fe-weekly-1.0.0.tgz`包中，将包含`fw2`和`hello-else`。 但是值得注意的是，这两个包必须先在`devDependencies`或`dependencies`声明过，否则打包会报错。



## yarn常见命令

### 添加依赖包

yarn add xx 生产环境依赖

yarn add xx -D 开发依赖

yarn global add xx 全局安装

### 移除

yarn remove xx

### 升级

yarn upgrade xx

### 其他命令

#### Create

yarn create react-app my-app 等价于 yarn global add create-react-app && create-react-app my-app

#### link

可用于连接其他版本的包

```bash
# 生成需要连接的包
$ cd react
$ yarn link
yarn link vx.x.x
success Registered "react".
info You can now run `yarn link "react"` in the projects where you want to use this module and it will be used instead.

# 连接对应的包
$ cd ../react-relay
$ yarn link react
yarn link vx.x.x
success Registered "react".
```

可用unlink 执行类似的命令解除

#### why

查看某个包存在哪些版本

```bash
$ yarn why jest
```

