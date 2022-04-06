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



## 使用useReduce

函数原型

```js
// 其中initialArg是传入就决定的,init的类型是函数,作用是动态生成初始参数
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

例子

```jsx
function init(initialCount) {  return {count: initialCount};}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':      return init(action.payload);    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
    	Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

**什么情况下才需要使用useReduce而不是useState?**

1. useEffect只想执行一次,而又依赖了外部变量时

```jsx
// 当step更新时,useEffect会重新计时,而我们只想useEffect只执行一次
// 若useEffect使用了空依赖[],那么,在useEffect里的step的值将不会被setStep更新,永远都会是初始值
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [step]);

// 使用useReduce可解决以上问题
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```



## 使用react Router

例子

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
```

若想传递上下文



Q: `<Link>` 标签和 `<a>` 标签有什么区别?

> 从最终渲染的 DOM 来看，这两者都是链接，都是 `<a>` 标签，区别是：
> `<Link>` 是 react-router 里实现路由跳转的链接，一般配合 `<Route>` 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，`<Link>` 的“跳转”行为只会触发相匹配的 `<Route>` 对应的页面内容更新，而不会刷新整个页面。
> 而 `<a>` 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）。

先看Link点击事件handleClick部分源码

```js
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
```

Link做了3件事情：

1. 有onclick那就执行onclick
2. click的时候阻止a标签默认事件（这样子点击`<a href="/abc">123</a>`就不会跳转和刷新页面）
3. 再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面



