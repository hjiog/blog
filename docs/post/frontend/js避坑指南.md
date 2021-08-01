---
title: js避坑指南
date: 2021-06-03
tags:
 - js
categories:
 - 前端
---

## 尽量不用连等操作

连等操作赋值顺序是从右至左,看个例子

```js
let a = b = 1
// 等价于
b = 1
let a = 1
// 这会造成b是个全局变量
```



## 巨坑警告！！！！ vite使用webwork 导入文件时报错

### 场景还原

`common/index.ts`

```js
export xxx
...
// test.ts中含有dom操作
export * from './test.ts'
```

`webworker/index.ts`

```js
// 看似并未引入test.ts
import { Store, MoveType } from '~/common'
const ctx: Worker = self as any
ctx.addEventListener('message', (e) => {
	...
})

```

`webworker/useWebworker.ts`

```js
import Worker from './index?worker'
import { MoveType, chessMove } from '~/common'

const worker = new Worker()
...
```

报错如下

```
Uncaught ReferenceError: HTMLElement is not defined的错误，当时怀疑是vite的bug
```

### 排错过程

1. 在开发者工具查看network时发现webworker/index.ts还额外引入了含有dom操作的test.ts
2. 原因是vite在开发时没有做到treeshaking,import xxx from '/common'会将common的暴露的所有变量给导入进来，自然也将test.ts导入了
3. 正确做法是将test.ts从common/index.ts移除即可

