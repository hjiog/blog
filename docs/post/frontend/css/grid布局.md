---
title: grid布局
date: 2021-1-17
tags:
 - css
categories:
 - 前端

---

## 容器属性

### 块级元素和行内元素

```css
display:grid;
display:inline-grid;
```

### 设置行和列

数据少时可以这样写，设置3行，3列

```css
grid-template-columns: 50px 50px 50px;
grid-template-rows: 50px 50px 50px;
```

数据多时如下

```css
grid-template-columns: repeat(3, 33.33%);
/**或者重复某个组合也可*/ 
grid-template-columns: repeat(2, 100px 20px 80px);
grid-template-rows: repeat(3, 33.33%);
```

也可以混合写

```css
grid-template-columns: repeat(3, 13.33%) 100px;
grid-template-rows: repeat(3, 13.33%) 100px;
```

如果希望每一行（或每一列）容纳尽可能多的单元格，可用auto-fill

```css
/**连续用100px填充，直到该列满为止*/
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
```

**好用：** 可用fr（fraction 的缩写，意为"片段"）设置按比例大小

```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```

限制大小用**minmax()**

```css
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
```

### 设置间隔

```css
.container {
  row-gap: 20px;
  column-gap: 20px;
}
/**等价于*/
.container {
  grid-gap: 20px 20px;
}
```

### 设置排列顺序

```css
grid-auto-flow: column; /**竖着排*/
grid-auto-flow: row; /**横着排*/
grid-auto-flow: row dense; /**横着排并尽量不留空格*/
```

### 设置排列风格

#### justify-items ， align-items ， place-items 

设置每个格子在自己房间的排列方式，place-items是前两者的总称

#### Justify-content ， align-content ， place-content 

设置整体在父级container容器的排列方式，place-content是前两者的总称

### 设置多出在外面的网格的大小

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-auto-rows: 50px; 
  grid-auto-column: 50px; 
}
/**不设置则用自身的宽高*/
```



## 项目属性

### 设置自身的位置

简写：grid-column

- `grid-column-start`属性：左边框所在的垂直网格线
- `grid-column-end`属性：右边框所在的垂直网格线

简写：grid-row

- `grid-row-start`属性：上边框所在的水平网格线
- `grid-row-end`属性：下边框所在的水平网格线

```css
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}
/**等价于*/
.item-1 {
  grid-column: 2 4;
}
```

还可以用span表示跨越

```css
.item-1 {
  grid-column-start: span 2;
}
```

使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

