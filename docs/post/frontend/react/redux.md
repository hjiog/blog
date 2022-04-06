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

作用：可以将action当成函数处理，并传递getState和dispatch作为参数，如果组件中获取dispatch不方便，那么使用redux-thunk是很好的选择，否则可以不用。另外，使用 reduc-thunk 后，action 函数的返回值就是 dipatch 函数的返回值。

源码：

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) =>
  // 返回增强的dispatch
  (action) => {
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





## api

### redux

### useStore

```ts
import { useContext } from 'react'
import { ReactReduxContext } from '../components/Context'
import { useReduxContext as useDefaultReduxContext } from './useReduxContext'

function useReduxContext(): ReactReduxContextValue | null {
  const contextValue = useContext(null)
  return contextValue
}

export function createStoreHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)
  return function useStore() {
    const { store } = useReduxContext()!
    return store
  }
}
export const useStore = /*#__PURE__*/ createStoreHook()
```



#### useSelector

#### useDispatch



### Reduxjs/tookit

#### configureStore

#### createReducer

#### createAction

#### createEntityAdapter



##  从实践中学redux

### 灵魂拷问

- Provider 和 useSelector是如何配合工作的？
- 使用 dispatch 后，是整个组件树更新还是发生变动了的组件更新？如果是后者，useSelector 是如何做到的？

下面我们来一步一步探讨~

### Store.js

```js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

#### configureStore

源码如下：

```tsx
export function configureStore<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>]
>(options: ConfigureStoreOptions<S, A, M>): EnhancedStore<S, A, M> {
  const curriedGetDefaultMiddleware = curryGetDefaultMiddleware<S>()

  const {
    reducer = undefined,
    middleware = curriedGetDefaultMiddleware(),
    devTools = true,
    preloadedState = undefined,
    enhancers = undefined,
  } = options || {}

  let rootReducer: Reducer<S, A>

  if (typeof reducer === 'function') {
    rootReducer = reducer
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer)
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    )
  }

  let finalMiddleware = middleware

  const middlewareEnhancer = applyMiddleware(...finalMiddleware)

  let finalCompose = compose

  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION,
      ...(typeof devTools === 'object' && devTools),
    })
  }

  let storeEnhancers: StoreEnhancer[] = [middlewareEnhancer]

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer, ...enhancers]
  } else if (typeof enhancers === 'function') {
    storeEnhancers = enhancers(storeEnhancers)
  }

  const composedEnhancer = finalCompose(...storeEnhancers) as any

  return createStore(rootReducer, preloadedState, composedEnhancer)
}
```

configureStore主要的工作是：

- 根据reducer的类型决定是否调用combineReducers
- 加载一些默认的插件



### counterSlice.js

作用：对外暴露actions和reducer

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;

```



#### createSlice



#### createAsyncThunk



### index.js

使用了Provder

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

#### Provder

源码：

```js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from './Context';
import Subscription from '../utils/Subscription';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';

function Provider(_ref) {
  var store = _ref.store,
      context = _ref.context,
      children = _ref.children;
  var contextValue = useMemo(function () {
    var subscription = new Subscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = useMemo(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || ReactReduxContext;
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
export default Provider;
```



解析：

**new Subscription(store，parentSub)**

> 提一嘴，store中提供了subsrcibe和dispatch函数，当subsribe注册了一个listener时，会记录在listener数组中，当调用dispatch时会无差别的执行每一个listener

初始化时内部也会生成一个另外一个listener数组（和redux中的store中的listener是两套数据），用于存放子监听器的listener回调。

举个例子：

```js
// 简化版Provider组件
function Provider(store){
  // 父级监听器
  var subscription = new Subscription(store);
  // onStateChange 就是dispacth触发的回调，这里将notifyNestedSubs作为回调，用于触发所有子监听器中的事件
  subscription.onStateChange = subscription.notifyNestedSubs;
  // 生成listeners数组，并调用store中的subscribe
  subscription.trySubscribe();
  const contextValue = {
    store,
    subscription
  }
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

// 简化版useSelector hook
function useSelector(){
    var _useReduxContext = useReduxContext(),
    store = _useReduxContext.store,
    contextSub = _useReduxContext.subscription;
  	// 子监听器
    var subscription = new Subscription(store,contextSub);
    useEffect(function () {
      function checkForUpdates() {
        try {
          var newStoreState = store.getState();
          var _newSelectedState = latestSelector.current(newStoreState);
          if (equalityFn(_newSelectedState, latestSelectedState.current)) {
            return;
          }
          latestSelectedState.current = _newSelectedState;
          latestStoreState.current = newStoreState;
        } catch (err) {
          latestSubscriptionCallbackError.current = err;
        }
        forceRender();
      }
			// 指定回调事件
      subscription.onStateChange = checkForUpdates;
      // 这里和Provider组件不一样，这里是将回调事件返回到父监听器的listeners中，由父监听器统一触发回调
      subscription.trySubscribe();
      checkForUpdates();
      return function () {
        return subscription.tryUnsubscribe();
      };
  }, [store, subscription]);
  return selectedState;
}
```

**Provider组件本质**

本质上是利用context将store和subcription传递下去



### Count.js

```jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import Container from '../testContext/container';
import styles from './Counter.module.css';

export function Counter () {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
      <Container></Container>
    </div>
  );
}
```

#### useSelector

源码

```js
import { useReducer, useRef, useMemo, useContext, useDebugValue } from 'react';
import { useReduxContext as useDefaultReduxContext } from './useReduxContext';
import Subscription from '../utils/Subscription';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
import { ReactReduxContext } from '../components/Context';

var refEquality = function refEquality(a, b) {
  return a === b;
};

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  // 只是用于重新渲染组件
  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      forceRender = _useReducer[1];

  var subscription = useMemo(function () {
    return new Subscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = useRef();
  var latestSelector = useRef();
  var latestStoreState = useRef();
  var latestSelectedState = useRef();
  var storeState = store.getState();
  var selectedState;

  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }

    throw err;
  }

  // 可以看成是 useEffect
  useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newStoreState = store.getState();

        var _newSelectedState = latestSelector.current(newStoreState);

        // 当状态不相等才会往下走
        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        latestSubscriptionCallbackError.current = err;
      }
			// 组件重新渲染
      forceRender();
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}


export function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }

    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store,
        contextSub = _useReduxContext.subscription;

    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    useDebugValue(selectedState);
    return selectedState;
  };
}

export var useSelector = /*#__PURE__*/createSelectorHook();
```

**总结**

1. useSelect 内部使用了 useReducer，进而可以重新渲染页面
2. 使用了发布订阅模式，当组件调用 dispatch 时，其他任意包含 useSelector 的组件都会执行相对应的回调，且只有返回的 state 和原来的不一样，才会重新渲染。这样就能做到 state 变动的组件才需要更新。



#### useStore

```js
import { useContext } from 'react';
import { ReactReduxContext } from '../components/Context';
import { useReduxContext as useDefaultReduxContext } from './useReduxContext';
/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

export function createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useDefaultReduxContext : function () {
    return useContext(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store;

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

export var useStore = /*#__PURE__*/createStoreHook();
```

本质就是获取从 Provider 组件传递下来的 store



#### useDispatch

```js
import { ReactReduxContext } from '../components/Context';
import { useStore as useDefaultStore, createStoreHook } from './useStore';
/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

export function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useStore = context === ReactReduxContext ? useDefaultStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

export var useDispatch = /*#__PURE__*/createDispatchHook();
```

本质上就是获取 Provider 组件的 store.dispatch
