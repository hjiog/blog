---
title: react 问题记录
date: 2021-8-30
tags:
 - react
categories:
 - 前端

---



## react 箭头函数组件使用泛型

```tsx
type MultiInputType<T, P> = {
  value?: (Record<string, ValueType> | ValueType)[];
  onChange?: (v: (Record<string, ValueType> | ValueType)[]) => void;
};

export const MultiInput = <T, P>({
  value = [],
  onChange,
}: MultiInputType<T, P>) => {
     return (<div>MultiInput</div>);
}
```

> 使用泛型就不要使用React.FC定义类型了

> 如果只有一个参数，则应保留一个逗号，如 const MultiInput = <T, > ...

