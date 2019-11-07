import compose from './compose';

// dispatch  store.dispatch  next 三者的区别

// store.dispatch 最初始的dispatch
// next 中间件中调用next就把执行权交给下一个中间件
// dispatch 加强版的dispatch，最后用户拿到的store.dispatch已经是加强版的了 调用这个加强版的dispatch会把所有的中间件从头开始执行一遍

/**
 * 用来增强dispatch
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);

    // 直接调用报错
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    };

    // 模拟store的数据结构，鸭子类型
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };

    /**
     * middleware的函数模板
     * 
     * const logger = store => next => action => {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
      }
     */

    /**
     * 每个middleware先调用一次，注入全局的store,返回一个新的函数middlewareBack
     * const middlewareBack = next => action => {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
      }
     */
    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    /**
     * 每个middlewareBack又被调用一次，并且前一个middlewareBack的返回值作为下一个middlewareBack的参数
     * const middlewareBackBack = action => {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
      }
     */

    // 重新赋值，替换最初会报错的dispatch，加强版dispatch
    dispatch = compose(...chain)(store.dispatch);

    // 返回一个类似store的对象，这里的dispatch已经被替换成加强版的了，并非是最初的store.dispatch
    return {
      ...store,
      dispatch
    };
  }
}