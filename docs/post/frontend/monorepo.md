---
title: angular 学习笔记
date: 2020-03-19
tags:
 - monorepo
categories:
 - 前端

---



## 项目中使用monorepo方式管理

### 简介

利用yarn的workspaces概念和learna可以实现monorepo，使得多个项目集成在一个项目中管理。

优点：

可以用于多页应用的开发，一些公用的包可以不用发布即可当成node_module中的包来使用



### 如何配置

#### Yarn workspace

假如根目录下含有apps和packages目录，那么可将这两个目录当成子项目

根目录package.json添加

```json
 {
   "private": true,
   "workspaces": [
    "apps/*",
    "packages/*"
  ],
 } 
```

注意，添加 `private: true` 是防止工作区根目录被发布到 npm。

然后apps里面可以放置需要写入的页面如page1,page2,而packages目录可以存放项目中公用的一些包。

运行`lerna boostrap`即可在page1中可以直接import packages中的某些包。这些包会作为一个软连接存放在node_modules中。



#### lerna

lerna 用来管理多个包，优化维护多包的工作流，解决多个包互相依赖及发布的问题.

##### lerna.json

`lerna.json` 内容大致如下

```json
{
  "version": "independent",  //   "version": "fixed",
  "npmClient": "yarn",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
复制代码
```

- `version`: 当前仓库的版本。

  - Fixed/Locked mode 这是默认的模式，Fixed 模式下所有的包共用一个版本号，这个版本号保存在 `lerna.json` 的 `version` 字段里面。所以当你运行 `lerna publish`，修改过的包会自动更新 `package.json` 里的 `version` 并发布到 npm，未修改的包则不会更新。还有一个问题值得注意，当 `lerna.json` 的 `version` 做了主版本号的改动时，所有的包都会更新版本并发布。

  - independent 模式允许每个包自行更新版本号，当你运行 `lerna publish` 时，需要逐个选择修改过的包的版本。

- `npmClient`: 使用的客户端，默认是 "npm",可选值还有 "yarn"。

- `command.publish.ignoreChanges`: 是个数组，在这个数组里面的文件变动，不会触发版本更新。

- `command.publish.message`: 自定义发布新版本时的 git commit 信息。

- `command.publish.registry`: 设置私有仓库，默认是发布到 `npmjs.org`。

- `command.bootstrap.ignore`: 设置在这里的目录将不会参与 `lerna bootstrap`。

- `command.bootstrap.npmClientArgs`: 执行 `lerna bootstrap` 时会将此数组的所有值当作参数传给 `npm install`。

- `command.bootstrap.scope`: 限制 `lerna bootstrap` 在哪些包起作用。

- `packages`: 用以指明所有包的路径。

##### 常用命令

- `lerna init`

创建一个新的 lerna 仓库或更新已有仓库为新版本的 lerna，其中的选项 `--independent/-i` 用来生成 `independent` 模式的项目。

- `lerna bootstrap`

此命令会做以下几个事情：

1. npm install 为所有的包安装依赖。
2. 为互相依赖的包创建软链接。
3. 在所有 bootstrap 包（不包括 `command.bootstrap.ignore` 中忽略的包）中执行 `npm run prepublish`（如果传了参数 `--ignore-prepublish` 将跳过此步骤）。
4. 在所有 bootstrap 包（不包括 `command.bootstrap.ignore` 中忽略的包）中执行 `npm run prepare`。

- `lerna publish`

发布所有修改过的包，会在终端提示(prompt)选择一个新版本，并会更新所有改动到 Git 和 npm.

- `lerna run [script]`

在所有包中执行特定的 [npm script](https://docs.npmjs.com/misc/scripts)。

- `lerna ls`

列出当前仓库中的所有公共包（public packages），`private: true` 的包不会列出。

