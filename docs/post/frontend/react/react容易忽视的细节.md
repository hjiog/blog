---
title: react 容易被忽视的细节
date: 2021-07-12
tags:
 - react
categories:
 - 前端

---



## React.Children api

例1

```jsx
class Text extends React.Component{
    render(){
        return <div>hello,world</div>
    }
}
function WarpComponent(props){
   // 这里的日志显示为长度为4的数组，分别对应三个Text和一个span
    console.log(props.children)
    return props.children
}
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
            <Text/>
            <Text/>
            <Text/>
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

例2

```jsx
class Text extends React.Component{
    render(){
        return <div>hello,world</div>
    }
}
function WarpComponent(props){
   // 这里的日志显示为长度为2的数组，大致是这样，[[Text*3],span]
    console.log(props.children)
    return props.children
}
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
 						{ new Array(3).fill(0).map(()=><Text/>) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```

使用React.children

```jsx
class Text extends React.Component{
    render(){
        return <div>hello,world</div>
    }
}
function WarpComponent(props){
   // 这里的日志还是显示为长度为4的数组，分别对应三个Text和一个span，React.children会将[Text*3]给展开
		const newChildren = React.Children.map(props.children,(item)=>item)
    console.log(newChildren)
    return newChildren
}
function Index(){
    return <div style={{ marginTop:'50px' }} >
        <WarpComponent>
 						{ new Array(3).fill(0).map(()=><Text/>) }
            <span>hello,world</span>
        </WarpComponent>
    </div>
}
```



## 子组件重新渲染问题

### 有两种方式引入子组件：

- 引入未渲染的子组件，放在父组件中渲染

```jsx
// father.jsx
import { useState, useCallback } from 'react'
import Child from './child'

export default function Father() {
  console.log('father change =============')
  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])
  return (
    <div>
      father: {count}
      {/* 渲染子组件 */}
      <Child></Child>
      <button onClick={handleClick}>click</button>
    </div>
  )
}

```

或者

```jsx
// app.jsx
import Father from './components/father';
import Child from './components/child'

export default function App () {
  return <Father children={child}></Father>
}
```

```jsx
// father.jsx
import { useState, useCallback } from 'react'

export default function Father({ children }) {
  console.log('father change =============')
  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])
  return (
    <div>
      father: {count}
      {/* 渲染子组件 */}
      {children()}
      <button onClick={handleClick}>click</button>
    </div>
  )
}

```

1. 这种情况每次父组件的props或state发生变动时，子组件都会重新渲染(即使子组件的props不变，或者父组件压根没有把props传给子组件)，这里有几种优化方式：（只针对子组件）

   - React.memo.  子组件外边包上一层，会浅层比较props的值，不变则不会渲染

   - useMemo  函数式子组件在返回jsx元素时套上一层useMemo，也是浅比较

   - pureComponent. 类声明的子组件可以继承这个，内部会进行浅层比较



- 引入已渲染的子组件

```jsx
// app.jsx
import Father from './components/father';
import Child from './components/child'

export default function App () {
  return <Father>
    {/* 在引入的时候就渲染子组件 */}
    <Child></Child>
  </Father>
}
```

```jsx
// father.jsx
import { useState, useCallback } from 'react'

export default function Father({ children }) {
  console.log('father change =============')
  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    setCount((c) => c + 1)
  }, [])
  return (
    <div>
      father: {count}
      {/* 直接使用，无需再次渲染，即写成children() */}
      {children}
      <button onClick={handleClick}>click</button>
    </div>
  )
}
```

### 启示

- 父组件引入子组件的时候最好是引入已经渲染了的，这样可以提高性能。
- 可以以一个变量为界限，将相关的组件抽离抽离出来，举个例子

```jsx
export default function App() {
  let [color, setColor] = useState('red');
  return (
    <div>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      {/*计算量大的组件*/}
      <ExpensiveTree />
    </div>
  );
}
```

可以改成

```jsx
export default function App() {
  return (
    <>
      <Form />
      {/*计算量大的组件*/}
      <ExpensiveTree />
    </>
  );
}

function Form() {
  let [color, setColor] = useState('red');
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}
```

