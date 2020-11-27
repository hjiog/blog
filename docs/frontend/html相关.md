---
title: html相关
date: 2020-10-11
tags:
 - html
categories:
 - 前端
---

## href , src , rel

### href

Hypertext Reference的缩写，超文本引用，它指向一些网络资源，建立和当前元素或者说是本文档的链接关系。在加载它的时候，不会停止对当前文档的处理，浏览器会继续往下走。常用在a、link等标签。

```html
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css">
```

 如上面所显示的那样，当浏览器加载到link标签时，会识别这是CSS文档，并行下载该CSS文档，但并不会停止对当前页面后续内容的加载。这也是不建议使用@import加载CSS的原因。

<!-- more -->

### src

source的所写，表示的是对资源的引用，它指向的内容会嵌入到当前标签所在的位置。由于src的内容是页面必不可少的一部分，因此浏览器在解析src时会停下来对后续文档的处理，直到src的内容加载完毕。常用在script、img、iframe标签中，我们建议js文件放在HTML文档的最后面。如果js文件放在了head标签中，可以使用window.onload实现js的最后加载。

```html
<img src="img/girl.jpg">
<frame src="top.html">
<iframe src="top.html">
<script src="show.js">
```

 总结：href用于建立当前页面与引用资源之间的关系（链接），而src则会替换当前标签。遇到href，页面会并行加载后续内容；而src则不同，浏览器需要加载完毕src的内容才会继续往下走。

### rel

rel 属性用于指定当前文档与被链接文档的关系。

只有在使用了 href 属性才能使用 rel属性。
