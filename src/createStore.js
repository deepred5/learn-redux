export default function createStore(reducer, preloadedState) {
  console.log('createStore start!');

  let currentState = preloadedState;
  let currentListeners = [];
  let currentReducer = reducer;

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    currentListeners.push(listener);

    // 取消订阅
    return function unsubscribe() {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    }
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    currentListeners.forEach(listener => listener());

    return action;
  }

  // 初始化一次，获取state的初始值
  dispatch({ type: 'redux/INIT' });

  return {
    getState,
    subscribe,
    dispatch
  }
}