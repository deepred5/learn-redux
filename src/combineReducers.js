export default function combineReducers(reducers) {
  const finalReducres = { ...reducers };
  const finalReducerKeys = Object.keys(finalReducres);

  return function combination(state = {}, action) {
    const nextState = {};
    // 是否更新
    let hasChanged = false;
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducres[key];
      const preStateForKey = state[key];
      const nextStateForKey = reducer(preStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== preStateForKey;
    }

    return hasChanged ? nextState : state;
  }
}