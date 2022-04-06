---
title: micro-app 原理解析
date: 2022-02-13
tags:
 - micro-app
categories:
 - 前端
---

## 前言

回顾微前端的历史，最早的时候我们是利用 iframe 嵌入一个网页，这就是微前端的雏形。虽然接入时方便快捷，但它也存在一系列缺点，如
-   **路由状态丢失**，刷新一下，iframe 的 url 状态就丢失了
-   **dom 割裂严重**，弹窗只能在 iframe 内部展示，无法覆盖全局
-   **通信非常困难**，只能通过 postmessage 传递序列化的消息
-   **白屏时间太长**，对于有性能要求的应用来说无法接受    


后来出现了 `single-spa` ，这是最早期的一套微前端解决方案。它规定子应用必须暴露三个方法：`bootstrap`、`mount`、`unmount`，分别对应初始化、渲染和卸载。然后监听 url change 事件，在 url 改变时执行所匹配到的子应用对应的生命周期函数。但是 `single-spa` 的缺点也很明显：
- 接入子应用的入口是一个 js 而不是 html 文件，然而每次子应用打包后 js 入口文件的 hash 值是会变的，这就意味着每次子应用部署后都要去手动修改主应用设置的入口 js 地址。
- `single-spa` 并没有对子应用做 js 和 css 隔离，而是留给用户自行处理。


再后来，`qiankun` 横空出世。它基于 `single-spa` 做了一层封装，并提供了 html 入口和 js、css的隔离。目前 `qiankun` 已在蚂蚁内部服务了超过 200+ 线上应用，生态较为完善。但 `qiankun` 继承了 `single-spa` 的思想，子应用仍然必须提供对应的生命周期函数，并且需要修改子应用的 webpack 配置配合使用，因此使用 `qingkun` 对子应用来说还是有一定的代码入侵性。


`mirco-app` 是京东21年开源的一款微前端框架。它借助了浏览器对 [webComponent](https://www.ruanyifeng.com/blog/2019/08/web_components.html) 的支持，实现了一套微前端方案体系。并且由于 Shadow Dom 对 react 这类库的兼容性较差，便自己实现了类 Shadow Dom 的效果。与 `qiankun` 相比，接入更加简单，但生态就没那么完善。这篇文章从源码上对 micro-app 的主流程做了以下梳理，希望对大家有所帮助。

官网地址在此 [micro-app](https://micro-zoe.github.io/micro-app/docs.html#/)


### 示例

先从官网中的小例子看下 micro-app 是如何启动的：

[https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/framework/react](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/framework/react)

```js
import microApp from '@micro-zoe/micro-app';
microApp.start();

export function MyPage () {
  return (
    <div>
      <h1>子应用</h1>
      <micro-app
        name='app1' // name(必传)：应用名称
        url='http://localhost:3000/' // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
        baseroute='/my-page' // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
      ></micro-app>
    </div>
  )
}
```

## 原理解析
`micro-app` 标签是该库自定义的一个 webComponent 标签，我们可以从 `<micro-app name='app1' url='xx' baseroute='/my-page'></micro-app>` 中拿到子应用的线上入口地址。有了这个地址后，`micro-app` 就可以做很多事情。

### 获取/处理子应用内容
#### body 和 header 的处理
首先，`micro-app` 可以通过 fetch 拿到 url 对应的 html 字符串，然后替换 head 和 body 标签，避免污染主应用。
```js
export default function extractHtml (app: AppInterface): void {
  
fetchSource(app.ssrUrl || app.url, app.name, { cache: 'no-cache' }).then((htmlStr: string) => {
    if (!htmlStr) {
      const msg = 'html is empty, please check in detail'
      app.onerror(new Error(msg))
      return logError(msg, app.name)
    }
    htmlStr = htmlStr
      .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
        return match
          .replace(/<head/i, '<micro-app-head')
          .replace(/<\/head>/i, '</micro-app-head>')
      })
      .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
        return match
          .replace(/<body/i, '<micro-app-body')
          .replace(/<\/body>/i, '</micro-app-body>')
      })

    extractSourceDom(htmlStr, app)
  }).catch((e) => {
    logError(`Failed to fetch data from ${app.url}, micro-app stop rendering`, app.name, e)
    app.onLoadError(e)
  })
}

```
>看到这里你可能会问：micro-app-head 和 micro-app-body 都是自定义标签，可以直接使用吗？
>答案是可以的，自定义标签和已有的标签相比，只是缺少了默认的样式及行为，具体可以参考下面的文章。
   [http://www.ruanyifeng.com/blog/2017/06/custom-elements.html](http://www.ruanyifeng.com/blog/2017/06/custom-elements.html)

上面处理了 head 和 body 标签，extractSourceDom 就是负责处理 header 里头的其他标签，以及加载 link 及 script 标签的内容。
```js
function extractSourceDom (htmlStr: string, app: AppInterface) {
  const wrapElement = getWrapElement(htmlStr)
  const microAppHead = wrapElement.querySelector('micro-app-head')
  const microAppBody = wrapElement.querySelector('micro-app-body')

  if (!microAppHead || !microAppBody) {
    const msg = `element ${microAppHead ? 'body' : 'head'} is missing`
    app.onerror(new Error(msg))
    return logError(msg, app.name)
  }

  flatChildren(wrapElement, app, microAppHead)

  if (app.source.links.size) {
    fetchLinksFromHtml(wrapElement, app, microAppHead)
  } else {
    app.onLoad(wrapElement)
  }

  if (app.source.scripts.size) {
    fetchScriptsFromHtml(wrapElement, app)
  } else {
    app.onLoad(wrapElement)
  }
}
```


处理其他的标签前，这里创建了一个新的 div 标签，将 html 字符串的内容赋值给该 div 的 innerHTML 属性。
```js
function getWrapElement (str: string): HTMLElement {
  const wrapDiv = pureCreateElement('div')

  wrapDiv.innerHTML = str

  return wrapDiv
}
```


#### 其他标签处理
`flatChildren` 函数是处理 header 里的其他标签的具体操作。注意这里用了递归，以确保每个标签都能处理到。
```js
function flatChildren (
  parent: HTMLElement,
  app: AppInterface,
  microAppHead: Element,
): void {
  const children = Array.from(parent.children)

  children.length && children.forEach((child) => {
    flatChildren(child as HTMLElement, app, microAppHead)
  })

  for (const dom of children) {
	// 处理 link 标签
    if (dom instanceof HTMLLinkElement) {
      if (dom.hasAttribute('exclude')) {
        parent.replaceChild(document.createComment('link element with exclude attribute ignored by micro-app'), dom)
      } else if (!dom.hasAttribute('ignore')) {
        extractLinkFromHtml(dom, parent, app)
      } else if (dom.hasAttribute('href')) {
        dom.setAttribute('href', CompletionPath(dom.getAttribute('href')!, app.url))
      }
	// 处理 style 标签
    } else if (dom instanceof HTMLStyleElement) {
      if (dom.hasAttribute('exclude')) {
        parent.replaceChild(document.createComment('style element with exclude attribute ignored by micro-app'), dom)
      } else if (app.scopecss && !dom.hasAttribute('ignore')) {
        scopedCSS(dom, app)
      }
	// 处理 script 标签
    } else if (dom instanceof HTMLScriptElement) {
      extractScriptElement(dom, parent, app)
	// 移除 meta 和 title 标签
    } else if (dom instanceof HTMLMetaElement || dom instanceof HTMLTitleElement) {
      parent.removeChild(dom)
	// 处理 img 标签
    } else if (dom instanceof HTMLImageElement && dom.hasAttribute('src')) {
      dom.setAttribute('src', CompletionPath(dom.getAttribute('src')!, app.url))
    }
  }
}
```

下面是对具体各标签处理流程的总结，源码过多，就不一一列举了。

link 标签处理流程：
- 若包含 `exclude`/`ignore` 属性，主应用会删除/跳过该标签
- 处理 `href` 属性，在原本的 `href` 的前面拼接上 `app.url`，使得主应用能正确访问子应用的资源。
- 若 `ref` 的属性是 `stylesheet`，则会删除该 link 标签，将处理后的 `href` 记录在一个 `map`中，后面再调用`fetchLinksFromHtml` 方法，加载资源内容并将创建 `style` 标签插入之前定义的 div 下的 `<micro-app-head>` 中。最后的 html 内容大概如下：

```html
<micro-app name="appname-sidebar" url="http://www.micro-zoe.com/child/sidebar/">
	<micro-app-head>
		<style data-origin-href="http://www.micro-zoe.com/child/sidebar/css/chunk-vendors.d2ab7433.css">...</style>
		<style data-origin-href="http://www.micro-zoe.com/child/sidebar/css/app.708cd7c5.css">...</style>
	</micro-app-head>
	<micro-app-body>...</micro-app-body>
</micro-app>
```

> Q: 为什么需要删除 link 标签，自己去请求内容并创建 style 标签呢？如果保留 link 标签会有什么问题？
> 
> A: 在创建 style 标签时会调用 `scopedCSS` 方法，给子应用的 style 标签加上作用域，实现父子应用样式的隔离。
- 若 `ref` 的属性包含 `['prefetch', 'preload', 'prerender', 'icon', 'apple-touch-icon']` 中的任意一项，则会移除 link 标签。


style 标签处理流程：
- 若包含 `exclude`/`ignore` 属性，主应用会删除/跳过该标签
- 调用 `scopedCSS` 方法， 给子应用的 style 标签加上作用域，前缀是 `${microApp.tagName}[name=${app.name}]`


srcipt 标签处理流程：
- 若包含 `exclude`/`ignore` 属性，主应用会删除/跳过该标签
- 若包含 `src` 属性，在原本的 `src` 的前面拼接上 `app.url`，将处理后的 `href` 记录在一个 `map`中，后面再调用`fetchScriptsFromHtml(wrapElement, app)`，加载 srcipt 标签内容再赋值回去（此时仍然只是记录在map）。
- 若是行内 script，和上一步同理，只是缺少数据请求这一步。

> 到这一步为止，这只是在内存中创建了新的 div 标签，并将处理好的 html 内容赋值给 innerHtml 属性，并没有真正渲染到页面上。

### 挂载子应用
当对 html 做了处理后，下一步就是挂载到 micro-app 自定义的 webComponent 中
```js
  /**
   * When resource is loaded, mount app if it is not prefetch or unmount
   */
  onLoad (html: HTMLElement): void {
    if (++this.loadSourceLevel === 2) {
      this.source.html = html

      if (this.isPrefetch) {
        this.prefetchResolve?.()
        this.prefetchResolve = null
      } else if (appStates.UNMOUNT !== this.state) {
        this.state = appStates.LOAD_SOURCE_FINISHED
        this.mount()
      }
    }
  }
```


```js
  /**
   * mount app
   * @param container app container
   * @param inline js runs in inline mode
   * @param baseroute route prefix, default is ''
   */
  mount (
    container?: HTMLElement | ShadowRoot,
    inline?: boolean,
    baseroute?: string,
  ): void {
    if (isBoolean(inline) && inline !== this.inline) {
      this.inline = inline
    }

    this.container = this.container ?? container!
    this.baseroute = baseroute ?? this.baseroute

    if (this.loadSourceLevel !== 2) {
      this.state = appStates.LOADING_SOURCE_CODE
      return
    }

    dispatchLifecyclesEvent(
      this.container,
      this.name,
      lifeCycles.BEFOREMOUNT,
    )

    this.state = appStates.MOUNTING

    cloneContainer(this.source.html as Element, this.container as Element, !this.umdMode)

    this.sandBox?.start(this.baseroute)

    let umdHookMountResult: any // result of mount function

    if (!this.umdMode) {
      let hasDispatchMountedEvent = false
      // if all js are executed, param isFinished will be true
      execScripts(this.source.scripts, this, (isFinished: boolean) => {
        if (!this.umdMode) {
          const { mount, unmount } = this.getUmdLibraryHooks()
          // if mount & unmount is function, the sub app is umd mode
          if (isFunction(mount) && isFunction(unmount)) {
            this.umdHookMount = mount as Func
            this.umdHookUnmount = unmount as Func
            this.umdMode = true
            this.sandBox?.recordUmdSnapshot()
            try {
              umdHookMountResult = this.umdHookMount()
            } catch (e) {
              logError('an error occurred in the mount function \n', this.name, e)
            }
          }
        }

        if (!hasDispatchMountedEvent && (isFinished === true || this.umdMode)) {
          hasDispatchMountedEvent = true
          this.handleMounted(umdHookMountResult)
        }
      })
    } else {
      this.sandBox?.rebuildUmdSnapshot()
      try {
        umdHookMountResult = this.umdHookMount!()
      } catch (e) {
        logError('an error occurred in the mount function \n', this.name, e)
      }
      this.handleMounted(umdHookMountResult)
    }
  }
```

mount 函数主要做了以下事情：
- 触发主应用注册的生命周期函数，如 `beforemount`
- 调用 `cloneContainer` , 将之前处理过的 html 内容放入 webComponent 容器 (<micro-app/>) 中。
- 创建 js 沙箱环境
- 在沙箱环境中执行子应用的所有 `srcipt`，下面来看下 micro-app 是如何绑定沙箱环境的
```js
/**
 * bind js scope
 * @param url script address
 * @param app app
 * @param code code
 * @param module type='module' of script
 */
function bindScope (
  url: string,
  app: AppInterface,
  code: string,
  module: boolean,
): string {
  if (isPlainObject(microApp.plugins)) {
    code = usePlugins(url, code, app.name, microApp.plugins!)
  }

  if (app.sandBox && !module) {
    globalEnv.rawWindow.__MICRO_APP_PROXY_WINDOW__ = app.sandBox.proxyWindow
    return `;(function(proxyWindow){with(proxyWindow.__MICRO_APP_WINDOW__){(function(${globalKeyToBeCached}){;${code}\n}).call(proxyWindow,${globalKeyToBeCached})}})(window.__MICRO_APP_PROXY_WINDOW__);`
  }

  return code
}
```
其中 `globalKeyToBeCached` 的值是 `window,self,globalThis,Array,Object,String...`，这里巧妙用了width关键字，将子应用语句的作用域替换成了 `proxyWindow.__MICRO_APP_WINDOW__`，从而绑定了沙箱环境。可以参考一下[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)，了解一下`width` 的用法。



### 沙箱实现原理

#### 实现元素隔离

什么是元素隔离？举个例子，基座应用和子应用都有一个元素`<div id='root'></div>`，此时子应用通过`document.querySelector('#root')`获取到的是自己内部的`#root`元素，而不是基座应用的。

下面我们来看下源码是怎么实现的：
```js
  // query element👇
  function querySelector (this: Document, selectors: string): any {
    const appName = getCurrentAppName()
    if (
      !appName ||
      !selectors ||
      isUniqueElement(selectors) ||
      // see https://github.com/micro-zoe/micro-app/issues/56
      rawDocument !== this
    ) {
      return globalEnv.rawQuerySelector.call(this, selectors)
    }
    return appInstanceMap.get(appName)?.container?.querySelector(selectors) ?? null
  }
  Document.prototype.querySelector = querySelector
```

我们可以看到 micro-app 是修改了 Document 原型链上的方法，通过判断 appName，如果 appName 非空，则说明是子应用调用的 querySelector，这时候我们就可以直接使用 `appInstanceMap.get(appName)?.container?.querySelector(selectors)` 方法，从而做到元素的隔离。

思考一下，主应用和子应用得到的 appName 是一样的吗？如果是一样的，那么主应用和子应用的 querySelector 方法就是一样的，肯定不合理。我们来看下源码

子应用在访问 document 对象时实际上还做了一层拦截
```js
    rawDefineProperties(microAppWindow, {
      document: {
        get () {
          throttleDeferForSetAppName(appName)
          return globalEnv.rawDocument
        },
        configurable: false,
        enumerable: true,
      }
	})
```

throttleDeferForSetAppName 方法作用是修改 appName，并创建一个微任务，执行微任务将appName置空。
```js
export function defer (fn: Func, ...args: any[]): void {
  Promise.resolve().then(fn.bind(null, ...args))
}

export function throttleDeferForSetAppName (appName: string) {
  if (currentMicroAppName !== appName) {
    setCurrentAppName(appName)
    defer(() => {
      setCurrentAppName(null)
    })
  }
}
```

所以 appName 仅在访问子应用的 document 对象时才会存在，当访问主应用的 document 时，appName 被清空了，这种设计还是挺巧妙的。

#### 实现 js 隔离

为什么要做 js 隔离，我们可以从下面两个问题说起：
- 假设主应用上有个全局变量 `window.ThemeColor = 'blue'`，而恰巧子应用也设置了这个变量，那么 window 对象中的变量就会发生冲突。
- 假设子应用注册了一个全局监听事件，如果子应用卸载时没有对其进行处理，那么每次切换或加载子应用时都会重新注册一个这样的全局事件，显示是不合理的。


那么如何做到 js 隔离？我们来看下源码

```js
  // create proxyWindow with Proxy(microAppWindow)
  private createProxyWindow (appName: string) {
    const rawWindow = globalEnv.rawWindow
    const descriptorTargetMap = new Map<PropertyKey, 'target' | 'rawWindow'>()
    // window.xxx will trigger proxy
    return new Proxy(this.microAppWindow, {
      get: (target: microAppWindowType, key: PropertyKey): unknown => {
        throttleDeferForSetAppName(appName)

        if (
          Reflect.has(target, key) ||
          (isString(key) && /^__MICRO_APP_/.test(key)) ||
          this.scopeProperties.includes(key)
        ) return Reflect.get(target, key)

        const rawValue = Reflect.get(rawWindow, key)

        return isFunction(rawValue) ? bindFunctionToRawWindow(rawWindow, rawValue) : rawValue
      },
      set: (target: microAppWindowType, key: PropertyKey, value: unknown): boolean => {
        if (this.active) {
          if (escapeSetterKeyList.includes(key)) {
            Reflect.set(rawWindow, key, value)
          } else if (
            // target.hasOwnProperty has been rewritten
            !rawHasOwnProperty.call(target, key) &&
            rawHasOwnProperty.call(rawWindow, key) &&
            !this.scopeProperties.includes(key)
          ) {
            const descriptor = Object.getOwnPropertyDescriptor(rawWindow, key)
            const { configurable, enumerable, writable, set } = descriptor!
            // set value because it can be set
            rawDefineProperty(target, key, {
              value,
              configurable,
              enumerable,
              writable: writable ?? !!set,
            })

            this.injectedKeys.add(key)
          } else {
            Reflect.set(target, key, value)
            this.injectedKeys.add(key)
          }

          if (
            (
              this.escapeProperties.includes(key) ||
              (staticEscapeProperties.includes(key) && !Reflect.has(rawWindow, key))
            ) &&
            !this.scopeProperties.includes(key)
          ) {
            Reflect.set(rawWindow, key, value)
            this.escapeKeys.add(key)
          }
        }

        return true
      },
	// 只贴出了 get 和 set 的源码，其他属性可以自行去阅读源码 
	}
}
```

主要是利用了强大的 Proxy，下面是对于 get 和 set 拦截器的简要分析：

get 拦截器主要做的事情是
- 如果代理对象中存在该属性，直接返回代理对象的属性
- 代理对象不存在该属性时，从原生的 windows 对象中返回。但是需要检查一下属性是否是构造函数，如果是构造函数，还需要给函数绑定 window 对象，例如 `console`，`alert` 属性。

set 拦截器主要做的事情是
- 当沙箱处于 active 状态才会处理
- 如果原生 window 对象不存在该属性时，使用 injectedKeys 记录下来，方便子应用在  [UMD](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/advanced?id=_2%e3%80%81%e6%80%a7%e8%83%bdamp%e5%86%85%e5%ad%98%e4%bc%98%e5%8c%96)模式下频繁切换应用时恢复现场。 

接下来看下如何对事件做处理：
首先是改写原来的 addEventListener 方法，将监听的事件名和事件句柄记录在一个 map 中
```js
  microAppWindow.addEventListener = function (
    type: string,
    listener: MicroEventListener,
    options?: boolean | AddEventListenerOptions,
  ): void {
    type = formatEventType(type, microAppWindow)
    const listenerList = eventListenerMap.get(type)
    if (listenerList) {
      listenerList.add(listener)
    } else {
      eventListenerMap.set(type, new Set([listener]))
    }
    listener && (listener.__MICRO_APP_MARK_OPTIONS__ = options)
    rawWindowAddEventListener.call(rawWindow, type, listener, options)
  }
```

在子应用卸载的时候会触发 releaseEffect 方法，将之前监听的事件全部移除。
```js
  // release all event listener & interval & timeout when unmount app
  const releaseEffect = () => {
    // Clear window binding events
    if (eventListenerMap.size) {
      eventListenerMap.forEach((listenerList, type) => {
        for (const listener of listenerList) {
          rawWindowRemoveEventListener.call(rawWindow, type, listener)
        }
      })
      eventListenerMap.clear()
    }
  }
```


## 整体流程
![[micro-app 原理解析_2022-02-27 15.53.54.excalidraw]]

## 待探究
应用之间如何共享依赖？
[issue 地址](https://github.com/micro-zoe/micro-app/issues/278)

 ## 参考
### micro-app
[https://segmentfault.com/a/1190000040408399](https://segmentfault.com/a/1190000040408399)
[https://segmentfault.com/a/1190000040446543](https://segmentfault.com/a/1190000040446543)
  
### qiankun
[https://zhuanlan.zhihu.com/p/463905990](https://zhuanlan.zhihu.com/p/463905990)
[https://blog.csdn.net/qq_41694291/article/details/113842872](https://blog.csdn.net/qq_41694291/article/details/113842872)

### 其他
[https://zhuanlan.zhihu.com/p/415900889](https://zhuanlan.zhihu.com/p/415900889)
[https://mp.weixin.qq.com/s/Mg3fU0WvZUQnlWHdxc-b5A](https://mp.weixin.qq.com/s/Mg3fU0WvZUQnlWHdxc-b5A)