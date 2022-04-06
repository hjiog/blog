---
title: React Suspense 和 lazy 揭秘
date: 2021-12-13
tags:
 - react
 - suspense
 - lazy
categories:
 - 前端

---



## 代码结构
> 源码基于react 17.0.3

假设我们的代码是以下结构：
```jsx
function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
        {React.lazy(() => import('./OtherComponent'))}
    </React.Suspense>
  );
}
```


## 主要流程

首先调用`react.createElement`去生成一个特殊的结构体，里头有个`$$typeof`属性，如果这个属性是 `Symbol(react.suspense)`,就会调用 `updateSuspenseComponent` 去生成对应的fiber节点。
> packages/react-reconciler/src/ReactFiberBeginWork.old.js

```js
function updateSuspenseComponent(current, workInProgress, renderLanes) {
  const nextProps = workInProgress.pendingProps;

  let suspenseContext: SuspenseContext = suspenseStackCursor.current;

  let showFallback = false;
  // 首次执行该值是false，去构建lazy组件
  // lazy组件throw error后再次执行，该值为true
  const didSuspend = (workInProgress.flags & DidCapture) !== NoFlags;

  if (
    didSuspend ||
    shouldRemainOnFallback(
      suspenseContext,
      current,
      workInProgress,
      renderLanes,
    )
  ) {
    // Something in this boundary's subtree already suspended. Switch to
    // rendering the fallback children.
    showFallback = true;
    workInProgress.flags &= ~DidCapture;
  } else {
    // Attempting the main content
    if (
      current === null ||
      (current.memoizedState: null | SuspenseState) !== null
    ) {
      // This is a new mount or this boundary is already showing a fallback state.
      // Mark this subtree context as having at least one invisible parent that could
      // handle the fallback state.
      // Avoided boundaries are not considered since they cannot handle preferred fallback states.
      if (nextProps.unstable_avoidThisFallback !== true) {
        suspenseContext = addSubtreeSuspenseContext(
          suspenseContext,
          InvisibleParentSuspenseContext,
        );
      }
    }
  }

  suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);

  pushSuspenseContext(workInProgress, suspenseContext);

  if (current === null) {
    // Initial mount
    // If we're currently hydrating, try to hydrate this boundary.
    tryToClaimNextHydratableInstance(workInProgress);

    const nextPrimaryChildren = nextProps.children;
    const nextFallbackChildren = nextProps.fallback;
    if (showFallback) {
      // 第二次执行进入这里
      const fallbackFragment = mountSuspenseFallbackChildren(
        workInProgress,
        nextPrimaryChildren,
        nextFallbackChildren,
        renderLanes,
      );
      const primaryChildFragment: Fiber = (workInProgress.child: any);
      primaryChildFragment.memoizedState =
        mountSuspenseOffscreenState(renderLanes);
      workInProgress.memoizedState = SUSPENDED_MARKER;
      return fallbackFragment;
    } else {
      // 首次执行进入这里
      return mountSuspensePrimaryChildren(
        workInProgress,
        nextPrimaryChildren,
        renderLanes,
      );
    }
  } else {
    // This is an update.
    ...
    }
  }
}
```

这里捋一下 `updateSuspenseComponent` 的流程
1. 首次执行会调用 `mountSuspensePrimaryChildren`
2. `mountSuspensePrimaryChildren` 内部调用了 `mountWorkInProgressOffscreenFiber`，生成了`$$typeof` 为 `Symbol(react.offscreen)` 类型的fiber节点。而lazy组件则作为该fiber节点的pendingProps中的children等待下一次调和。
3. `$$typeof` 为 `Symbol(react.offscreen)` 类型的fiber节点 调用 `reconcileChildFibers` 基于 pendingProps 为 lazy组件生成子fiber节点。

reconcileChildFibers的源码如下：

> packages/react-reconciler/src/ReactChildFiber.old.js
```js
  function reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    lanes: Lanes,
  ): Fiber | null {
   ...
    // newChild 的结构如下
    /** 
     {
        $$typeof: Symbol(react.lazy)
        _init: ƒ lazyInitializer(payload)
        _payload: {_status: -1, _result: ƒ}
     }
    */

    // Handle object types
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_LAZY_TYPE:
          if (enableLazyElements) {
            const payload = newChild._payload;
            const init = newChild._init;
            // TODO: This function is supposed to be non-recursive.
            return reconcileChildFibers(
              returnFiber,
              currentFirstChild,
              init(payload),
              lanes,
            );
          }
      }
    }
    ...
  }
```

这时候会调用lazy组件中的init方法，源码如下：
> packages/react/src/ReactLazy.js

```js
function lazyInitializer<T>(payload: Payload<T>): T {
  if (payload._status === Uninitialized) {
    const ctor = payload._result;
    const thenable = ctor();
    // Transition to the next state.
    // This might throw either because it's missing or throws. If so, we treat it
    // as still uninitialized and try again next time. Which is the same as what
    // happens if the ctor or any wrappers processing the ctor throws. This might
    // end up fixing it if the resolution was a concurrency bug.
    thenable.then(
      (moduleObject) => {
        if (payload._status === Pending || payload._status === Uninitialized) {
          // Transition to the next state.
          const resolved: ResolvedPayload<T> = (payload: any);
          resolved._status = Resolved;
          resolved._result = moduleObject;
        }
      },
      (error) => {
        if (payload._status === Pending || payload._status === Uninitialized) {
          // Transition to the next state.
          const rejected: RejectedPayload = (payload: any);
          rejected._status = Rejected;
          rejected._result = error;
        }
      },
    );
    if (payload._status === Uninitialized) {
      // In case, we're still uninitialized, then we're waiting for the thenable
      // to resolve. Set it as pending in the meantime.
      const pending: PendingPayload = (payload: any);
      pending._status = Pending;
      pending._result = thenable;
    }
  }
  if (payload._status === Resolved) {
    const moduleObject = payload._result;
    return moduleObject.default;
  } else {
    throw payload._result;
  }
}

export function lazy<T>(
  ctor: () => Thenable<{default: T, ...}>,
): LazyComponent<T, Payload<T>> {
  const payload: Payload<T> = {
    // We use these fields to store the result.
    _status: -1,
    _result: ctor,
  };

  const lazyType: LazyComponent<T, Payload<T>> = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer,
  };

  return lazyType;
}
```



调用init方法时，`payload._status` 的值为-1，直接将 `payload._result`，即lazy组件传入的promise函数throw出去。
接下来我们看看react是如何处理错误的。
> packages/react-reconciler/src/ReactFiberWorkLoop.old.js

```js
function renderRootSync(root: FiberRoot, lanes: Lanes) {
      ...
      do {
        try {
          workLoopSync();
          break;
        } catch (thrownValue) {
          handleError(root, thrownValue);
        }
      } while (true);
      ...
  }
  
  function handleError(root, thrownValue): void {
  do {
    ...
    let erroredWork = workInProgress;
    try {
      throwException(
        root,
        erroredWork.return,
        erroredWork,
        thrownValue,
        workInProgressRootRenderLanes,
      );
      completeUnitOfWork(erroredWork);
    } catch (yetAnotherThrownValue) {
      ...
      continue;
    }
    // Return to the normal work loop.
    return;
  } while (true);
}
```

> packages/react-reconciler/src/ReactFiberThrow.old.js
```js
function throwException(
  root: FiberRoot,
  returnFiber: Fiber,
  sourceFiber: Fiber,
  value: mixed,
  rootRenderLanes: Lanes,
) {
    // The source fiber did not complete.
    sourceFiber.flags |= Incomplete;

    // This is a wakeable.
    const wakeable: Wakeable = (value: any);

    // Reset the memoizedState to what it was before we attempted to render it.
    // A legacy mode Suspense quirk, only relevant to hook components.
    const tag = sourceFiber.tag;

    // Schedule the nearest Suspense to re-render the timed out view.
    let workInProgress = returnFiber;
    do {
      if (
        workInProgress.tag === SuspenseComponent &&
        shouldCaptureSuspense(workInProgress, hasInvisibleParentBoundary)
      ) {
        // Found the nearest boundary.

        // Stash the promise on the boundary fiber. If the boundary times out, we'll
        // attach another listener to flip the boundary back to its normal state.
        const wakeables: Set<Wakeable> = (workInProgress.updateQueue: any);
        if (wakeables === null) {
          const updateQueue = (new Set(): any);
          // 将promise挂在了workInProgress中的updateQueues上了
          updateQueue.add(wakeable);
          workInProgress.updateQueue = updateQueue;
        } else {
          wakeables.add(wakeable);
        }

        // 实现监听函数，确保lazy组件loading完成后更新页面
        attachPingListener(root, wakeable, rootRenderLanes);

        workInProgress.flags |= ShouldCapture;
        // TODO: I think we can remove this, since we now use `DidCapture` in
        // the begin phase to prevent an early bailout.
        workInProgress.lanes = rootRenderLanes;

        return;
      }
      // This boundary already captured during this render. Continue to the next
      // boundary.
      workInProgress = workInProgress.return;
    } while (workInProgress !== null);
  }
  ...
}


function attachPingListener(root: FiberRoot, wakeable: Wakeable, lanes: Lanes) {
  let pingCache = root.pingCache;
  let threadIDs;
  if (pingCache === null) {
    pingCache = root.pingCache = new PossiblyWeakMap();
    threadIDs = new Set();
    pingCache.set(wakeable, threadIDs);
  } else {
    threadIDs = pingCache.get(wakeable);
    if (threadIDs === undefined) {
      threadIDs = new Set();
      pingCache.set(wakeable, threadIDs);
    }
  }
  if (!threadIDs.has(lanes)) {
    // Memoize using the thread ID to prevent redundant listeners.
    threadIDs.add(lanes);
    const ping = pingSuspendedRoot.bind(null, root, wakeable, lanes);
    if (enableUpdaterTracking) {
      if (isDevToolsPresent) {
        // If we have pending work still, restore the original updaters
        restorePendingUpdaters(root, lanes);
      }
    }
   // 这里实现监听
    wakeable.then(ping, ping);
  }
}
```

> packages/react-reconciler/src/ReactFiberWorkLoop.old.js
```js
export function pingSuspendedRoot(
  root: FiberRoot,
  wakeable: Wakeable,
  pingedLanes: Lanes,
) {
  const pingCache = root.pingCache;
  if (pingCache !== null) {
    // The wakeable resolved, so we no longer need to memoize, because it will
    // never be thrown again.
    pingCache.delete(wakeable);
  }

  const eventTime = requestEventTime();
  markRootPinged(root, pingedLanes, eventTime);

  // debugger发现不走这个if逻辑
  if (
    workInProgressRoot === root &&
    isSubsetOfLanes(workInProgressRootRenderLanes, pingedLanes)
  ) {
    // Received a ping at the same priority level at which we're currently
    // rendering. We might want to restart this render. This should mirror
    // the logic of whether or not a root suspends once it completes.

    // TODO: If we're rendering sync either due to Sync, Batched or expired,
    // we should probably never restart.

    // If we're suspended with delay, or if it's a retry, we'll always suspend
    // so we can always restart.
    if (
      workInProgressRootExitStatus === RootSuspendedWithDelay ||
      (workInProgressRootExitStatus === RootSuspended &&
        includesOnlyRetries(workInProgressRootRenderLanes) &&
        now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS)
    ) {
      // Restart from the root.
      prepareFreshStack(root, NoLanes);
    } else {
      // Even though we can't restart right now, we might get an
      // opportunity later. So we mark this render as having a ping.
      workInProgressRootPingedLanes = mergeLanes(
        workInProgressRootPingedLanes,
        pingedLanes,
      );
    }
  }
  // 重新开始渲染流程
  ensureRootIsScheduled(root, eventTime);
}
```


## 总结

直接上图：


![流程图.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0395ce9bce6540a59ead9eb77abf0b0b~tplv-k3u1fbpfcp-watermark.image?)