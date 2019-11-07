import { createStore, combineReducers, bindActionCreators } from './src/index';

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

const appReducer = combineReducers({ test: app1, hobby: app2 })
const store = createStore(appReducer, { test: { name: 'deepred', age: 41 }, hobby: ['cat'] });

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

window.store = store;