import { createStore, combineReducers, bindActionCreators, applyMiddleware } from '../src/index';
import thunk from './redux-thunk';

const NAME = 'NAME';
const AGE = 'AGE';
const HOBBY = 'HOBBY';

function app1(state = { name: 'tc', age: 10 }, action) {
  switch (action.type) {
    case NAME:
      return {
        ...state,
        name: action.name
      }
    case AGE:
      return {
        ...state,
        age: action.age
      }
    default:
      return state;
  }
}

function app2(state = [], action) {
  switch (action.type) {
    case HOBBY:
      return [...state, action.hobby]
    default:
      return state;
  }
}

function changeName(name) {
  return {
    type: NAME,
    name
  }
}

function changAge(age) {
  return {
    type: AGE,
    age
  }
}

function addHobby(hobby) {
  return {
    type: HOBBY,
    hobby
  }
}

// 异步action
function addHobbyAsync(hobby) {
  return (dispatch) => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(addHobby(hobby));
    }, 1500);
  };
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const appReducer = combineReducers({ test: app1, hobby: app2 });

const middleware = applyMiddleware(logger, thunk);

const store = createStore(appReducer, middleware);

const boundActionCreators = bindActionCreators({ changAge, changeName, addHobby }, store.dispatch);

const a = store.subscribe(() => {
  console.log('subscribe1');
  console.log(store.getState());
});

const b = store.subscribe(() => {
  console.log('subscribe2');
});

boundActionCreators.changAge(11);
boundActionCreators.addHobby('dog');
// 取消订阅
b();
store.dispatch(addHobbyAsync('pig'))

window.store = store;