---
title: redux 学习笔记
date: 2021-02-17
tags:
 - redux
categories:
 - 前端
---



## 前言

redux经常会用，但经常知其然而不知其所以然，这篇文章较全面地对redux的用法及原理做了一遍深入的梳理。

贴上一篇学习文档https://www.breword.com/reduxjs-redux/docs/

## createStore

**createStore(reducer:Function, preloadedState?:any, enhancer?:Function)**

### 参数

#### reducer

接收两个参数，分别是当前的 state 树和要处理的 [action](https://cn.redux.js.org/docs/Glossary.html#action)，返回新的 [state 树](https://cn.redux.js.org/docs/Glossary.html#state)。

当reducer处理的情况过多时，我们不妨结合combineReducers给它分个类，用法：

combineReducers(reducers:{[state:string]:reducer:Function})，看下简化版源码：

```js
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

```

combineReducers做了以下事情：

1. 将reducers拆分成更细的reducer,每个reducer的返回值作为当前state的key的值
2. 每个小的reducer接受的state参数也是大的state里对应的key的值
3. 调用dispatch时每个reducer都会走一遍，action不符合会把state原样返回

#### preloadedState

 初始时的 state

#### enhancer

对state或action做一些特殊处理，简化代码如下：

```js
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
  }
    
  return enhancer(createStore)(reducer, preloadedState)
}
```

##### 应用场景

官方提供的applyMiddleware包就是一个enhancer函数，可以让我们使用一些中间件来增强createStore函数的功能，如打印日志，异步操作。

- 中间件开发规范

```tsx
type customMiddlewareType = ( store:{ getState:()=>void; dispatch:(action)=>void } ) => next => action => void
```

- 中间件的作用

根据传入的getState和dispatch，修改dispatch函数，从而实现一些功能的增强

- applyMiddleware源码

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

- **思考：**

1.  **中间件为什么需要next作为参数，因为next本质上就是store.dispatch，直接用 ( store:{ getState:()=>void; dispatch:(action)=>void } ) => action => void不行吗？**

当applyMiddleware中的参数只含有一个数，这当然没问题，但是当applyMiddleware处理多个中间件就需要next了，这时next和store.dispatch就有了本质的区别，你可以这样理解：store.dispatch是初态的dispatch，而next则是经过了多个中间件转化后的dispatch。

- 常见官方中间件

**redux-thunk**

作用：可以将action当成函数处理，并传递getState和dispatch作为参数，如果组件中获取dispatch不方便，那么使用redux-thunk是很好的选择，否则可以不用

源码：

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

使用实例：

```js
function fetch(text) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({ type: "LOAD_DATA"})
    }, 5000)
  }
}
store.dispatch(fetch)
```



### 返回值

{getState , dispatch, subscribe, replaceReducer, observable}

**getState**

返回当前的state树

**dispatch: (action:{type:string,....})=>void**

派发一个action，更新state，并触发监听器

**subscribe(listener:Function)=>unsubcribe:Function**

监听state的变化，调用dipatch触发

**replaceReducer**

替换createStore时用到的reducer，较少用

**observable**

留个口子给rxjs用



## connect

```js
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList);
```

注意： 这是react-redux包中的方法，需要和Provider配合使用，目的是将store中的state和dispatch，以及父组件的props映射到子组件的props中。

### 参数说明

1. **[mapStateToProps(state:Object, ownProps:Object):Object]**

   入参是store的state和父组件的props，将store中的state处理后映射到子组件的props中

2. **[mapDispatchToProps(dispatch:Function, ownProps:Object):Object] | [mapDispatchToProps:Object]**

   入参是store的dispatch和父组件的props，将store中的dispatch处理后映射到子组件的props中

3. **[mergeProps:Function]**

   合并props时的回调函数，若空，则默认使用`Object.assign({}, ownProps, stateProps, dispatchProps) `作为返回值

4. **[option:{[pure = true],[withRef = false]}]**

   [pure = true] (Boolean): 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true。

   [withRef = false] (Boolean): 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得。默认值为 false

注意： 

```js
// 只注入dispatch，state的变化不会导致ui更新
connect()(AddTodo)
// 注入stateMap和dispatch
connect(mapStateToProps)(AddTodo)
// 注入stateMap和dispatchMap
connect(mapStateToProps,mapDispatchToProps)(AddTodo)
```