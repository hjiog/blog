---
title: css相关
date: 2020-07-16
tags:
 - css
categories:
 - 前端
---

## line-height相关

看个例子：

``` html
<div style="line-height:200%;font-size:32px"> 200%*32 = 64
    <p style="font-size:24px;">行间距</p> // p行高为64px
</div>
```

``` html
<div style="line-height:2;font-size:32px">
    <p style="font-size:24px;">行间距</p> // 2*24 行高为48px
</div>
```

总结：百分比是以当前设置了line-height的元素的font-size属性为准，其所有子元素不管font-size设置了何值，line-height都是固定的，而数字则根据每个子元素font-size的不同而动态计算line-height。

**Q: 为啥行高line-height与文字高度height设为一样大, 文字就垂直居中了?**

line-height(行高)=font-size(字符大小)+word-spasing(上下行间距)

例如：行高设置为100px时，若字符大小为30px，容器高度也是100px的话，那上下行间距就分别为35px（间距=（行高-字体高度）/2），注意任何时候字符上行间距和下行间距的大小是相同的，当行高大于容器高度时，会以上间距为准，因此字体偏下显示，反则向上偏移。而行高等于容器高度时就正好能实现居中。


## vertical-align相关

<div>
<iframe height="265" style="width: 100%; " scrolling="no" title="QWyZJLa" src="https://codepen.io/hjiog/embed/QWyZJLa?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/QWyZJLa'>QWyZJLa</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>

> 造成这种现象的罪魁祸首是vertical-align，其默认值是baseline

解决方法：

* vertical-align对块状水平的元素无感，而img是行内元素，加个display:block可消除间隙

* 设置img的vertical-align为bottom

## 水平和垂直居中

### 水平居中

* 对于块级元素：设置了width之后，可用margin:auto实现该块级元素水平居中，注意margin:auto只有当width设置了具体的值后才能计算auto
* 对于行内元素：可用text-align: center实现该行内元素中的文字水平居中
* 对于图片：图片本身是行内块级元素，设置其为块级元素，然后设置宽度，margin:auto即可

### 垂直居中

* 使用padding，此法父级元素的高度随子元素的高度而变化
* 使用line-height，注意点如下：
  + 父级元素高度要和line-height保持一致
  + 当文本有多行时，行距就不是我们想要的效果，此时可以设置文本为行内块级元素，这样这段文字就作为一个整体进行居中，然后设置vertical-align: middle，再设置一下每行文字本身的line-height，三种操作缺一不可，下面例子演示了加上这三句话和不加的区别

<div>
<iframe height="265" style="width: 100%; " scrolling="no" title="yLeRQPG" src="https://codepen.io/hjiog/embed/yLeRQPG?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/yLeRQPG'>yLeRQPG</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>

### 综合，实现水平和垂直居中

* `text-align` + `padding`
* `text-align` + `line-height`
* 使用 ` position` 和 `transform`

``` html
<div class="center">
    <p>我是水平和垂直居中的。</p>
</div>
<style>
    .center {
        height: 200px;
        position: relative;
        border: 3px solid green;
    }

    .center p {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
```

* 使用flex布局

``` html
<div class="center">
    <p>我是水平和垂直居中的。</p>
</div>
<style>
    .center {
        height: 200px;
        border: 3px solid green;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
```

* 用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中

## css选择器

* div>p： 选择 `<div>` 下 **直接** 子节点是 ` <p> ` 的元素（只能影响一层，更下的其他层无法影响）
* div  p： 选择 `<div>` 元素所有的 ` <p> ` 元素
* div+p： 选择下一个**紧接**着 `<div>` 元素之后的 `<p>` 元素，p是div的兄弟节点

```css
 /**利用兄弟选择器,可忽略第一个节点,设置border-top,从而实现最后一个元素不加边框的效果*/
.border + .border {
    border-top: 1px solid rgba(0, 0, 0, 0.125);
 }
/**注意:这里"+"前后的选择器是一样的,所以可以跳过第一个节点,若换成.test + .border,则会只匹配test后的第一个border兄弟节点,若想匹配所有test后的兄弟节点,可以使用.test ~ .border */
```

* div~p： 选择所有 `<div>` 元素之后的 `<p>` 元素，p是div的兄弟节点
* [:link](https://www.runoob.com/cssref/sel-link.html) : 选择所有未访问链接
* [:visited](https://www.runoob.com/cssref/sel-visited.html) ： 选择所有访问过的链接
* [:nth-child(*n*)](https://www.runoob.com/cssref/sel-nth-child.html)：选择每个元素是其父级的第n个子元素



## 行内元素

1. 不能设置width和height；
2. 不能设置margin-top , margin-bottom
3. 可以设置margin-left , margin-right
4. 可以设置任意方向的padding

## css优先级

优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

- ID 选择器， 如 #id{}
- 类选择器， 如 .class{}
- 属性选择器， 如 a[href="segmentfault.com"]{}
- 伪类选择器， 如 :hover{}
- 伪元素选择器， 如 ::before{}
- 标签选择器， 如 span{}
- 通配选择器， 如 *{}



## z-index失效

### 无效的情况 :

* 父标签 position属性为relative；
* 问题标签无position属性（不包括static）；
* 问题标签含有浮动(float)属性。
* 父元素无论如何都不能盖住子元素

### 解决办法：

* position:relative改为position:absolute；

* 浮动元素添加position属性（如relative，absolute等）；

* 去除浮动。

## margin:0 auto失效

例如直接对图片使用会失效

### 不同场景下生效条件如下：

* 块级元素：给定要居中的块级元素的宽度。



* 行内元素：①设置display:block；②给定要居中的行内元素的宽度。（行内元素设置成块级元素后可以对其宽高进行设置）



* 行内块元素：设置display:block。（如input、button、img等元素，自带宽度可以不用设置其宽度）

**注:**

* 可以通过对块级元素设置 text-align：center；的方式来实现内联元素（如文本、图片）居中

* margin:0 auto; 可以使盒子居中，text-align:center; 可以使此盒子内的内联元素居中，故有时需要两者结合使用才能使得盒子及其中文本一起居中。

## css3动态计算宽度

``` css
width: calc(100% - 10px);
```

## 绘制三角形  [参考链接](https://www.jianshu.com/p/9a463d50e441)

> 需求：在一个div上绘制一个三角形

``` html
<div class="triangle">在我的左上方绘制三角形</div>
```

``` css
.triangle {
    position: relative;
}

.triangle::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0;
    height: 0;
    border: 15px solid;
    border-color: #269fd6 transparent transparent #269fd6;
}
```

## 清除浮动

浮动是指父元素的高度设为auto，而子元素设置了float属性，导致子元素脱离父元素且父元素的高度没有被子元素给撑起，导致布局错乱。

解决方法：

法1：在最后一个子元素后添加一个div，设置其style为clear:both;

法2： 结合 ::after 伪元素 ，设 ~~最后一个子元素~~ **父元素**的class为last，如下：（其实和法1原理差不多，优点就是不用多写无意义的html代码）**注意： `::after` 默认是行内元素，而clear属性只对块级元素生效，所以要加上 `display: block` **

``` css
.last::after {
    content: "";
    display: block;
    clear: both;
}
```

法3：给父元素设置overflow:auto或overflow:hidden 来触发父元素的BFC( Block Formatting Contexts, 块级格式化上下文 )，从而到达清除浮动的效果

## bfc

下列方式会创建**块格式化上下文**：

- 根元素（`<html>）`
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table`、`table-row`、 `table-row-group`、`table-header-group、`table-footer-group`（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content `或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `flex` 或 `inline-flex `元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 `column-count` 为 `1）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

## 伪类和伪元素

伪类：相当于css选择器，如  :first-child （单冒号）

伪元素：相当于新建一个元素，如 ::after(可以单冒号或双冒号)，::placeholder(只能双冒号)，伪元素规范是用双冒号，但为了兼容，可以用单冒号，另外，before/after伪元素有一个必须的要指定的属性content

## 盒模型

### 1. 概述

盒模型由外边距（margin），边框（border），内边距(padding)，内容（content）四个部分组成。现在浏览器支持的盒模型有两种：标准盒模型和ie盒模型。在css分别可以用box-sizing:content-box和box-sizing:border-box设置。它们的区别主要是with/height的范围不同。以width为例，height可以类比：

* 标准盒模型：width=content
* ie盒模型： width=content+padding+border

### 2. 高度塌陷问题（也称 `margin` 重叠问题 ，只针对上下边界，左右边界不会发生这种现象）

* 当父子元素边框重合时，子元素设置了margin-top属性，父元素会发生高度的塌陷。举个例子：

``` html
<style>
    .parent {
        background: #e7a1c5;
    }

    .child {
        background: #ff6875;
        height: 100px;
        margin-top: 10px;
    }
</style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>
```

此时父元素的高度不是100+10=110px，而是100px，子元素的margin-top也生效了，看起来的效果就像父元素塌陷了一块下去。

* 不同子元素上下边界重复时，间距取两者间最大的数值，而不是上面子元素的margin-bottom+下面子元素的margin-top

**解决方法：**

设置BFC( `Block Formatting Contexts` , 块级格式化上下文 )

触发条件:

* 根元素
* `position: absolute/fixed`
* `display: inline-block / table`
* `float` 元素
* `overflow` !== `visible`
如上面的例子，只需要设置overflow:hidden，即可令父元素的高度为110px







## 三栏布局的3种实现

- 浮动布局

左右结构写在前面，设置两边浮动，中间设置左右的margin，再清除浮动

- flex布局

order用于调整顺序，flex:1用于填充剩余的部分

<div>
<iframe height="465" style="width: 100%;" scrolling="no" title="三栏布局-浮动" src="https://codepen.io/hjiog/embed/LYNZpLj?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/LYNZpLj'>三栏布局-浮动</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>



## 圣杯布局和双比翼布局

### 要求

- header和footer各自占领屏幕所有宽度，高度固定
- 中间的container是一个三栏布局
- 三栏布局两侧宽度固定不变，中间部分自动填充整个区域
- 中间部分的高度是三栏中最高的区域的高度

<div>
<iframe height="265" style="width: 100%;" scrolling="no" title="圣杯布局" src="https://codepen.io/hjiog/embed/bGpeeoJ?height=265&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/bGpeeoJ'>圣杯布局</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>

注意点：这里center放前面，left和right放后面，首先设置container的padding属性后，如何将left和right拉到与center同一行呢？以right举例，先设置`margin-left: -200px`此时right和center已经是同一行了,再通过`right:-200px`将right调到合适的位置；**margin-left设置负值能将元素拉到上一行，而left设置负值只能在当前行偏移**



## flex布局

### 容器属性

#### 总览

- flex-direction

- flex-wrap

- flex-flow

  `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式

- justify-content

- align-items

- align-content

#### justify-content

定义了项目在主轴上的对齐方式。即设置左右对齐的方式

**注: flex 布局一般不用justify-item属性,因为justify-item是设置单个轴的项目的对齐方式,而左右对齐是将所有子项当成一个项进行对齐的**

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png" alt="" title="">

#### align-items

定义项目在交叉轴上如何对齐。即设置上下对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png" alt="" title="">

#### align-content

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。该属性将所有的子项看成一个项目,再调整位置

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png" alt="" title="">

### 项目属性

#### order

数字越小,项目越靠前

#### flex-grow

当有剩余空间时,该属性才生效,默认为0,即有剩余空间也不放大;

当设置的值大于0时,根据剩余空间的大小动态分配每个项目的大小

#### flex-shrink

当没有空间时,该属性才生效,默认为1,即有空间不足时,项目将等比例缩小;

当设置的值为0时,即使空间不足也不缩小

#### flex-basis

设置项目的基础大小,用于计算空间有无剩余;

单位同width一样,可以用"px"或百分比,默认为auto,即基础大小就是项目本来的大小;

若项目是横向排列,则该属性会覆盖width;

若项目是竖直排列,则该属性会覆盖height

#### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。

**flex:1全写**

```css
/* 等价于 */
#app {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;  /*注意这里不是auto*/
}
/* 分别代表了所定义flex盒子的拉伸因子、收缩规则、基础宽度。 */
```

#### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

**注意: 没有justify-self属性 , 因为父级元素不会设置justify-item属性**

 ```css
.item {
   align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
 ```



## 实战技巧

### margin和padding配合实现类似space-between的效果

```html
<div class="father">
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</div>
```

```css
.father{
    margin-left:-10px;
    margin-right:-10px;
}
.child{
    padding-left:10px;
    padding-right:10px;
}
```

### 画一个自适应的正方形

```css
<div class="container">
</div>
<style>
  .container {
    width: 20vw;
    background-color: blue;
    height: 20vw;
  }
</style>
```

```css
<div class="container">
</div>

<style>
  .container {
    width: 20%;
    background-color: blue;
    /*padding,margin取百分比是都是按父级元素的宽度为参考的,注意是父级元素,不是自身的width*/
    padding-top: 20%;/*注意这里和width设置的百分比相等*/
  }
</style>
```

```css
<div class="container">
</div>

<style>
  .container {
    width: 20%;
    background-color: blue;
  }
  .container::after {
    content: "";
    display: block;
    /*padding,margin取百分比是都是按父级元素的宽度为参考的,注意是父级元素,不是自身的width*/
    padding-top: 100%;/*注意这里要设置100%,因为它的父级是container*/
  }
</style>
```

### 实现一个秒针绕一点转动的效果

```css
<style>
  .main {
    width: 2px;
    height: 100px;
    background-color: black;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  @keyframes route {
    from {
      transform: rotateZ(0);
    }
    to {
      /*绕z轴旋转360度*/
      transform: rotateZ(360deg);
    }
  }
  .wrapper {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
    animation: route 60s steps(60);
    animation-iteration-count: infinite;
  }
</style>

<body>
  <div class="wrapper">
    <div class='main'>
    </div>
  </div>
</body>
```

### 画一条0.5px的直线

``` html
<div style="height: 1px;background-color: black;transform: scale(0.5);"></div>
```

### css画各种图形

<div>
<iframe height="465" style="width: 100%; " scrolling="no" title="ZEQmENg" src="https://codepen.io/hjiog/embed/ZEQmENg?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/ZEQmENg'>ZEQmENg</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>

### 四种冒泡提示框

<div>
<iframe height="265" style="width: 100%; " scrolling="no" title="OJMBqqZ" src="https://codepen.io/hjiog/embed/OJMBqqZ?height=265&theme-id=dark&default-tab=html,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/hjiog/pen/OJMBqqZ'>OJMBqqZ</a> by hjio
  (<a href='https://codepen.io/hjiog'>@hjiog</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
</div>


注：如若想实现根据屏幕空间大小来按需使用不同方向的提示框，可用js监听getBoundingClientRect相关参数实现

### 文字超出部分用省略号代替

- 单行文本

```css
<p class="p2">
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
</p>
<style>
  .p2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
```

效果如下:

<p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
</p>

- 多行文本

```css
<div class="wrap">
  <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectus
    atque quos magnam assumenda quod architecto perspiciatis animi.</div>
</div>
<style>
  .wrap {
    /* 设定最大两行 */
    height: 40px;
    line-height: 20px;
    overflow: hidden;
  }

  .text {
    float: right;
    /* 因为宽度为100%,所以一旦左边有东西,就会换行,为了不换行,需要设置左边界为负值 */
    margin-left: -5px;
    width: 100%;
    /* 允许在单词内换行 */
    word-break: break-all;
  }

  /* before是wrap的第一个子元素 */
  .wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: 40px;
  }

  /* after是wrap的最后一个子元素*/
  .wrap::after {
    float: right;
    content: "...";
    /* 设置三个省略号的宽度 */
    width: 2em;
    /*
    使盒子不占位置,当margin-left的负值的绝对值>=自身width时,无论是左浮动还是右浮动,
    该元素都会位于靠左的初始位置,并且会覆盖在其他的浮动元素上
    */
    margin-left: -2em;
    /*
    上面的步骤会使得after伪元素位于左上角,这步会将伪元素挤到下一行,
    而根据.text元素的高度不同有以下两种情况:
    1. text的高度小于before的高度,即不显示省略号,after出现在text下的右下角
    此时再通过相对定位向右移动after,则after不可见,实现隐藏'...'
    2. text的高度大于before的高度,即要显示省略号,after被其他两个元素夹住,
    即出现在before下的右下角,after的左边,
    此时再通过相对定位向右移动after,则after可见,实现显示'...'
    */
    padding-right: 5px;

    /* 移动省略号位置 */
    position: relative;
    left: 100%;
    top: -20px;
    text-align: right;
    /* 增加渐变色背景,掩盖部分字体 */
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  }
</style>
```

效果

<div>
    <div style="height: 40px;line-height: 20px;overflow: hidden;">
  <span style="float: left;width: 5px;height: 40px;"></span>
  <div style="float: right;margin-left: -5px;width: 100%;word-break: break-all;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectu atque quos magnam assumenda quod architecto perspiciatis animi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectu atque quos magnam assumenda quod architecto perspiciatis animi.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectu atque quos magnam assumenda quod architecto perspiciatis animi.</div>
  <span style="float: right; width: 2em;margin-left: -2em;position: relative;left: 100%;top: 20px;padding-right: 5px;text-align: right;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);">...</span>
</div>
</div>
### footer自适应

footer元素，希望页面不够一屏的时候，显示在浏览器的底部，页面超过一屏的时候，显示在页面的底部

- 方法一

利用position定位: 父级使用相对定位,且最小高度设为100% ,这样的话footer使用绝对定位,可以定位到最底部; 当body的高度增大时, 父级高度就慢慢地超过100%, 这样footer就会定位到body的下方

```html
<div id="container">
  <div id="header">header</div>
  <div id="body">body</div>
  <div id="footer">footer</div>
</div>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #container {
    min-height: 100%;
    position: relative;
  }
  #header {
    background: #ff0;
    padding: 10px;
  }
  #body {
    padding-top: 10px;
    padding-bottom: 40px;
  }
  #footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #6cf;
  }
</style>
```

- 方法二

利用flex布局, 父级最小高度设为100% , header和footer高度固定 , body高度自适应

```html
<div id="container">
  <div id="header">header</div>
  <div id="body">
    <div style="height: 100px;">
      body
    </div>
  </div>
  <div id="footer">footer</div>
</div>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #container {
    display: flex;
    min-height: 100%;
    flex-direction: column;
  }

  #header {
    background: #ff0;
    flex: 0 0 20px;
  }

  #body {
    background-color: red;
    flex: 1 1 auto;
  }

  #footer {
    flex: 0 0 20px;
    background: #6cf;
  }
</style>
```

### div模拟input

```html
<h3>原生input</h3>
<span>不支持换行</span>
<input type="text" placeholder="请输入测试数据">
<h3>div模拟input</h3>
<ul>
  <li>支持换行</li>
  <li>支持placeholder</li>
</ul>
<div class="input" contenteditable="true" placeholder="请输入测试数据"></div>

<style>
  .input {
    transition: border-color 0s ease-in-out, box-shadow 0s ease-in-out;
    margin-top: 1px;
    margin-bottom: 1px;
    background-color: rgba(0, 0, 0, 0);
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    display: block;
    width: 200px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    cursor: default;
  }

  /*为空时显示 placeholder*/
  .input:empty::before {
    content: attr(placeholder);
    color: #a9a9a9;
  }

  /*内容不为空清除*/
  .input:not(.input:empty)::before {
    content: none;
  }
</style>
```



## 杂项

* 在什么都没指定的情况下，width可以设置百分比，而height不行
* 垂直方向上的margin和padding设置百分比是相对**父元素**的**`width`**而不是 `height`
* 伪元素默认为行内元素
* 行内元素设置浮动后可以设置width属性

