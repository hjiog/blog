---
title: vue学习
date: 2020-08-30
tags:
 - vue
categories:
 - 前端
---



## 模拟vue实现响应式数据

流程图如下：

![](../img/myVue.png)

<!-- more -->

实现代码：

```html
<div id="app"></div>
<button onclick="plus()">plus</button>

<script>

  //　设置代理，这样访问vm.attr相当于访问vm.option.data.attr
  function initProxy(vm, sourceKey, key) {
    Object.defineProperty(vm, key, {
      get() {
        return vm[sourceKey][key]
      },
      set(nValue) {
        console.log('proxy set')
        vm[sourceKey][key] = nValue
      }
    })
    //　以下写法是错的，_value是vm[sourceKey][key]的一个拷贝，不等同于vm[sourceKey][key]
    //　因此 _value = nValue 只是改变了_value的值，并没有改变vm[sourceKey][key]的值
    // let _value = vm[sourceKey][key]
    // Object.defineProperty(vm, key, {
    //   get() {
    //     return _value
    //   },
    //   set(nValue) {
    //     console.log('proxy set')
    //     _value = nValue
    //   }
    // })
  }

  class myVue {
    constructor(opt) {
      this._option = opt
      this.initData()
      this.$mount()
    }

    initData() {
      this._data = this._option.data
      // return后如果连着new一定要加分号
      if (!this._data || typeof this._data != 'object') return;
      Object.keys(this._data).forEach(key => {
        initProxy(this, '_data', key)
      })
      new Oberser(this._data)
    }

    $mount() {
      this._el = this._option.el
      const fn = () => {
        document.querySelector(this._el).innerHTML = `渲染视图 data:${this.test}`
        console.log(`渲染视图 data:${this.test}`)
      }
      new Watcher(fn)
    }
  }

  class Oberser {
    constructor(data) {
      this.work(data)
    }
    work(data) {
      Object.keys(data).forEach(key => {
        defineReactive(data, key)
      })
    }
  }

  function defineReactive(obj, key) {
    const property = Object.getOwnPropertyDescriptor(obj);
    if (property && property.configurable === false) return;
    const dep = new Dep()
    // 这样写obj[key]始终保持初始值，而展示在界面上的始终是_val
    let _val = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) {
          dep.depend()
        }
        return _val
      },
      set(nval) {
        console.log('set')
        // 必须先赋值再调用notify()
        _val = nval
        dep.notify()
      }
    })
  }

  class Dep {
    constructor() {
      // 这个target要定义成静态属性，不能是实例属性，因此要在外面定义
      // this.target = null
      this.targetSet = new Set()
    }

    depend() {
      if (Dep.target) {
        this.targetSet.add(Dep.target)
      }
    }

    notify() {
      this.targetSet.forEach(fn => {
        fn()
      })
    }
  }

  Dep.target = null

  class Watcher {
    constructor(fn) {
      this.update(fn)
    }
    update(fn) {
      Dep.target = fn
      fn()
      Dep.target = null
    }
  }

  let vm = new myVue({
    el: '#app',
    data: {
      test: 12
    }
  })

  function plus() {
    console.log('click')
    vm.test++;
  }
</script>
```




