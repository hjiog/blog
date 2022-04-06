---
title: zustand源码解读
date: 2022-02-24
tags:
 - 源码解读
categories:
 - 前端
---

## 主流程

 create ==> useStore

 何时订阅？
 调用 useStore 时内部执行 useEffect 订阅
 若使用 useStore.getState().xx 则不会发生订阅

 如何自定义订阅？
 调用 useStore.subscribe()。届时所有 setState 行为都会触发回调

 如何基于state自定义订阅？
 调用 useStore.subscribe()，第二个参数传入 selector，若其他组件调用了 setState ，则会调用 selector 判断一下，若发生变化才会执行回调

 为啥需要 subscribeWithSelector 中间件？
 原理是重写 subscribe 方法，使其支持传入 selector ，但是为何不内置？

 why we should memoizing selectors ?
 
 
 setState ==> dispatch

 selector 作用？
 setState 会调用所有listener, listen 函数中再执行 selector，有变化就会触发刷新

能否不传 selector ，自动按需更新？

为啥 ssr 需要 `Provider`