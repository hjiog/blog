title: ts学习笔记
date: 2021-03-13
tags:
 - ts
categories:
 - 前端



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



## 特殊语法

```ts
// -？ 代表将可选值变成必需的属性
type Required<T> = {
    [P in keyof T]-?: T[P];
};
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

const a: TypeA<Test> = 1 // const a: 1 | 2
const b: TypeB = 1 // const b: 2
const c: TypeC<Test> = 1 // const c: 1
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

Parameters: 获取函数参数的类型
```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

type fn = (a:string)=>void

type test = Parameters<typeof fn>[0] // string
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



## 声明文件

npm 包的声明文件主要有以下几种语法：

- [`export`](https://ts.xcatliu.com/basics/declaration-files.html#export) 导出变量
- [`export namespace`](https://ts.xcatliu.com/basics/declaration-files.html#export-namespace) 导出（含有子属性的）对象
- [`export default`](https://ts.xcatliu.com/basics/declaration-files.html#export-default) ES6 默认导出
- [`export =`](https://ts.xcatliu.com/basics/declaration-files.html#export-1) commonjs 导出模块

declare,global,namespace,module 和三斜线指令的区别与联系？

- declare：声明一个变量，类，函数是全局变量，type和interface默认是全局了，不需要加declare了，如：

```js
// index.d.ts
declare let jQuery: (selector: string) => any;
declare const jQuery: (selector: string) => any;
declare function jQuery(selector: string): any;
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
// interface 前不需要加declare
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}

// 注意：declare对于项目内部来说是全局变量，但如果作为一个对外发布的包来说，需要导出类型
// 但是使用了export或import,index.d.ts就不会被当成一个声明文件，内部使用也需要import 进来
// export {jQuery，AjaxSettings}
```

- global：如果要拓展已存在的全局变量，可以使用该字段，如：

```js
// types/foo/index.d.ts
declare global {
    interface String {
        prependHello(): string;
    }
}

// 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
export {};
```
```js
// src/index.ts
'bar'.prependHello();
```

- namespace 命名空间，为避免全局变量重名，我们可以声明一个命名空间。namespace是一个集合，一个module可以有多个命令空间，如：

```js
// src/jQuery.d.ts

declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```

```js
// src/index.ts

jQuery.ajax('/api/get_something');
```

- module: 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块 

```js
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```

```js
// src/index.ts

import * as moment from 'moment';
import 'moment-plugin';

moment.foo();
```

- 三斜线指令

 在全局变量的声明文件中，是不允许出现 `import`, `export` 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了 ,所以类似于声明文件中的 `import`，它可以用来导入另一个声明文件。在以下几个场景下，我们才需要使用三斜线指令替代 `import`：

- 当我们在**书写**一个全局变量的声明文件时
- 当我们需要**依赖**一个全局变量的声明文件时

```js
// types/jquery-plugin/index.d.ts

/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string;
```

```js
// src/index.ts

foo({});
```



## tsconfig.json文件字段详解

```json
{
  "compileOnSave": false, // 设置保存文件的时候自动编译，但需要编译器支持
  "compilerOptions": {
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息 
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": ["./node_modules/@types/", "./typings"], // 声明文件目录，默认时node_modules/@types，typings为自定义的目录
    "types": [], // 加载的声明文件包，若不指定types，则typeRoots下的所有声明的包都会引进，若指定types,则只会引入指定的包
    "removeComments":true, // 删除注释 
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, // 发送错误时不输出任何文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "strict": true, // 开启所有严格的类型检查
    "alwaysStrict": true, // 在代码中注入'use strict'
    "noImplicitAny": true, // 不允许隐式的any类型
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    },
    "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "listFiles": true// 打印编译的文件(包括引用的声明文件)
  },
  "exclude": ["dist", "node_modules","docs"],
  "extends": "./tsconfig.base.json",
  "files": [
    // 指定编译文件是src目录下的leo.ts文件
    // 默认包含当前目录和子目录下所有 TypeScript 文件
    "scr/leo.ts"
  ],
  "include": [
    // "scr" // 会编译src目录下的所有文件，包括子目录
    // "scr/*" // 只会编译scr一级目录下的文件
    "scr/*/*" // 只会编译scr二级目录下的文件
  ],
    // 在项目开发中，有时候我们为了方便将前端项目和后端node项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置 
  "references": [ // 指定依赖的工程
     {"path": "./common"}
  ]
}

```



## 注释

```js
export interface TooltipProps {
  // 以下用法表示transitionName被弃用
  /** @deprecated Use `motion` instead */
  transitionName?: string;
  /** Config popup motion */
  motion?: TriggerProps['popupMotion'];
}
```







## 疑问

1. ```ts
    // 一下两种写法有何不同？哪种更好？
   type fn = <T extends Function>(callback: T) => void;
   type fn = (callback: Function) => void;
   ```

2. 

## 踩坑
函数参数记得用交叉类型。
```ts
// 定义函数类型
type Action1<T> = ((v:T)=>T)|T
type Action2<T> = ((v:T)=>T)&T

// 联合类型作为函数参数，错误
type wrong<T> =(v:Action1<T>)=>void
// 交叉类型作为函数参数，正确
type correct<T> =(v:Action2<T>)=>void

const action1:wrong<string> = (v)=>{
  /**
   * This expression is not callable.
   * Not all constituents of type 'Action1<string>' are callable.
   * Type 'string' has no call signatures.
   * */
  v('test')
}

const action2:correct<string> = (v)=>{
  /** correct */
  v('test')
}
```


setState 如何做到只更新部分值？
```ts
// 1. 错误的写法
export type SetState2<T extends object, K1 extends keyof T = keyof T> =(partial:((state: T) => Pick<T,K1>))=>void

const setState2:SetState2<Test> = (partial)=>{
  console.log(partial)
}

/**
 * Property 'inc' is missing in type '{ count: number; }' but required in type 'Pick<Test, keyof Test>'.
 * 原因是类型没有写完整，但是 setState 又需要可以更新部分字段怎么办呢？
*/
setState2(state=>({
  count:1,
}))


// 2. 正确的写法
export type SetState1<T extends object> = {
  <
    K1 extends keyof T,
  >(
    partial:((state: T) => Pick<T,K1>)
  ): void
}

const setState1:SetState1<Test> = (partial)=>{
  console.log(partial)
}

setState1(state=>({
  count:1,
}))

/**
 * 理解
 * K1 仅在运行时起作用，目的是约束并反射参数的类型，如 partial，注意只能反射参数类型，对返回值的类型是不能反射的
 * 若需要对返回值约束要用到 T，看下下面的例子：
 */

 export type SetState1<T extends object> = {
  <
    K1 extends keyof T,
    K2 extends number,
    K3 extends object,
  >(
    // 约束 partial 为 T 的子集，同时在调用实际的函数时，K1 也会反射出实际的 key
    partial:((state: T) => Pick<T,K1>),
    // 可再次使用 K1
    partialCopy:Pick<T,K1>,
    // 约束 count 为数字类型，同时在调用实际的函数时，K2 也会反射出实际的数字
    count:K2,
    // 约束 obj 为 object 类型，同时在调用实际的函数时，K3 也会反射出实际的对象
    obj:K3
    // 下面返回值用了 K3 是错误的，使用时会 K3 并不会自动和实际返回值类型绑定,应该用 T
  ): K3
}```