---
title: js设计模式
date: 2020-07-22
tags:
 - 设计模式
categories:
 - 其他
---

## 策略模式

### 应用场景

不同情况下应用不同的规则，如表单下的不同验证规则，公司根据评级发放年终奖，一般写法会写很多if-else代码，这样违反了“对外开放，对内封闭”原则，我们应该把每条规则写成一个函数，再放到统一的对象里，由调用对象的属性代替if-else，易于扩展，以下是个例子：

<!-- more -->

> 一般写法

```js
// 询价方法，接受价格标签和原价为入参
function askPrice(tag, originPrice) {

  // 处理预热价
  if(tag === 'pre') {
    if(originPrice >= 100) {
      return originPrice - 20
    }
    return originPrice * 0.9
  }

  // 处理大促价
  if(tag === 'onSale') {
    if(originPrice >= 100) {
      return originPrice - 30
    }
    return originPrice * 0.8
  }

  // 处理返场价
  if(tag === 'back') {
    if(originPrice >= 200) {
      return originPrice - 50
    }
    return originPrice
  }

  // 处理尝鲜价
  if(tag === 'fresh') {
     return originPrice * 0.5
  }
}
```


> 封装后的写法
```js
// 定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 20;
        }
        return originPrice * 0.9;
    },
    onSale(originPrice) {
        if (originPrice >= 100) {
            return originPrice - 30;
        }
        return originPrice * 0.8;
    },
    back(originPrice) {
        if (originPrice >= 200) {
            return originPrice - 50;
        }
        return originPrice;
    },
    fresh(originPrice) {
        return originPrice * 0.5;
    },
};

// 增加新判断
priceProcessor.newUser = function (originPrice) {
    if (originPrice >= 100) {
        return originPrice - 50;
    }
    return originPrice;
}

// 询价函数
function askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice)
}
```

### 总结

把每一个**判断分支分别封装到一个对象的函数**里，这样可以通过对象的属性来调用对应的方法，而不用if来判断



## 代理模式

### 应用场景

- 虚拟代理：图片预加载、合并http请求
- 缓存代理：若是复杂的计算可在函数内加上一个缓存的对象，若计算条件与上次相同则从缓存读取。另外，实现分页时也可以用缓存代理，先把当前页缓存下来，点下一页再退回去就可以调用缓存里的数据。

#### 图片预加载

符合单一职责原则，给 img 节点设置 src 和图片预加载这两个功能，被隔离在两个对象里，它们可以各自变化而不影响对方。何况就算有一天我们不再需要预加载，那么只需要改成请求本体而不是请求代理对象即可。

```js
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
```

#### 合并http请求

```js

var synchronousFile = function (id) {
    console.log('开始同步文件，id 为: ' + id);
};
var proxySynchronousFile = (function () {
    var cache = [], // 保存一段时间内需要同步的 ID
        timer; // 定时器
    return function (id) {
        cache.push(id);
        if (timer) { // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(',')); // 2 秒后向本体发送需要同步的 I clearTimeout( timer ); // 清空定时器
            timer = null;
            cache.length = 0; // 清空 ID 集合
        }, 2000);
    }
})();
var checkbox = document.getElementsByTagName('input');
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function () {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
};
```

#### 缓存代理

```js
/**************** 计算乘积 *****************/
var mult = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};
/**************** 计算加和 *****************/
var plus = function () {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
};
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
alert(proxyMult(1, 2, 3, 4)); // 输出：24
alert(proxyMult(1, 2, 3, 4)); // 输出：24
alert(proxyPlus(1, 2, 3, 4)); // 输出：10
alert(proxyPlus(1, 2, 3, 4)); // 输出：10
```



## 发布-订阅模式

### 应用场景

假如你负责登录模块，在用户登录后刷新一些页面，可能你会这样调用其他模块的接口

```js
login.succ(function (data) {
    header.setAvatar(data.avatar); // 设置 header 模块的头像
    nav.setAvatar(data.avatar); // 设置导航模块的头像
    message.refresh(); // 刷新消息列表
    cart.refresh(); // 刷新购物车列表
});
```

如果需求新增一个模块，这段代码又得修改，但实际上你可以把权利下放，然后各个需要刷新的模块去订阅登录模块，若登录好了就发布一个信息去通知订阅者，这样登录模块完全不关心哪些模块需要刷新，谁需要谁就去订阅！

> 封装登录模块

```js
var login = {}; // 定义登录对象
login.clientList = {}; // 缓存列表，存放订阅者的回调函数
login.listen = function (key, fn) {
    if (!this.clientList[key]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
};
login.remove = function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返
        return false;
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        fns && (fns.length = 0);
    } else {
        for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
            var _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l, 1); // 删除订阅者的回调函数
            }
        }
    }
};
login.trigger = function () { // 发布消息
    var key = Array.prototype.shift.call(arguments), // 取出消息类型
        fns = this.clientList[key]; // 取出该消息对应的回调函数集合
    if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
        return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
    }
};
```

> 模拟登录后的操作

```js
$.ajax('http:// xxx.com?login', function (data) { // 登录成功
    login.trigger('loginSucc', data); // 发布登录成功的消息
});

var header = (function () { // header 模块
    login.listen('loginSucc', function (data) {
        header.setAvatar(data.avatar);
    });
    return {
        setAvatar: function (data) {
            console.log('设置 header 模块的头像');
        }
    }
})();

var nav = (function () { // nav 模块
    login.listen('loginSucc', function (data) {
        nav.setAvatar(data.avatar);
    });
    return {
        setAvatar: function (avatar) {
            console.log('设置 nav 模块的头像');
        }
    }
})();
```

这里有可能其他模块没加载完，登录模块先发布了，由于没有订阅，这部分信息便缺失了，造成部分模块刷新失败的现象。这里就要实现支持先发布再订阅的功能。思路就是当没有订阅时，将发布的信息用一个对象缓存起来，等用户订阅后就直接执行订阅的回调函数。



## 命令模式

```html
<body>
    <div id="ball" style="position:absolute;background:#000;width:50px;height:50px"></div>
    输入小球移动后的位置：<input id="pos" />
    <button id="moveBtn">开始移动</button>
    <!--增加取消按钮-->
    <button id="cancelBtn">cancel</cancel>

</body>

<script>
    var ball = document.getElementById('ball');
    var pos = document.getElementById('pos');
    var moveBtn = document.getElementById('moveBtn');
    var MoveCommand = function (receiver, pos) {
        this.receiver = receiver;
        this.pos = pos;
        this.oldPos = null;
    };
    MoveCommand.prototype.execute = function () {
        this.oldPos = this.receiver.getBoundingClientRect().left;
        // 记录小球开始移动前的位置
        this.receiver.style.left = `${this.pos}px`;
    };
    MoveCommand.prototype.undo = function () {
        this.receiver.style.left = `${this.oldPos}px`;
        // 回到小球移动前记录的位置
    };

    var moveCommand;
    moveBtn.onclick = function () {
        moveCommand = new MoveCommand(ball, pos.value);
        moveCommand.execute();
    };
    cancelBtn.onclick = function () {
        moveCommand.undo(); // 撤销命令
    };
</script>
```



