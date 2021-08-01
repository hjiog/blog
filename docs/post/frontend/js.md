---
title: js 学习笔记
date: 2020-03-19
tags:
 - js
categories:
 - 前端
---

## 数据类型

 在 JavaScript 中有 7 种原始类型：`string`，`number`，`bigint`，`boolean`，`symbol`，`null` 和 `undefined` 。

数据类型总体来说分为两种，他们分别是：值类型 和 引用类型

- 值类型（基本类型）：数值型（`Number`)，字符类型（`String`），布尔值型（`Boolean`），`null` 和 `underfined`，`symbol`类型(一般作为对象的key使用)

- 引用类型（类）：函数，对象，数组等


## 数组相关

### 清除或截断数组

```js
const arr=[1,2,3,4,5];
arr.length=3;
console.log(arr)//arr=[1,2,3]
arr.length=0;
console.log(arr)//arr=[]
```

### 数组克隆

```js
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
a1[0] = 'aaa'
console.log(a1,a2)
```

### 数组的参数解构

```js
 var a = `a,b,c,d`;
 console.log(a.split(","))
 const {0:index0,3:index3}=a.split(",");
 console.log(index0,index3);//a,d
```



## 结构体作为函数传递

```js
dosomthing({a:'a',b:'b',c:'c'});//执行
function dosomthing(config){//定义
    const a=config.a!==undefined?config.a:'aa';
    //以下b,c一样
}
```

```js
//更好的方式,注意是等号
function dosomthing({a='aa',b='bb',c='cc'}){
   ...
}
```

```js
//传入参数可选
function dosomthing({a='a',b='b',c='c'}={}){
   ...
```

---------------

## 相关内置函数

### 字符串

#### toLowerCase()
#### toUpperCase()
#### replace(regexp/substr,replacement)

此方法不改变原字符串，返回一个新的字符串

例子：

```js
var str="Visit Microsoft!"
console.log(str.replace(/Microsoft/, "W3School")) //输出Visit W3School!
```

对于replace使用正则，约定了一个特殊标记$

| **字符**          | **替换文本**                                                 |
| ----------------- | ------------------------------------------------------------ |
| \$1、​\$2、... $99 | 与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。每有一个小括号对应一个$ |
| $&                | 与regexp相匹配的子串                                         |
| $`                | 位于匹配子串左侧的文本                                       |
| $'                | 位于匹配子串右侧的文本                                       |
| $$                | 插入一个“$”                                                  |

例子：

```js
var str = '"a", "bc"';
str = str.replace(/"([^"]*)"/g, "'$1'"); // 匹配到"a" "bc",$1代表小括号内匹配到的a bc,用'a' 'bc'代替"a" "ab"
console.log(str); // -> 'a','bc'

var str = 'hellodfd dfd world';
str = str.replace(/world/g, '$`');
console.log(str); // -> hellodfd dfd hellodfd dfd

var str = "4546556565656";
str = str.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
console.log(str); // -> 4,546,556,565,656
```

若第二个参数是函数，函数的返回值则会替换匹配到的字符串，看个例子：

```js
"abcdefgabcdefgabcdefg".replace(/(a)(b)(c)/g, function () {
    console.log(arguments);
})
// 每配对到一个结果，执行一次函数，若无配对，则一次都不执行
// 输出
[Arguments] {
  '0': 'abc', // 匹配到的结果
  '1': 'a', // 第一个分组的内容
  '2': 'b', // 第二个分组的内容
  '3': 'c', // 第三个分组的内容
  '4': 0,	// 匹配的第一个字符的下标
  '5': 'abcdefgabcdefgabcdefg' // 原始字符串
}
[Arguments] {
  '0': 'abc',
  '1': 'a',
  '2': 'b',
  '3': 'c',
  '4': 7,
  '5': 'abcdefgabcdefgabcdefg'
}
[Arguments] {
  '0': 'abc',
  '1': 'a',
  '2': 'b',
  '3': 'c',
  '4': 14,
  '5': 'abcdefgabcdefgabcdefg'
}
```



#### split()

分割再赋值给数组，如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。自身不变化
#### slice()

切片,自身无改变，要返回



### 数组

#### join()

组合成字符串，默认参数是`,`，如果不想添加间隔符，需传入参数`""`

#### slice()
返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。您可使用负值从数组的尾部选取元素。如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。
#### shift()

删除并返回第一个

#### unshift()

可向数组的开头添加一个或更多元素，并返回新的长度

#### concat(acc,cur);

连接两个数组

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

#### splice(index,len,[item])
**该方法会改变原始数组，并数组的形式返回删除的元素**。splice有3个参数，它也可以用来替换/删除/添加数组内某一个或者几个值
index:数组开始下标 len: 替换/删除的长度,增加元素时可以为0 item:替换的值，删除操作的话 item为空
举例:

```js
Array ["Jan", "Feb", "March", "April", "June"]
Array.splice(0, 3, 'May');
Array ["May", "April", "June"]

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2,0,"Lemon","Kiwi");
// Banana,Orange,Lemon,Kiwi,Apple,Mango
//注意：
var fruits1 = ["Banana", "Orange", "Apple", "Mango"];
fruits1.splice(2, 1);
console.log(fruits1)//[ 'Banana', 'Orange', 'Mango' ]
```

#### indexOf()

找出子字符串的index位置序号(子窜每个字符都要匹配)

#### filter()
括号内写入boolen类型的回调函数，筛选出true的元素，不会改变自身的值。

`filter(function(currentValue,index,arr), thisValue)`，`thisValue`是给回调函数指定this对象，默认是undefined
如：

```js
function bouncer(arr) {
      arr=arr.filter((arr)=>!!arr)
      console.log(arr)//[7, "ate", 9]
      return arr;
}
bouncer([7, "ate", "", false, 9]);
```

#### sort()
自身已改变，无需返回，不带参数表示按ACSII码排序，若按数值排序，需传入一个函数

```js
nums = [12, 645, 6, 85, 81, 0, 9, 365, 4, 752];
console.log(nums.sort(function(a, b){
  		return a - b;
})); //结果为：[0, 4, 6, 9, 12, 81, 85, 365, 645, 752]
```

#### map()
有返回值，可以return出来,返回一个新的Array

```js
let a = [0, 2, 3, 5, 7];
let b = a.map(v=>v!=3)
console.log(b) // [ true, true, false, true, true ]
```

#### forEach()

> forEach(callbackfn: (value: any, index: number, array: any[]) 或
>
> forEach(callbackfn: (value: any, key: any, map: Map<any, any>)  (map的遍历只有forEach才有,some是没有的)

没有返回值,return 还是会继续执行

```js
var numbers = [65, 44, 12, 4];
numbers.forEach((item,index?,arr?) =>{})
```

**需要注意的是：当数组内容是empty时forEach会跳过该项，例如：**

```js
let nums = new Array(10)
nums.forEach(v=>console.log(v)) // 没有输出，所有循环直接结束

let nums = new Array(10).fill(0)
nums.forEach(v=>console.log(v)) // 输出10个`0`
```

**forEach中不能用break和continue中断,只能用return达到类似continue的效果**

#### some()

返回一个boolean，判断是否有元素是否符合func条件(有一个就行)（并没有改变原数组
		return true/false 终止

**some中同样不能用break和continue中断,用return或return false能达到类似continue的效果,用return true 能退出整个循环**

#### find() 

（fn:(v:any)=>boolen):any

返回符合条件的value,没有返回则结果是undefined

```js
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found);
// expected output: 12
```

#### every()
返回一个boolean，判断每个元素是否符合func条件（所有都判断）（并没有改变原数组）

#### reduce()

```js
var numbers = [65, 44, 12, 4];

numbers.reduce((total,currentValue, index,arr)=> {
   	return total + currentValue;
},initialValue) // 输出为数组的总和：125
	//total	必需。初始值, 或者计算结束后的返回值。不指定initialValue则指向数组的第一个元素
	//currentValue	必需。当前元素
	//currentIndex	可选。当前元素的索引
	//arr	可选。当前元素所属的数组对象。
	//initialValue 可选。传递给函数的初始值
```


### Object

#### Object.keys(obj)

 返回一个由一个给定对象的自身**可枚举属性**组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 ,里面是key,string类型，与之对应的是 Object.values（obj）

#### Object.getOwnPropertyNames(obj)

 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

#### 总结对比

Object.keys和Object.getOwnPropertyNames：

- 共同点： 都是返回自身的属性，不会返回原型链上的
- 不同点： Object.keys()返回可枚举的，Object.getOwnPropertyNames()返回所有不包括Symbol的

补充:

- `Reflect.ownKeys()`

` Reflect.ownKeys()` 相当于

`Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`

所以` Reflect.ownKeys()`的限制是最小的

- `for...in`

`for...in`会遍历该对象及其原型链上的所有属性

#### Object.hasOwnProperty()

判断是否含有某属性，返回boolen

### 其他

#### parseInt

 `function parseInt(s: string, radix?: number): number `

当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数，若转化失败，返回NaN；

若第一个参数是number类型且是小数，那么会向下取整

#### toString/valueOf

 这两个方法一般是交由JS去隐式调用，以满足不同的运算情况。
在数值运算里，会优先调用`valueOf()`，如a + b；
在字符串运算里，会优先调用`toString()`，如alert(c)。

下面为主动调用的情况：

##### 对于字符串

不接受参数，两者都是返回自身

##### 对于数字

 `Number.toString(radix?: number): string `

radix默认为10，可将数字转为指定进制的字符串，看个例子

```js
let a = 255;
console.log(a.valueOf(), a.toString(16))
// 输出 255 ff
```

##### 对于对象

 `Object.toString(): string`

 `Object.valueOf(): Object`

不改写这两方法的话，`toString`输出字符串，`valueOf`输出对象本身，看个例子

```js
let c = {
    a: 4,
    b: "df",
    c: {}
}
console.log(c.toString(), c.valueOf())
// 输出 [object Object] { a: 4, b: 'df', c: {} }
```

####  setTimeout

`function setTimeout(handler: TimerHandler, timeout?: number, ...arguments: any[]) `

注意第三个参数是handler调用时作为handler函数的入参

#### window.location属性及方法

```text
window.location.href     → 'https://www.jianshu.com/search?q=JS#comments'
               .origin   → 'https://www.jianshu.com'
               .protocol → 'https:'
               .host     → 'www.jianshu.com'
               .hostname → 'www.jianshu.com'
               .port     → ''
               .pathname → '/search/'
               .search   → '?q=JS'
               .hash     → '#comments'

window.location.assign('url')
               .replace('url')
               .reload()
               .toString()
```

#### Math

##### random()

返回介于 0（包含） ~ 1（不包含） 之间的一个随机数

实例: 返回 min（包含）～ max（不包含）之间的数字：

```js
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
```

#### base64编码与解码

```js
// 编码
window.btoa("hello")// "aGVsbG8="
// 解码
window.atob("aGVsbG8=")// "hello"
```





## 箭头函数

箭头函数表达式的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数。

```js
  $('.statusHover-mobile').on('touchstart', () => {
          $(this).find('.msg-tips').css('display', 'block');
        })
//这段代码this并不是你想要的this,应该改为es5的写法或用event.currentTarget，可改成
  $('.statusHover-mobile').on('touchstart', (e) => {
          $(e.currentTarget).find('.msg-tips').css('display', 'block');
        })
//或
  $('.statusHover-mobile').on('touchstart', function() {
          $(this).find('.msg-tips').css('display', 'block');
        })
```



## 实战技巧

### 监听上拉刷新

此法同样适用于下滑顶部菜单的弹出：

```js
const test = document.getElementById('test'); // 在页面底部插入一个元素监听
const scroll = fromEvent(document, 'scroll'); // 需引入rxjs
  scroll.pipe(
      map(e => test.getBoundingClientRect())
    ).subscribe(bool => {
      console.log(bool.top, bool.bottom, document.documentElement.clientHeight)
      if(bool.bottom<=document.documentElement.clientHeight){
          console.log('触发上拉刷新事件！')
      }
    })
```

`getBoundingClientRect`个方向的含义如下：（注意是以屏幕左或上为参考）

- `top`:上边距屏幕顶部的距离
- `bottom`:下边距屏幕顶部的距离
- `left`:左边距屏幕左部的距离
- `right`:右边距屏幕左部的距离

### 各坐标含义

- `clientX、clientY`
  点击位置距离当前body可视区域的x，y坐标

- `pageX、pageY`
  对于整个页面来说，包括了被卷去的body部分的长度

- `screenX、screenY`
  点击位置距离当前电脑屏幕的x，y坐标

- `offsetX、offsetY`
  相对于带有定位的父盒子的x，y坐标

- `x、y`
  和`screenX、screenY`一样

### push 方法易错点

```js
 Data = {
    id: 0,
    updateTime: ""
  }

for (var i in this.pageData1) {
        this.Data.id = this.pageData1[i].id
        this.postData.push(this.Data);
    }
```

和

````js
for (var i in this.pageData1) {
        Data = {
        id: 0,
        updateTime: ""
    }
        this.Data.id = this.pageData1[i].id
        this.postData.push(this.Data);
    }
````

是不一样的,push进去的参数每一个都应该是一个实体，指针或对象不行

### 阻止事件冒泡

```js
e.stopPropagation();
e.preventDefault();
```

### 穿透上层元素

css设置

```css
pointer-events:none;
```

### 获取相对于父元素的坐标

```js
e.target.offsetLeft
e.target.offsetTop
```







------------------------------

## 关于`const`的坑

在angular 中定义一个常量:

`const a=4`

你在一次操作中将它改为`a=0`,先跳到其他路由再返回本页面a还是0不会是4，因为**`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。**



## var和let

```js
for(var i=0;i<5;i++){
  setTimeout(()=>{
    console.log(i);//5个5
  },100)
}
console.log(i);//5

for(let j=0;j<5;j++){
  setTimeout(()=>{
    console.log(j);//0,1,2,3,4
  },100)
}
console.log(j);//报错 j is not defined
```

- **var声明的变量只有函数作用域和全局作用域，没有块级作用域 **，即for中用var定义的变量都是全局的，所以for函数体内每次循环var都被重新定义了，后面每次输出的都是最后一次定义的i）。如果用let，每次for循环都会创建一个新的词法环境 ，因此，每次i的值都不一样。
- var的提升是指**var的 声明会被提升，但是赋值不会。** 无论var在哪声明，总是将该声明提升到该作用域的最顶部。

```js
function sayHi() {
  alert(phrase); // undefined（这里并不会报错）

  var phrase = "Hello";
}

// 等价于
function sayHi() {
  var phrase; // 在函数刚开始时进行变量声明

  alert(phrase); // undefined

  phrase = "Hello"; // ……赋值 — 当程序执行到这一行时。
}
```



## 自由变量和作用域链

### 1. 什么是自由变量

 首先认识一下什么叫做 **自由变量** 。如下代码中，`console.log(a)`要得到a变量，但是在当前的作用域中没有定义a（可对比一下b）。当前作用域没有定义的变量，这成为 自由变量 。自由变量的值如何得到 —— 向父级作用域寻找（注意：这种说法并不严谨，下文会重点解释）。

```js
var a = 100
function fn() {
    var b = 200
    console.log(a) // 这里的a在这里就是一个自由变量
    console.log(b)
}
fn()
```

### 2.什么是作用域链

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 作用域链 。

### 3.关于自由变量的取值

关于自由变量的值，上文提到要到父作用域中取，其实有时候这种解释会产生歧义。

```js
var x = 10
function fn() {
  console.log(x)
}
function show(f) {
  var x = 20
  (function() {
    f() //10，而不是20
  })()
}
show(fn)
```

在fn函数中，取自由变量x的值时，要到哪个作用域中取？——要到**创建fn函数的那个作用域**中取，**无论fn函数将在哪里调用**。





-----------------------

## 执行上下文和执行栈

### 1.变量声明提升

大部分编程语言都是先声明变量再使用，但在JS中，事情有些不一样：

```js
console.log(a)// undefined
var a = 10
```

上述代码正常输出`undefined`而不是报错`Uncaught ReferenceError: a is not defined`,这是因为声明提升（hoisting），相当于如下代码：

```js
var a; //声明 默认值是undefined “准备工作”
console.log(a);
a=10; //赋值
```

### 2.变量声明提升

**当遇到函数和变量同名且都会被提升的情况，函数声明优先级比较高，因此变量声明会被函数声明所覆盖，但是可以重新赋值。**

```js
alert(a);//输出：function a(){ alert('我是函数') }
function a(){ alert('我是函数') }//
var a = '我是变量';
alert(a);   //输出：'我是变量'
```

复杂点的例子：

```js
function test(arg){
    // 1. 形参 arg 是 "hi"
    // 2. 因为函数声明比变量声明优先级高，所以此时 arg 是 function
    console.log(arg);  //输出 [Function: arg]
    var arg = 'hello'; // 3.var arg 变量声明被忽略， arg = 'hello'被执行
    function arg(){
	console.log('hello world')
    }
    console.log(arg); // 输出 hello
}
test('hi');
/* 输出：
function arg(){
    console.log('hello world')
    }
hello
*/
```

### 3. this指向

一张图看懂：

![]( https://camo.githubusercontent.com/eeccee7645916ee77a2291001882fcefc512aee5/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f352f313639346537353632366337343664313f773d36303226683d34323626663d706e6726733d3535383437 )

搭配以下例子食用更佳：

```js
"use strict"
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        },
        test: this,
    };
};

let user = makeUser();
let test2=user.ref;
let test3=user.ref();

console.log(user.ref()); // { name: 'John', ref: [Function: ref], test: undefined } 对象调用了ref方法，因此this传进来了
console.log(user.test); // undefined 对象调用了test属性，this无效
console.log(makeUser().test); // undefined 等价于console.log(user.test);
console.log(test2()); // undefined test2=user.ref这句只是将方法赋值给test2,并没有调用这个方法，因此this没有传进去
console.log(test3); // { name: 'John', ref: [Function: ref], test: undefined } 等价于console.log(user.ref())
```

**总结： `this`的值是在程序运行时得到的，函数里的`this`是相对于对象而言的，不是指函数本身。以“方法”的语法调用函数时：`object.method()`，调用过程中的 `this` 值是 `object`。**



### 4. 执行栈

JavaScript 引擎创建了执行上下文栈来管理执行上下文。**可以把执行上下文栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。

[![img](https://camo.githubusercontent.com/2c013b23084b7ca1b29c296e52a3001f8758348a/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f342f313639343935323931303561653061363f773d34383626683d32333826663d67696626733d313138303833)](https://camo.githubusercontent.com/2c013b23084b7ca1b29c296e52a3001f8758348a/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f332f342f313639343935323931303561653061363f773d34383626683d32333826663d67696626733d313138303833)

从上面的流程图，我们需要记住几个关键点：

- JavaScript执行在单线程上，所有的代码都是排队执行。
- 一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
- 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
- 浏览器的JS执行引擎总是访问栈顶的执行上下文。
- 全局上下文只有唯一的一个，它在浏览器关闭时出栈。



## 闭包

### 概念

闭包就是能够读取其他函数内部变量的函数。由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

### 用途

- 读取函数内部的变量
- 让变量的值始终保持在内存中。

### 应用场景

- 可以做缓存，使用对象时候，缓存里面如果没有的话，就新建对象到缓存，如果缓存里面有，就直接从缓存里面拿，这样就可以节约新建对象耗费的资源

```js
var Cache1=(function(){
     var cache={};
     return {
         getObj:function(name){
             if(name in cache){
                 return cache[name];
             }
             var temp=new Object(name);
             cache[name]=temp;
             return temp;
         }
     }
})()
```

- 可以实现变量的访问权限。我们可以让封装对象中的变量不能直接访问，而通过提供的闭包中的方法来访问。

```js
var person=function(){
    var name="no name!";
    return {
        getName:function(){
            return name;
        },
        setName:function(value){
            name=value;
        }
    }
}();
```

### 内存泄漏

栈内存提供一个执行环境，即作用域，包括全局作用域和私有作用域,那他们什么时候释放内存的？

- **全局作用域----只有当页面关闭的时候全局作用域才会销毁**
- **私有的作用域----只有函数执行才会产生**

**一般情况下，函数执行会形成一个新的私有的作用域，当私有作用域中的代码执行完成后，我们当前作用域都会主动的进行释放和销毁。但当遇到函数执行返回了一个引用数据类型的值，并且在函数的外面被一个其他的东西给接收了，这种情况下一般形成的私有作用域都不会销毁**。

如下面这种情况：

```js
function fn(){
var num=100;
return function(){
  }
}
var f=fn();//fn执行形成的这个私有的作用域就不能再销毁了
f=null // 这段代码可以回收内存
```

也就是像上面这段代码，fn函数内部的私有作用域会被一直占用的，发生了内存泄漏。**所谓内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。闭包不能滥用，否则会导致内存泄露，影响网页的性能。闭包使用完了后，要立即释放资源，将引用变量指向null**。



## 原型与原型链

### 1. 原型

**在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个`prototype`属性，这个属性指向函数的原型对象，并且这个属性是一个对象数据类型的值。**

让我们用一张图表示构造函数和实例原型之间的关系：

[![img](https://camo.githubusercontent.com/a2c7ab71e923c3e3bf8f63eb2bd40d3d243b1490/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f352f313636343338303836616461306237303f773d34363726683d31303426663d706e6726733d3130353336)](https://camo.githubusercontent.com/a2c7ab71e923c3e3bf8f63eb2bd40d3d243b1490/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f352f313636343338303836616461306237303f773d34363726683d31303426663d706e6726733d3130353336)
原型对象就相当于一个**公共的区域**，所有同一个类的实例都可以访问到这个原型对象，我们可以将对象中共有的内容，统一设置到原型对象中。

```js
function Person() { }
Person.prototype.a = 123;
Person.prototype.sayHello = function () {
    alert("hello");
};
var person = new Person()
console.log(person.a)//123
person.__proto__.a = 456 //注意此处改变了公共的原型对象，所以新建个实例仍然输出456
var person2 = new Person()
console.log(person2.a)//456
console.log(person.hasOwnProperty('a'));//false
console.log('a' in person)//true
```

### 2.原型链

 **在JavaScript中万物都是对象，对象和对象之间也有关系，并不是孤立存在的。对象之间的继承关系，在JavaScript中是通过prototype对象指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条，专业术语称之为原型链**。 下图可了解其中的关系：

[![img](https://camo.githubusercontent.com/d819ad98b91815426e1bf4f847be27eb0affb6a0/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f352f313636343435623331643239313862363f773d35323126683d34363226663d706e6726733d3332383537)](https://camo.githubusercontent.com/d819ad98b91815426e1bf4f847be27eb0affb6a0/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31302f352f313636343435623331643239313862363f773d35323126683d34363226663d706e6726733d3332383537)

补充亿点细节：

- 每个构造函数默认都有` portotype`属性，且默认`F.prototype = {constructor：F}`
- `F.prototype` 属性仅在 `new F` 被调用时使用，它才为新对象的 `[[Prototype]]` 赋值。
- `F.prototype` 属性只能是object或null

### 3.值得注意的细节

```js
function Per () { }
Per.prototype = {
  num1: 1000,
  money: {
    num2: 1000
  },
  money2: {
    num3: 2000
  },
  buy: function () {
    console.log(this.num1, this.money.num2, this.money2.num3)
  },
}
var p1 = new Per();
var p2 = new Per();
// 若某一个属性只存在在原型链中,设置值时会在p2新建该属性
// 若该属性是对象,且设置的是对象里的属性值,则会直接在原型上改,p2并不会新建属性
p2.num1 = 0;
p2.money = { num2: 0 };
p2.money2.num3 = 0; // 作用到原型上了
console.log(p2.hasOwnProperty("num1"), p2.hasOwnProperty("money"), p2.hasOwnProperty("money2")) // true true false
p1.buy(); // 1000 1000 0
```





---------------------

## target和currentTarget

```html
<div id="a">
  <div id="b">
    <div id="c"><div id="d"></div></div>
  </div>
</div>
<script>
  document.getElementById('a').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('b').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('c').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('d').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
</script>
```

![img](https://camo.githubusercontent.com/db568d593b00511ada15f4f66a62ea66c179323f/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f31322f342f313637373937346461643237356662373f773d38383726683d32343526663d67696626733d313033313433)

鼠标点击哪个元素target就是哪个，而currentTarget则指向绑定监听事件的元素。



-----------------------

## this绑定

```js
var obj={
    myFunc:function(arg1,arg2){
        console.log(arg1,"-",arg2)
    }
}
obj.myFun.call(this,'成都','上海')；　　　　 // 成都 - 上海
obj.myFun.apply(this,['成都','上海']);      // 成都 - 上海
obj.myFun.bind(this,'成都','上海')();       // 成都 - 上海
obj.myFun.bind(this,['成都','上海'])();　　 // 成都,上海 - undefined
```

- bind返回的是函数，需在后面加个`（）`才能执行，call和apply调用即可执行
- 三者第一个参数都是绑定this，第二个参数apply用数组表示，call和bind用逗号分隔，追加在第一个参数后面
- **由于`new`绑定的优先级大于bind、call、apply绑定，所以new一个对象时，函数内部this还是obj {} **
- bind绑定了就不能再更改，如下

```js
function f(a) {
    console.log(this.name, a);
}
f = f.bind({ name: "John" }, "test1").bind({ name: "Pete" }, "test2");
f(); // John test1
```

-  函数的属性中有一个值，`bind` 之后它会改变：

```js
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // undefined   bind的结果是另一个对象。它并没有 test 属性。
```

先看一个案例：

```js
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
```

`setTimeout(user.sayHi, 1000)`中只是将函数本身传递进去，并没有调用，因此this失效。下面提供了两种方法解决：

```js
setTimeout(user.sayHi.bind(user), 1000);
```

```js
setTimeout(()=>{user.sayHi()}, 1000);
```

推荐用第一种方案，因为用bind绑定后，this就固定成绑定时的user，这样，即使后面user结构被修改，this的指向也不会改变，第二种方案this就指向修改后的user，可能导致某种不好的后果。



------------

##  `WeakMap`  和`Map`

### 1. 为何需要WeakMap?

存储在map中的变量引用置空而被内存回收：

```javascript
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // 覆盖引用

// john 被存储在 map 中，
// 我们可以使用 map.keys() 来获取它
```

使用WeakMap：

```javascript
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
```

当使用对象作为键，且这个对象随时可能置空，那么就应该考虑`WeakMap`

### 2. 两者的异同

-  `WeakMap` 仅允许对象作为键

- `WeakMap` 不支持迭代以及 `keys()`，`values()` 和 `entries()` 方法，因为不知道对象键会何时清理
-  `WeakMap` 在引用对象置空时，内存会回收这个对象

**ps: `WeakSet`类似**



----------------

## 构造函数，普通函数，普通对象间的联系

先看个例子：

```js
function constructorFn() { // 构造函数
    let privateVal = "构造函数体内的私有变量，只能在函数体内访问";
    this.objVal = "实例化后可在外部访问";;
    console.log(privateVal, this.objVal);
}

function normalFn() { // 普通函数
    let a11 = "普通函数体内的私有变量，只能在函数体内访问";
    console.log(a11);
}

let obj = {
    objVal: "对象内的普通变量"
}

constructorFn(); // Uncaught TypeError: Cannot set property 'objVal' of undefined
normalFn(); // 普通函数体内的私有变量，只能在函数体内访问

let constructorFnTest = new constructorFn(); // 构造函数体内的私有变量，只能在函数体内访问 实例化后可在外部访问
let normalFnTest = new normalFn(); // 普通函数体内的私有变量，只能在函数体内访问

console.log(constructorFnTest); // constructorFn {objVal: "实例化后可在外部访问"}
console.log(normalFnTest); // normalFn {}
console.log(obj); // {objVal: "对象内的普通变量"}
```

- 构造函数含有this,且不能直接运行，new之后返回一个实例对象

- 构造函数用let/var定义的变量只能内部访问，实例对象.xxx是不能访问的

- 所有函数自带prototype属性， 内部定义为

  `constructorFn.prototype={constructor: ƒ constructorFn() }`

  `{constructor: ƒ constructorFn() }`是个对象，作为函数原型的同时，又继承`Object.prototype`

- 普通对象的原型直接是`Object.prototype`

- ~~`prototype`是用在函数上的，而`__proto__`是用在原型上的，在函数上直接调用`__proto__`是不对的~~    **更正：`prototype`只用在函数上，所有函数的`__proto__`指向`Function.prototype`(函数也是对象，而对象都有`__proto__`)**

- 以下两种写法是不一样的：

```js
function a1() {
	function b1(){} // 不属于原型也不能用于外部调用，只能函数内部使用
}

function a2() {
}
a2.b2=function(){}

console.log(a1.b1) //undefined
console.log(a2.b2) //[Function]
```

----------------------

## 面试常见手撕代码

### 1. 实现柯里化

```js
function curry(target) {
    return function currid(...args) { // 这里的函数命名不能漏
        if (args.length >= target.length) { // 记得大于等于，这样参数溢出也可以运行
            return target.apply(this, args);
        } else {
            return function (...args2) {
                return currid.apply(this, args.concat(args2)) // 是调用currid而不是curry
            }
        }
    }
}
function test(a, b, c) {
    return a + b + c
}
let handle = curry(test);
console.log(handle(1, 2)(3)) // 6
```

### 2. 分别用深度遍历和广度遍历实现深复制

```js
"use strict"

function deepClone(source, hash = new WeakMap()) {
    if (typeof source != "object" || source == null) return source; // 非对象或空对象返回自身
    if (hash.has(source)) {
        return hash.get(source); // 若表中存在这个键，则返回该键对应的值，解决克隆时循环引用的问题
    }
    let target = Array.isArray(source) ? [] : {}; // 识别是对象还是数组
    hash.set(source, target);
    Reflect.ownKeys(source).forEach((key) => { // 这里用Reflect.ownKeys而不用for...in迭代是因为Reflect.ownKeys可以访问Symbol属性
        /**
         * 1. 如果使用for...in会把原型链上的其他属性也迭代出来，那么就要多层判断Object.prototype.hasOwnProperty.call(source, key)，
         * 防止得到属于原型链而不属于source自身的属性，这里使用Reflect.ownKeys，因此可以省去判断
         * 2. 不直接用source.hasOwnProperty(key)是因为如果source=Object.create(null),
         那么source就没有继承Object的原型，使得source的hasOwnProperty方法为undefinde
         */
        if (typeof source[key] == "object" && source[key] != null) {
            target[key] = deepClone(source[key], hash);
        } else {
            target[key] = source[key];
        }
    });
    return target;
}


function deepClone2(source) {
    if (typeof source != "object" || source == null) return source; // 非对象或空对象返回自身
    let target = Array.isArray(source) ? [] : {}; // 识别是对象还是数组
    let hash = new WeakMap();
    // 栈
    let loopList = [{
        target: target,
        source: source
    }];
    hash.set(source, target); // 注意这句不要漏，下面还有一个hash.set
    while (loopList.length) {
        // 广度优先
        let data = loopList.pop();
        let node = data.source;
        let target = data.target;
        Reflect.ownKeys(node).some((key) => { // 这里用Reflect.ownKeys而不用for...in迭代是因为Reflect.ownKeys可以访问Symbol属性
            if (typeof node[key] == "object" && node[key] != null) {
                if (hash.has(node[key])) {
                    target[key] = hash.get(node[key]);
                } else {
                    target[key] = Array.isArray(node[key]) ? [] : {}; // 识别是对象还是数组
                    loopList.push({ target: target[key], source: node[key] });
                    hash.set(node[key], target[key]);
                }
            } else {
                target[key] = node[key];
            }
        });
    }
    return target;
}


// 测试用例
var a = {
    name: "muyiy",
    book: {
        title: "You Don't Know JS",
        price: "45"
    },
    a1: undefined,
    a2: null,
    a3: 123,
    Symbols: Symbol("test")
}

a.circleRef = a;

let test2 = deepClone2(a);
// let test2 = deepClone(a);
console.log(a, test2);
```

- 可以复制symbol属性
- 消除循环引用
- 属性为null或undefined亦可

### 3. 节流、防抖及apply、bind的原理实现

```html
   <div id="content"
      style="height:150px;line-height:150px;text-align:center; color: #fff;background-color:#ccc;font-size:80px;"></div>
<script>
    "use strict"

let testObj = {
    success: true
}

function debounce(fn, delay) { // 防抖,每当有一个操作进来重新计时
    let tmier;
    return function (...arg) {
        if (tmier) {
            clearTimeout(tmier);
        }
        tmier = setTimeout(() => { fn.myApply(this, arg) }, delay);
    }
}

function throttle(fn, delay) { // 节流,计时未结束时,都忽略后面进来的操作
    let canRecieve = true;
    return function (...arg) {
        if (!canRecieve) return;
        canRecieve = false;
        setTimeout(() => {
             // fn.myApply(testObj, arg);
            arg？fn.myBind(testObj, ...arg)()：fn.myBind(testObj)();
            canRecieve = true;
        }, delay)
    }
}

Function.prototype.myApply = function (contexts, args) { // 模拟apply
    let context = contexts || window;
    context.fn = this; // 调用方式为xxx.myApply,所以这个this指的就是xxx，且这里的xxx是个函数
    let result;
    if (!args) {
        result = context.fn();
    } else {
        result = context.fn(...args);
    }
    delete context.fn;
    return result;
}

Function.prototype.myBind = function (contexts, ...args) { // 模拟bind
    let context = contexts || window;
    return () => {
        context.fn = this;
        let result;
        if (!args) {
        	result=context.fn();
    	} else {
 			result=context.fn(...args);
    	}
        delete context.fn; // 和apply不一样，这步要放里面
        return result;
    };
}

var num = 1;
var content = document.getElementById('content');

function count(e) {
    console.log(e,this);
    content.innerHTML = num++;
};

content.onmousemove = throttle(count, 500);
</script>
```

### 4. 实现组合和管道函数

```js
// 组合(利用后面函数返回的结果作为前一个函数的入参)
function compose(...args) {
    return function (...args2) {
        return args.reverse().reduce((ret, fn) => {
            return ret.length ? fn(...ret) : fn(ret) // 这里是实现了组合的开始函数可以传递多个参数
        }, args2)
    }
}

// 管道(利用前面函数返回的结果作为后一个函数的入参)
function pipe(...args) {
    return function (...args2) {
        return args.reduce((ret, fn) => {
            return ret.length ? fn(...ret) : fn(ret) // 这里是实现了管道的开始函数可以传递多个参数
        }, args2)
    }
}

// 测试
function add(a, b) {
    return a + b
}

function print(a) {
    return `得到结果：${a}`;
}

let composeFn = compose(print, add);
let pipeFn = pipe(add, print);
console.log(composeFn(1, 2)); //得到结果：3
console.log(pipeFn(3, 4)); // 得到结果：7
```

### 5. 每隔三位用逗号将数字分割

```js
// 法一
function format1(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}

// 另一种写法
function format1 (num) {
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  return (num + '').replace(reg, (res) => {
    return res + ","
  });
}

// 法二
function format2(num) {
    let str = num + '';
    return str.split("").reverse().reduce((pre, v, index) => {
        // 注意若没有初始化pre时，pre默认是第一项且index是从1开始的，若用reduce(fn,pre)初始化后则index从0开始
        console.log(pre, index)
        return (index % 3 ? v : (v + ',')) + pre
    })
}

console.log(format1(1236565)) // 1,236,565
console.log(format2(1236565)) // 1,236,565
```

### 6. 模拟实现instanceof

```js
function myInstanceof(source, target) {
    let prot = target.prototype;
    while (true) {
        let next = Object.getPrototypeOf(source) // 等价于source.__proto__(不推荐此写法)
        if (!next) {
            return false
        }
        if (next == prot) {
            return true
        }
        source = next
    }
}

let a = []
console.log(a instanceof Array) // true
console.log(myInstanceof(a, Array)) // true
```

### 7. Promise

#### 原理

promise.js

```js
// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  status = PENDING
  // 保存resolve的值
  value = null
  // 保存reject的值
  reason = null

  // resolve的回调队列
  resolveCallBackList = []
  rejectCallBackList = []

  static resolve (v) {
    return new MyPromise((resolve) => {
      resolve(v)
    })
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  resolve = (v) => {
    if (this.status === PENDING) {
      this.value = v
      this.status = FULFILLED
      // 执行完回调函数记得清除
      while (this.resolveCallBackList.length) {
        this.resolveCallBackList.shift()(v)
      }
    }
  }

  reject = (v) => {
    if (this.status === PENDING) {
      this.reason = v
      this.status = REJECTED
      // 执行完回调函数记得清除
      while (this.rejectCallBackList.length) {
        this.rejectCallBackList.shift()(v)
      }
    }
  }

  then (onFulfilled, onReject) {
    // 保证参数不为空
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    const realOnReject = typeof onReject === 'function' ? onReject : reason => { throw reason }

    const promise = new MyPromise((resolve, reject) => {

      // 此处创建微任务，用queueMicrotast代替setTimeout，
      const fulfilledPromise = () => {
        queueMicrotask(() => {
          try {
            const res = realOnFulfilled(this.value)
            resolvePromise(promise, res, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      const rejectPromise = () => {
        queueMicrotask(() => {
          try {
            // todo 此处为何需要返回
            const res = realOnReject(this.reason)
            resolvePromise(promise, res, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === FULFILLED) {
        fulfilledPromise()
      } else if (this.status === REJECTED) {
        rejectPromise()
      } else if (this.status === PENDING) {
        this.resolveCallBackList.push(fulfilledPromise)
        this.rejectCallBackList.push(rejectPromise)
      }
    })
    return promise
  }

  catch (onReject) {
    return this.then(undefined, onReject)
  }

  finally (callBack) {
    return this.then(
      (resolve) => MyPromise.resolve(callBack()).then(() => resolve),
      (reason) => MyPromise.resolve(callBack()).then(() => { throw reason }),
    )
  }
}


function resolvePromise (promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  // 无论是object（相当于MyPromise对象）或是function,只要含有then这个方法，都会去调用 
  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则拒绝 promise
      // 这是有可能的，比如用object.defineProperties定义then的get属性，当访问then时就抛出错误
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;
        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
```

**测试是否符合promise A+ 规范**

1. 在promise.js下添加一下代码

```js
MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
module.exports = MyPromise;
```

2. 添加测试库promises-aplus-tests

```bash
yarn add promises-aplus-tests
```

3. 在package.json添加启动脚本

```js
{
  "name": "promise",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "devDependencies": {},
  "scripts": {
    "test": "promises-aplus-tests promise.js", // 此处添加
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```



#### 实例方法

##### Promise.prototype.catch

```js
Promise.prototype.catch = function(onReJected) {
    // 返回一个没有第一个参数的then方法
    return this.then(undefined, onReJected)
}
```

##### Promise.prototype.finally

```js
Promise.prototype.finally = function (cb) {
  return this.then(
    value => Promise.resolve(cb()).then(() => value),
    reason => Promise.resolve(cb()).then(() => { throw reason })
  );
}
```

#### 静态方法

##### Promise.resolve

```js
Promise.resolve = function (value) {
  // 如果参数是Promise实例，直接返回这个实例
  if (value instanceof Promise) return value
  return new Promise(resolve => resolve(value))
}
```

##### Promise.reject

```js
Promise.reject = function (value) {
  // 如果参数是Promise实例，直接返回这个实例
  if (value instanceof Promise) return value
  return new Promise((resolve,reject) => reject(value))
}
```

##### Promise.all

return一个promise对象,待res数组的长度等于入参数组的长度时,执行resolve方法

```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    let resultCount = 0;
    let results = new Array(promises.length);

    for (let i = 0; i < promises.length; i++) {
      // 外面套了一层Promise.resolve实现任意值都有then方法返回
      Promise.resolve(promises[i]).then(value => {
        resultCount++;
        results[i] = value;
        if (resultCount === promises.length) {
          return resolve(results)
        }
      }, error => {
        reject(error)
      })
    }
  })
}
```

##### Promise.race

return一个promise对象,待入参中的promise有一个执行then的回调方法时,执行resolve方法

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) =>
    // 注意用到Promise.resolve(v) 转换一次,防止v是基本数据类型
    promises.forEach(v => Promise.resolve(v).then(resolve, reject)))
}
```

### 9. 封装串行promise

```js
function syncPromise(promises, callBacks) {
    let length = promises.length;
    function recur(promises, index) {
        if (index >= length) return
        Promise.resolve(promises[index]()).then((res) => {
            callBacks[index](res);
            recur(promises, ++index);
        }, err => {
            console.log(`err: ${err}`);
            return
        })
    }
    recur(promises, 0)
}

// test
let p1 = () => new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("one");
    }, 1000);
});
let p2 = () => new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve("two");
    }, 1000);
});

let p3 = () => "I am a string";

let callBack1 = (res) => {
    console.log(`callBack1 get data :${res}`);
}

let callBack2 = (res) => {
    console.log(`callBack2 get data :${res}`);
}

let callBack3 = (res) => {
    console.log(`callBack3 get data :${res}`);
}

let promiseList = [p1, p2, p3];
let callBackList = [callBack1, callBack2, callBack3];
syncPromise(promiseList, callBackList)
// callBack1 get data :one
// callBack2 get data :two
// callBack3 get data :I am a string
```

### 10. 控制并发请求

> 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回掉函数。发请求的函数可以直接使用 fetch 即可

```js

const urls = Array.from({ length: 6 }, (v, k) => k);

const fetch = function (idx) {
    return new Promise(resolve => {
        console.log(`start request ${idx}`);
        const timeout = parseInt(Math.random() * 1e4);
        setTimeout(() => {
            console.log(`end request ${idx}`);
            resolve(idx)
        }, timeout)
    })
};

function handleFetchQueue(urls, max, callback) {
    const results = []; // 结果集
    let count = 0; // 当前并发数
    function request() {
        while(count < max){
            count++;
            console.log('start 当前并发数为: ' + count);
            fetch(urls.shift()).then((res) => {
                results.push(res);
                count--;
                console.log('end 当前并发数为: ' + count);
                if (urls.length) { // 当有url时，继续请求
                    request();
                } else if (count === 0) { // 当并发数为0时，执行回调函数
                    callback(results)
                }
            })
        }
    }
    request()
}


const max = 2;

const callback = (results) => {
    console.log(`run callback,results:${results}`);
};

handleFetchQueue(urls, max, callback);
```

### 11. 模拟new实现

如果构造函数含有 `return` 语句，那么规则如下：

- 如果 `return` 返回的是一个对象，则返回这个对象，而不是 `this`。
- 如果 `return` 返回的是一个原始类型，则忽略，`null`或`undefined`也属于原始类型

```js
function myNew(target, ...args) {
    let obj = Object.create(target.prototype);
    let res = target.apply(obj, args);
    return res instanceof Object ? res : obj;
}

function test(num) {
    this.a = num;
    return {}
}
let b = myNew(test, 9)
console.log(b) // {}
```

### 12. 数组去重

```js
Array.prototype.uniq = function () {
    var hasNaN = false;
    for (var i = 0; i < this.length; i++) {
        // 通过与自身对比，排除NaN
        if (this[i] !== this[i]) hasNaN = true;
        for (var j = i + 1; j < this.length;) {
            if (this[i] === this[j] || (hasNaN && this[j] !== this[j])) {
                this.splice(j, 1);
            } else {
                j++;
            }
        }
    }
    return this;
}

console.log([false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq())
//输出 [ false, true, undefined, null, NaN, 0, 1, {}, {}, 'a' ]
```

### 13. 时间格式化输出

```
格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014
yy: 年份，14
MM: 月份，补满两位，09
M: 月份, 9
dd: 日期，补满两位，05
d: 日期, 5
HH: 24制小时，补满两位，13
H: 24制小时，13
hh: 12制小时，补满两位，01
h: 12制小时，1
mm: 分钟，补满两位，14
m: 分钟，14
ss: 秒，补满两位，20
s: 秒，20
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个，本 demo 结果为 五
```

```js
function formatDate(t, str) {
    var obj = {
        yyyy: t.getFullYear(),
        yy: ("" + t.getFullYear()).slice(-2),
        // 注意该函数返回的月份的范围是[0,11]，因此要加1
        M: t.getMonth() + 1,
        // 如果要始终输出两位，则先在前面补0再截取后两位
        MM: ("0" + (t.getMonth() + 1)).slice(-2),
        // getDate表示这天是第几号，而getDay表示星期几
        d: t.getDate(),
        dd: ("0" + t.getDate()).slice(-2),
        H: t.getHours(),
        HH: ("0" + t.getHours()).slice(-2),
        h: t.getHours() % 12,
        hh: ("0" + t.getHours() % 12).slice(-2),
        m: t.getMinutes(),
        mm: ("0" + t.getMinutes()).slice(-2),
        s: t.getSeconds(),
        ss: ("0" + t.getSeconds()).slice(-2),
        w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()]
    };
    return str.replace(/[a-zA-Z]+/g, function ($1) { return obj[$1] });
}

console.log(formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w'))
// 2014-09-05 13:14:20 星期五
```

### 14. 颜色字符串转换

```
将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
1. rgb 中每个 , 后面的空格数量不固定
2. 十六进制表达式使用六位小写字母
3. 如果输入不符合 rgb 格式，返回原始输入
```

```js
function rgb2hex(sRGB) {
   return sRGB.replace(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/, function(a, r, g, b){
       return '#' + hex(r) + hex(g) + hex(b);
   });
}
function hex(n){
    return n < 16 ? '0' + (+n).toString(16) : (+n).toString(16);
}
```

### 15. 乘法精度

 求 a 和 b 相乘的值，a 和 b 可能是小数，需要注意结果的精度问题

> 思路

先将小数化为整数，相乘后将结果除以相应的倍数

```js
function multiply(a, b) {
    a = a.toString();
    b = b.toString();
    let aLen = bLen = 0;
    if (a.includes(".")) aLen = a.length - a.indexOf(".") - 1;
    if (b.includes(".")) bLen = b.length - b.indexOf(".") - 1;
    return (a * Math.pow(10, aLen)) * (b * Math.pow(10, bLen)) / Math.pow(10, aLen + bLen);
}
```

### 16. 封装个可以检测所有数据类型的函数

```js
function testType(input) {
    // typeof返回以下值：
    // undefined boolean string number object function    
    // 其中由于历史原因，typeof input 为 object
    if (input === null) return null;
    let type = typeof input
    if (type != 'object') return type;
    return Object.prototype.toString.call(input);
}

console.log(testType(new String("a"))); //[object String]
console.log(testType("a")); //string
```

### 17. 数组扁平化

```js
function flatten(arr) {
    return arr.reduce((result, item)=> {
        return result.concat(Array.isArray(item) ? flatten(item) : item);
    }, []);
}

console.log(flatten([1, 2, [3, 4, [5, { a: 1 }, [6]]]])); // [ 1, 2, 3, 4, 5, { a: 1 }, 6 ]
```

### 18 . 使用Promise每隔一秒打印数组元素

```js
function print (arr) {
  function recur (count) {
    if (count < arr.length) {
      let counter = new Promise(resolve => {
        setTimeout(() => {
          resolve(arr[count])
        }, 1000)
      })

      counter.then((res) => {
        console.log(res)
        recur(++count)
      })
    }
  }
  recur(0)
}

let arr = [1, 5, 6, 8, 5, 4]
print(arr)
```

### 19. 实现异步任务调度器

```js
/**
 * @description js实现异步任务调度器
 * 一般用三个参数控制:最大任务数,后续等待的任务队列,正在等待的任务队列数量
 */
class Scheduler {
  constructor(maxNum) {
    this.max = maxNum // 最大任务数
    this.waitList = [] // 后续等待的任务队列
    this.count = 0 // 正在等待的任务队列数量
  }

  async add (promiseCreator) {
    if (this.count >= this.max) {
      // 执行then或resolve时才放行
      await new Promise(resolve => {
        this.waitList.push(resolve)
      })
    }
    this.count++
    let result = await promiseCreator()
    this.count--
    // 若等待队列有值则释放
    if (this.waitList.length > 0) {
      // 执行resolve
      // 这里一定是shift不能是pop,否则执行顺序会不一样
      this.waitList.shift()()
    }
    return result
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// log: 2 3 1 4
```

### 20. 异步链式调用

```js
class LazyManClass {
  constructor(name) {
    this.task = []
    let fn = () => {
      console.log(`Hi! This is ${name}!`)
      this.next()
    }
    this.task.push(fn)
    // 这步是关键,将所有任务推进队列再执行
    setTimeout(() => {
      this.next()
    })
  }

  next () {
    let fn = this.task.shift()
    fn && fn()
  }

  eat (food) {
    let fn = () => {
      console.log(`Eat ${food}~`)
      this.next()
    }
    this.task.push(fn)
    return this
  }

  sleep (time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.task.push(fn)
    return this
  }

  sleepFirst (time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.task.unshift(fn)
    return this
  }
}

function LazyMan (str) {
  return new LazyManClass(str)
}

LazyMan('Hank').sleep(10).eat('dinner')
// 输出
// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~
LazyMan('Hank').eat('dinner').eat('supper')
// 输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
LazyMan('Hank').sleepFirst(5).eat('supper')
// 输出
// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
```

### 21. 实现一个foo函数, 返回自身被调用的次数

```js
// 实现一个foo函数, 返回自身被调用的次数 可以这么使用:
a = foo();
b = foo();
c = foo();
// 此时 a 的值是1;b的值是2;c的值是3;
foo.reset();
d = foo(); // d的值是1, 说明foo重新开始计数;
```

```js
// 方法一 利用静态属性
function foo () {
  foo.res++
  return foo.res
}

foo.res = 0
foo.reset = function () {
  foo.res = 0
}

// 方法二 利用闭包
const foo = (function () {
  let res = 1
  function add () {
    return res++
  }
  add.reset = function () {
    res = 1
  }
  return add
})()

let a = foo()
let b = foo()
let c = foo()
console.log(c)
foo.reset()
let d = foo()
console.log(d)
```

### 22. 手写async await

思路:  

async await 本质上是promise和generate的语法糖,递归调用generate.next即可实现

```js

// 异步promise函数
function promiseFn (msg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg)
      resolve(msg)
    }, 1000)
  })
}

// 使用generator语法模拟async await 
function* generatorFn () {
  const data1 = yield promiseFn('msg111');
  console.log(data1, '======');
  const data2 = yield promiseFn('msg222');
  console.log(data2, '======');
  const data3 = yield promiseFn('msg333');
  console.log(data3, '======');
}

// 让generator能自动执行下一步
function asyncFn (generatorFn) {
  return function () {
    const gen = generatorFn();
    return new Promise((resolve, reject) => {
      // 递归函数
      function step (key, arg) {
        let res;
        try {
          // 这步是关键，执行next方法才会执行yield
          // 这个res 是立即返回还是延迟返回？ ==>立即返回，但res.value是一个promise，状态是pending
          // 第一次执行到这,arg为undefined,执行field右边代码,
          // 第二次执行到这,arg有值了(上一次的value),把这个arg的值赋值给第一个field左边的变量,然后执行第二个field右边代码
          res = gen[key](arg);
          console.log('res:', res)
        } catch (err) {
          return reject(err)
        }
        // value是什么？ ==>这里返回的是一个promise,实际上就是promiseFn('msg111')的返回值
        const { value, done } = res;
        if (done) {
          return resolve(value)
        } else {
          // 如何做到串行? ==> value是一个promise,这里会等value的resolve执行后才会执行下一个step
          return Promise.resolve(value).then((val) => step('next', val), (err) => step('throw', err))
        }
      }
      step('next')
    })
  }
}

const run = asyncFn(generatorFn);
run();

// 输出
/**
res: { value: Promise { <pending> }, done: false }
=====================1s后输出======================
msg111
msg111 ======
res: { value: Promise { <pending> }, done: false }
=====================1s后输出======================
msg222
msg222 ======
res: { value: Promise { <pending> }, done: false }
=====================1s后输出======================
msg333
msg333 ======
res: { value: undefined, done: true }
*/

```



## promise

### 易错点

```js
setTimeout(function () {
  console.log(1);
}, 0);
new Promise(function executor (resolve,reject) {
  console.log(2);
  // 若这里加上下面这句,也会执行resolve(),但由于status不是pendding,所以resolve会直接退出
  // reject()
  for (var i = 0; i < 10000; i++) {
    // resolve执行了并不会立即返回,它只是设置了promise对象的状态以及保存relove内的参数,所以console.log(3)也会执行
    i === 9999 && resolve();
  }
  console.log(3);
}).then(function () {
  console.log(4);
});
console.log(5);
// output: 2 3 5 4 1
```

### then的第二个参数与catch的区别

 catch只是一个语法糖而己 还是通过then 来处理的，如下：

```js
Promise.prototype.catch = function(fn){
    return this.then(null,fn);
}
```

- 一般then设置了第二参数，则catch就没用了，二者取其一
- then的第一参数执行了，且发生错误，则只有catch能捕获

```js
let promise = new Promise((resolve, rejected) => {
    throw new Error('err1');
});

// Error: err1===>then2
promise.then(res => {
}, err => console.log(err + "===>then2")).catch(err1 => {
    console.log(err1 + "===>catch");
});

// Error: err1===>catch
promise.then(res => {
}).catch(err1 => {
    console.log(err1 + "===>catch");
});

promise = new Promise((resolve, rejected) => {
    resolve(1)
    throw new Error('err1');
});

// Error: err2===>catch
promise.then(res => {
    throw new Error('err2');
}, err => console.log(err + "===>then2")).catch(err1 => {
    console.log(err1 + "===>catch");
});
```



## 正则相关

### 断言

test(?=/d) : test后面是数字

test(?!/d) : test后面不是数字

(?<=/d)test : test前面是数字

(?<!/d)test : test前面不是数字

### 补充知识点

- `[.]`里面的`.`可以不用加`\`转义

- 利用()进行分组，使用斜杠加数字表示引用，\1就是引用第一个分组

`/([a-zA-Z])\1/g.test('rattler')`此例检查是否含有连续重复的字母

注意`/[a-zA-Z]{2，}/g.test('rattler')`并不能检测是否含有重复字母，只能说明含有两个以上连续字母

- 在括号内使用?:表示不捕获，如

  ```js
  # whistle规则
  /.*(?:com|net)\/(.*)/ http://localhost:8265/$1 excludeFilter:///api
  // $1表示第二个括号的值，如果去掉?:，则表示第一个括号的值
  ```

### 常用正则

- 手机号

` /^1[3|4|5|7|8]\d{9}$/ `

- 邮箱

`  /^[A-Za-z0-9._%-]+@([A-Za-z0-9-_]+\.)+[A-Za-z]{2,4}$/ `

简化：`  /^[\w.%-]+@([\w-]+\.)+[A-Za-z]{2,4}$/ `

- 用户名

4到16位（字母，数字，下划线，减号）
` /^[a-zA-Z0-9_-]{4,16}$/`

- 密码强度

最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符

`/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/`

- 身份证

简单检验18位

`/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/`

精确校验可以通过一系列校验算法计算得到

- url

`/^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/`



## for..in 和 for...of

- for...in能遍历对象的所有可枚举属性的Key，包括原型链上的属性

- for..of能遍历所有可迭代的对象的value，在普通对象使用时会报错，可迭代map,set,arguments,字符串，类数组，dom集合等等,推荐用for...of



## 模块化

### commonJS

CommonJS 模块规范一般用于Node 应用，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。特点：

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。
- 必须等require中的模块加载完成才能运行后面的代码

> 例子

example.js

```js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。注意，不能直接将exports变量指向一个值，因为这样等于切断了`exports`与`module.exports`的联系。所以上面代码等价于

```js
var x = 5;
var addX = function (value) {
  return value + x;
};
exports.x = x;
exports.addX = addX;
```

main.js

```js
var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6
```

Node内部提供一个`Module`构建函数。所有模块都是`Module`的实例。

每个模块内部，都有一个`module`对象，代表当前模块。它有以下属性。

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
- `module.filename` 模块的文件名，带有绝对路径。
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
- `module.parent` 返回一个对象，表示调用该模块的模块。
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
- `module.exports` 表示模块对外输出的值。

### AMD 规范

相比于commonJs的同步加载，AMD采用异步加载，更适合浏览器环境

模块定义

```js
// 模块定义
define(id?: String, dependencies?: String[], factory: Function|Object);
// 通过return方式导出
define(['GameBg', 'GrassLand'], function (GameBg, GrassLand) {
    var Bird = function (idName) {
       // ...
    };
    return Bird;
});
```

模块引用

```js
// 模块引用
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
// 模块异步加载后执行的回调函数
});
```

require.js是AMD规范的具体实现

看下例子：

index.html

```html
<script src="js/require.js" data-main="js/main"></script>
```

data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

math.js

```js
define(function (){
    var add = function (x,y){
        return x+y;
    };
    return {
        add: add
    };
});
```

main.js

```js
require(['math'], function (math){
　　　　alert(math.add(1,1));
});
```

如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

```js
define(['myLib'], function(myLib){
    function foo(){
        myLib.doSomething();
    }
    return {
        foo : foo
    };
});
```



### CMD 规范

CMD规范由国内(阿里)诞生，借鉴了Commonjs的规范与AMD规范，在两者基础上做了改进。特点：

- define定义模块、require加载模块、exports暴露变量;
- 不同于AMD的依赖前置，CMD推崇依赖就近(需要的时候再加载);
- 推崇api功能单一，一个模块干一件事。

SeaJs是CMD规范的实现，跟RequireJs类似，CMD也是SeaJs推广过程中诞生的规范。CMD借鉴了很多AMD和Commonjs优点，同样SeaJs也对AMD和Commonjs做出了很多兼容。seajs的API和node的API非常类似。

[官网地址](https://github.com/seajs/seajs/)

模块定义

```js
define(function(require,exports,module){
	// require参数是一个方法，接收的参数为模块标识，其实就是需要加载模块的相对路径，作用就是加载其他模块。
    var a = require('./a');
    a.out();//假设模块a有out方法。
    // 直接使用require加载属于是同步加载，require提供了async方法来在模块内部进行也不加载模块，并在加载完成以后执行指定的回调函数。
    require.async('./a',function(a){
        a.doSomething()
    })
    require.async(['./c','./b'],function(c,b){
        c.doSomething()
        b.doSomething()
    })
    // exports是一个用来向外界提供模块接口的对象
    exports.name = 10;
    exports.out = function(){
        console.log("输出内容")
    }
    // 当然导出模块除了exports还可以直接使用return的方式
    // exports 仅仅是 module.exports 的一个引用
    // 这里还可以用module这个参数导出
    module.exports = {
        name:10,
        out:function(){
            console.log("输出内容")
        }
    }
})
```

模块引用

```js
// 加载一个模块
seajs.use('./a');

// 加载一个模块，在加载完成时，执行回调
seajs.use('./a', function(a) {
  a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
seajs.use(['./a', './b'], function(a, b) {
  a.doSomething();
  b.doSomething();
});
```



### ES6 模块规范

ES6规范中终于将模块化纳入JavaScript标准，从此JS模块化被官方扶正，也是未来JS的标准，是浏览器和服务器通用的模块解决方案。ES6中的模块化在Commonjs的基础上有所不同，增加了关键字import、export、default、as、from，而不是全局对象。二者有两点主要的区别：

- CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用;
- CommonJS模块是运行时加载，ES6模块是编译时输出接口。

下面来看具体用法：

- export

```js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export { firstName, lastName, year };
```

```js
export function multiply(x, y) {
  return x * y;
};
```

```js
function v1() { ... }
function v2() { ... }
export {
  // 使用as导出别名
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion // 可以使用两次别名
};
```

```js
// 一个文件只能导出一个default,且不同于导出具名的情况，导出default使用import时不用加{},
export default function () {
  console.log('foo');
}
```

```js
class A {
  constructor () {
    this.n = Math.random()
  }
}
// 这里无论import几次，都是只new一次
export const b = new A()
```



- import

普通情况

```js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

使用别名

```js
import { lastName as surname } from './profile.js';
```

export default的情况

```js
import surname from './profile.js';
```

按需加载

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

动态的模块路径

```javascript
// 根据函数f的返回结果，加载不同的模块。
import(f())
.then(...);
```



## 概念解释

### 高阶函数

高阶函数是指至少满足下列条件之一的函数。

- 函数可以作为参数被传递

- 函数可以作为返回值输出

### 偏函数

当一个函数有多个参数时，且穿进去的某个参数都是一样的，那么我们可以包装一下这个函数，将这个固定的参数先传进去，返回一个function，再调用这个function，将其他剩余的参数传进去



## 编程技巧

### 利用闭包实现缓存

```js
function cached (fn) {
  var cache = Object.create(null); // 创建空对象作为缓存对象
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str)) // 每次执行时缓存对象有值则不需要执行函数方法，没有则执行并缓存起来
  })
}

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

var firstE = capitalize("b-bAb");
var secondF= capitalize("b-bAb"); //调试发现直接使用了hit的值
```

### 利用闭包实现只执行一次

```js
// 这种思路不必要
function once (fn) {
  const called = {}
  const symbol = Symbol(fn)
  called[symbol] = false
  return function () {
    if (!called[symbol]) {
      called[symbol] = true
      fn.apply(this, arguments)
    }
  }
}
// 每次调用once都会创建called实例，因此不用担心called被覆盖的问题
function once (fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

### 检查某属性是否是预设属性

```js
function makeMap (str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

// 这是系统预留属性
const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

console.log(isReservedAttribute('test')) // undefined
console.log(isReservedAttribute('key')) // true
```



## Object.create(null)和{}

> 在Vue和Vuex的源码中，作者都使用了`Object.create(null)`来初始化一个新对象。为什么不用更简洁的`{}`呢？

- `Object.create(null)`创建了一个纯净的对象，没有`__proto__`属性

- `{}`创建的对象含有`__proto__`属性，也就包含了`toString`,`valueOf`等方法

```js
//Demo1:
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

//Demo2:
var a=Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}
```

另一个使用`create(null)`的理由是，在我们使用`for..in`循环的时候会遍历对象原型链上的属性，使用`create(null)`就不必再对属性进行检查了，当然，我们也可以直接使用`Object.keys[]`。



## dom事件相关

### 事件级别

```js
// w3c上没有DOM1级别事件的定义
// 这种写法每种dom节点只能绑定一个处理函数，事件流是冒泡类型
DOM0 dom.onclick=function(){}

// 用addEventListener方法监听的事件基本上是DOM2事件，可以绑定多个处理函数，第三个参数false表示在冒泡阶段处理回调函数，true则表示在捕获阶段处理。为了兼容处理，一般选择冒泡
DOM2 element.addEventListener('click', function(){}, false)

// DOM3级事件是在DOM2级事件的基础上添加很多事件类型。如：load、scroll、blur、focus、dbclick、mouseup、mousewheel、textInput、keydown、keypress、compositionstart、DOMsubtreeModified
DOM3 element.addEventListener('keyup', function(){}, false)
```



### 事件流

 ‘DOM2级事件’规定的事件流包含3个阶段，**事件捕获阶段、处于目标阶段、事件冒泡阶段**。以点击事件为例，执行顺序是先从根节点遍历到目标元素，依次执行监听事件回调函数，称为捕获阶段，然后进入目标阶段，最后回溯，向根节点遍历，执行监听事件回调函数，称为冒泡阶段。



### Event 对象的常见应用

```js
event.preventDefault(); // 阻止默认事件(a标签)
event.stopPropagation(); // 阻止冒泡
event.stoplmmediatePropagation(); //绑定两个事件触发A事件阻止B事件发生
event.currentTarget; //返回绑定事件的元素
event.target; //返回触发事件的元素
```



### 事件委托

事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件

- 好处：给重复的节点添加相同操作，减少 dom 交互，提高性能

- 实现思路：给父组件添加事件，通过事件冒泡，排查元素是否为指定元素，并进行系列操作



## 对象的遍历顺序

- Chrome Opera 中使用 for-in 语句遍历对象属性时会遵循一个规律：
  它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性。
- 其它浏览器则完全按照对象定义的顺序遍历属性。



## 隐式转换

数组中的`toString() `方法可把数组转换为字符串，并返回结果

例如:

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.toString();
// Banana,Orange,Apple,Mango
 const arr = [];
 console.log(arr == "");  // true
```

对象转数字过程中,先执行`valueOf()`,若该方法不存在,则执行`toString()`**(先查找对象本身有没有valueOf ,toString若都没有的话再去查原型链)**,例如:

```js
let arr = []
arr.toString = () => 1;
arr.valueOf = () => 2;
console.log(arr == 1);   // false

let arr2 = []
arr2.toString = () => 1;
console.log(arr2 == 1);   // true
```



## js继承

```js
// 父类
function Parent(name) {
  this.name = name;
  this.showName = function () {
    console.log(this.name);
  }
}
```

### 原型链继承

```js
function Child() {}
Child.prototype = new Parent('staff');
const child = new Child();
child.showName(); // satff
```

#### 缺点

所有子类共用一个原型,即child.\__proto__.\__proto__ =  Parent.prototype

### 构造函数继承

```js
function Child (arg) {
  Parent.call(this, arg)
}
const child = new Child('staff');
child.showName(); // satff
```

#### 缺点

每次new一个子类都相当于new一个父类,再把这个父类的实例付给子类实例,缺点是子类无法连接到父级的原型链

### 组合继承

```js
function Child (arg) {
  Parent.call(this, arg)
}
Child.prototype = new Parent()
const child = new Child('staff');
child.showName(); // satff
```

#### 缺点

每次创建子类都需要调用两次父级函数

### 寄生组合继承

```js
function Child (arg) {
  Parent.call(this, arg)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Parent

const child = new Child('staff');
child.showName(); // satff
```

目前是es5中比较好的方法



## cookie

### 设置cookie

```js
function setCookie(name, value, seconds, domain) {
    seconds = seconds || 0; // seconds有值就直接赋值，没有为0。
    var expires = "";

    if (seconds != 0) { // 设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }

    if (domain != null && domain != undefined && domain != '') {
        domain = ';domain=' + domain;
    } else {
        domain = '';
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/"
            + domain; // 转码并赋值
}
```

### 取得cookie

```js
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';'); // 把cookie分割成组
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]; // 取得字符串
        while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length); // 有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)); // 解码并截取我们要值
        }
    }
    return false;
}
```

### 服务端限制js访问cookie

有两种方法可以确保 `Cookie` 被安全发送，并且不会被意外的参与者或脚本访问：`Secure` 属性和`HttpOnly` 属性.

- 标记为 `Secure` 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端
- JavaScript [`Document.cookie`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) API 无法访问带有 `HttpOnly` 属性的cookie；此类 Cookie 仅作用于服务器

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```



