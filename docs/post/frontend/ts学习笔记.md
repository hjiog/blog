---
title: ts学习笔记
date: 2021-03-13
tags:
 - ts
categories:
 - 前端
---



## 类型兼容

参数不同

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK 相当于原本是y类型的函数，调用时使用了x类型，那么多传一个额外的参数是没问题的
x = y; // Error 相当于原本是x类型的函数，调用时使用了y类型，那么就少了一个参数，所以报错
```

返回值不同

```ts
let x = () => ({name: 'Alice'});
let y = () => ({name: 'Alice', location: 'Seattle'});

x = y; // OK
y = x; // Error, because x() lacks a location property
```



## 常用关键字

### extends

1. 用于类型的继承

```ts
interface Person {
    name: string;
    age: number;
}

interface Player extends Person {
    item: 'ball' | 'swing';
}
```

2. 判断是否是能赋值给另一个类型

```ts
// 如果 T 可以满足类型 Person 则返回 Person 类型，否则为 T 类型
type IsPerson<T> = T extends Person ? Person : T;
```

### infer

需要和extends一起使用，用于推断一个变量的类型

```ts
type ReturnType<T extends (...args: any[]) => any >
    = T extends (...args: any[]) => infer R ? R : any;
```

### typeof

```ts
const data = {
  value: 123,
  text: 'text',
  subData: {
    value: false
  }
};

type Data = typeof data;
```

### keyof

```ts
interface Person {
    name: string;
    age: number;
    phoneNum: number;
}

type PersonProperty = keyof Person;
//等价于 type PersonProperty = "name" | "age" | "phoneNum"
```

### in

```ts
enum Letter {
    A,
    B,
    C,
}
type LetterMap = {
    [key in Letter]: string;
}
```

### is

更好地推断类型

```ts
function isString(value: any): value is string {
    return typeof value === 'string';
}

function doSometing(value: string | number) {
    if (isString(value)) {
        // 在这里TS 可以识别这个分支中 value 是 string 类型的参数（这就叫类型保护）
        // 如果isString返回值不定义为value is string而是boolen，
        // 那么value这里value仍然推断为string|number
    } else {
    }
}

```

### 关于extends和infer的一些奇淫技巧

#### 前置知识

1. 在条件类型 `T extends U ? X : Y` 中，当 `T` 是 `A | B` 时，会拆分成 `A extends U ? X : Y | B extends U ? X : Y`；如下：

```ts
type Test = string | number
type TypeA<T> = T extends number ? 1 : 2
// 注意下面TypeB的不同
type TypeB = Test extends number ? 1 : 2
type TypeC<T> = number extends T ? 1 : 2

const a: TypeA<Test> = 1 // const aa: 1 | 2
const b: TypeB = 1 // const bb: 2
const c: TypeC<Test> = 1 // const cc: 1
```

2. 同一类型变量的多个候选类型将会被推断为交叉类型

```ts
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
```

#### 实战

1. **tuple** 转 **union** ，如：`[string, number]` ==> `string | number`

```ts
type tuple = [string, number]
// 法1
type tupleToUnion<T> = T extends Array<infer P> ? P : never
const resType: tupleToUnion<tuple> = 0

// 法2
type tupleToUnion = tuple[number]
const resType: tupleToUnion = 0
```

2. **union** 转 **intersection**，如：`string | number` ==> `string & number`

```ts
type union = { a: string } | { b: number }

type unionToIntersection<T> =
  (T extends any ? (arg: T) => void : never) extends (arg: infer P) => void ? P : never

const test: unionToIntersection<union>
```

3. **union** 转 **tuple**,如： `string | number`==> `[string,number]`

```ts
type union = string | number

type unionToFunction<T> =
  (T extends any ? (arg1: (arg2: T) => void) => void : never) extends
  (arg: infer P) => void ? P : never

type functionToTuple<T> = T extends {
  (x: infer a): void
  (x: infer b): void
} ? [a, b] : never

const test: functionToTuple<unionToFunction<union>>
```



## 常用的ts工具函数

record: 适用于key的类型不同而value类型相同的场景

```ts
type Record<T extends string | number | symbol, P> = {
  [key in T]: P
}
type test = Record<'a' | 'b', boolean>;
// 等价于
type test = {
  a: boolean;
  b: boolean;
}
```

Partial：将所有key设置为可选的

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
type test = Partials<{ a: number }>
// 等价于
type test = {
   a?: number | undefined;
}
```

Readonly：将所有的key设置为只读的

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type test = Readonly<{ a: number }>
// 等价于
type test = {
  readonly a: number;
}
```

Pick：提取object中的某些key

```ts
type Pick<T, P extends keyof T> = {
  [K in P]: T[K]
}

type test = Pick<{ a: number, b: number }, 'a'>
// 等价于
type test = {
  a: number;
}
```

Omit：与Pick相反，提取范围外的key

```ts
type Exclude<T, U> = T extends U ? never : T

type Omit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P]
}

type test = Omit<{ a: number, b: number, c: boolean }, 'b'>
// 等价于
type test = {
  a: number;
  c: boolean;
}
```

Requrired：将属性设置为必须项

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}

type test = Required<{ a?: number }>
// 等价于
type test = {
  a: number;
}
```



## 常见的需求

1. 提取一个object上的key

```ts

type obj = {
  a: string;
  b: number;
  c: boolean
}

type keyUnion<T> = keyof T
type valueUnion<T> = T[keyof T]

const key: keyUnion<obj> // const key: "a" | "b" | "c"
const value: valueUnion<obj> // const value: string | number | boolean
```

