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

