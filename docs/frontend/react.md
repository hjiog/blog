---
title: react 学习笔记
date: 2020-11-19
tags:
 - react
categories:
 - 前端
---



## 概念解释

### 纯函数

 不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果



## 子组件重新渲染问题

- render 函数里放的是props.children，类似下面这种调用

```html
<father>
  <child></child>
</father>
```

当父组件的props或state改变的时候，child组件是不会重新渲染的

- render函数里对子组件进行一层封装，子组件成为父组件的一部分，而不是作为插槽存在，这种情况每次父组件的props或state发生变动时，子组件都会重新渲染(即使子组件的props不变，或者父组件压根没有把props传给子组件)，这里有几种优化方式：（只针对子组件）
  - React.memo.  子组件外边包上一层，会浅层比较props的值，不变则不会渲染
  - useMemo  函数式子组件在返回jsx元素时套上一层useMemo，也是浅比较
  - pureComponent. 类声明的子组件可以继承这个，内部会进行浅层比较
- 对父组件而言，若绑定的事件发生改变时，则需要使用useCallback来包裹回调函数





## redux使用流程

1. createStore，接收一个函数，函数中的参数包括state和action

```js
const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
const store = createStore(themeReducer)
```

2. 组件和store建立连接，用connect，再进行读取和修改

```js
class SwitchColor extends Component {
  handleChangeColor (color) {
    this.props.changeColor(color)
  }
  render() {
    return (
      <div>
        <button style={{color: this.props.themeColor}} onClick={this.handleChangeColor.bind(this, 'blue')}>blue</button>
        <button style={{color: this.props.themeColor}} onClick={this.handleChangeColor.bind(this, 'red')}>red</button>
      </div>
    )
  }
}
// 读取store中的值；
// 将state或其中的某些值印射到使用connect的组件中的props,组件就可以使用this.props.xxx读取
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

// 改变store中的值；
// 将dispatch印射到组件的props中，组件就可以使用this.props.xxx方法来改变store中的值
const mapDispatchToProps = (dispatch) => {
  return {
    changeColor: (color) => {
      dispatch({type: 'CHANGE_COLOR', themeColor: color})
    }
  }
}
SwitchColor = connect(mapStateToProps, mapDispatchToProps)(SwitchColor)

```



## 使用useContext

完整例子

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

1. 创建上下文

   ```jsx
   const ThemeContext = React.createContext(themes.light);
   // 其中createContext 函数接受一个结构体，设定默认值
   ```

2. 传递上下文

   ```jsx
   <ThemeContext.Provider value={themes.dark}>
     <Toolbar />
   </ThemeContext.Provider>
   // 其中 value 是可选的，可覆盖默认值
   ```

3. 引用上下文

   ```js
   const theme = useContext(ThemeContext);
   ```



