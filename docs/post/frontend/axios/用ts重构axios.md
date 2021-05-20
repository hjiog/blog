---
title: 从零开始用ts重构axios
date: 2021-03-13
tags:
 - ts
categories:
 - 前端
---



## 初始化项目

### Typescript library starter

```bash
git clone https://hub.fastgit.org/alexjoverm/typescript-library-starter.git axios-ts
cd aixos-ts
yarn
```



## 错误处理

1. 我们知道使用Promise<T>可以指定resolve返回的值的类型，但是能否指定reject的类型呢？

例如指定axios的返回值类型为Promise<AxiosResponse,AxiosError>

> ps:这种语法是错误的，这里只是举例，实际上Promise接口只能接受一个参数

```ts
axios({ 
  method: 'get',
  url: '/error',
}).then((res) => {
  console.log(res)
}).catch((e) => {
  // 这里e实际上是any类型，能否指定为AxiosError类型呢
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.isAxiosError)
})
```

2. 实际上除了aixos自身能处理的错误之外，一些用户的代码也可能发生异常被catch住，所以这里e只能指定为any
3. 换种写法？

```ts
axios({ 
  method: 'get',
  url: '/error',
}).then((res) => {
  console.log(res)
}).catch((e:AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.isAxiosError)
})
```

这样其实也不妥，e也可能是其他类型的错误

4. 最终写法

```ts
function isAxiosError(err): err is AxiosError {
  return err.isAxiosError
}
axios({ 
  method: 'get',
  url: '/error',
}).then((res) => {
  console.log(res)
}).catch((e) => {
  if(isAxiosError(e)){
      // 这里的e就可以智能推断出AxiosError类型了
      console.log(e.message)
      console.log(e.config)
      console.log(e.code)
      console.log(e.request)
      console.log(e.isAxiosError)
  }else{
      console.log('unkown error...', e)
  }
})
```



## 接口拓展

### 混合对象的实现

> 实现可用同时使用axios.get()和axios({method:'get'})

Axios类

```ts
export default class Axios {

  interceptors: ItercepterManagers

  constructor() {
    this.interceptors = {
      request: new ItercepterManager<AxiosRequestConfig>(),
      response: new ItercepterManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config = {
        ...config,
        url
      }
    } else {
      config = url
    }

    const chain: Tnterceptor<AxiosRequestConfig | AxiosResponse>[] = [{
      onFulfill: dispatchRequest
    }]

    this.interceptors.request.forEach(intercepter => {
      chain.unshift(intercepter)
    })

    this.interceptors.response.forEach(intercepter => {
      chain.push(intercepter)
    })

    let promise: Promise<AxiosRequestConfig | AxiosResponse> = Promise.resolve(config)

    while (chain.length) {
      const { onFulfill, onReject } = chain.shift()
      promise = promise.then(onFulfill, onReject)
    }
    return promise as Promise<AxiosResponse>
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      {
        ...config,
        method,
        url
      }
    )
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      {
        ...config,
        method,
        url,
        data
      })
  }
}
```

主函数

```ts
function extend<T, U>(to: T, from: U) {
  // from 是Axios.prototype,其中的函数是不可枚举的，
  // 可用getOwnPropertyNames获取所有的属性，其中也包括了constructor
  Object.getOwnPropertyNames(from).forEach(proper => {
    (to as T & U)[proper] = from[proper] as any
  })
  return to as T & U
}

function createInstance(): AxiosInstance {
  const context = new Axios()

  let instance = Axios.prototype.request.bind(context)

  // 提取Axios类的原型方法和实例属性
  instance = extend(instance, { ...Axios.prototype, ...context })

  return instance as AxiosInstance
}
```

### 函数重载

> 实现可以同时使用axios.reques(config)或axios.request(url,config)

类型定义

```ts
export type Axios = {

  readonly request: (config: AxiosRequestConfig) => AxiosPromise

  readonly get: (url: string, config?: AxiosRequestConfig) => AxiosPromise

  readonly delete: (url: string, config?: AxiosRequestConfig) => AxiosPromise

  readonly head: (url: string, config?: AxiosRequestConfig) => AxiosPromise

  readonly options: (url: string, config?: AxiosRequestConfig) => AxiosPromise

  readonly post: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise

  readonly put: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise

  readonly patch: (url: string, data?: any, config?: AxiosRequestConfig) => AxiosPromise
};

export type AxiosInstance = {
  (url: string, config: AxiosRequestConfig): AxiosPromise
  (config: AxiosRequestConfig): AxiosPromise
} & Axios;
```

函数实现

```ts
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config = {
        ...config,
        url
      }
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
```



## 请求和响应拦截

> 特点：请求拦截先进后出，响应拦截先进先出

InterceptorManager.ts

```ts
import { OnFulfill, OnReject } from "../../types"


export type Tnterceptor<T> = {
  onFulfill: OnFulfill<T>
  onReject?: OnReject
}

export default class ItercepterManager<T> {

  private interceptors: Tnterceptor<T>[]

  constructor() {
    this.interceptors = []
  }

  forEach(fn: (interceptor: Tnterceptor<T>) => void) {
    this.interceptors.forEach(interceptor => {
      if (interceptor) {
        fn(interceptor)
      }
    })
  }

  use(onFulfill: OnFulfill<T>, onReject?: OnReject) {
    this.interceptors.push({
      onFulfill,
      onReject
    })
    return this.interceptors.length - 1
  }

  eject(index: number) {
    if (index < this.interceptors.length) {
      this.interceptors[index] = null
    }
  }
}
```

Axios.ts 关键代码

```ts
export default class Axios {

  interceptors: ItercepterManagers

  constructor() {
    this.interceptors = {
      request: new ItercepterManager<AxiosRequestConfig>(),
      response: new ItercepterManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config = {
        ...config,
        url
      }
    } else {
      config = url
    }

    const chain: Tnterceptor<AxiosRequestConfig | AxiosResponse>[] = [{
      onFulfill: dispatchRequest
    }]

    this.interceptors.request.forEach(intercepter => {
      chain.unshift(intercepter)
    })

    this.interceptors.response.forEach(intercepter => {
      chain.push(intercepter)
    })

    let promise: Promise<AxiosRequestConfig | AxiosResponse> = Promise.resolve(config)

    while (chain.length) {
      const { onFulfill, onReject } = chain.shift()
      promise = promise.then(onFulfill, onReject)
    }
    return promise as Promise<AxiosResponse>
  }
}
```



## 默认配置与合并

