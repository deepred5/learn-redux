import { createStore } from './src/index';

const NAME = 'NAME';
const AGE = 'AGE';
const HOBBY = 'HOBBY';

function app(state = { name: 'tc', age: 10, hobby: [] }, action) {
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
    case HOBBY:
      return {
        ...state,
        hobby: [...state.hobby, action.hobby]
      }
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

const store = createStore(app);

const a = store.subscribe(() => {
  console.log('subscribe1');
  // console.log(store.getState());
});

const b = store.subscribe(() => {
  console.log('subscribe2');
});

store.dispatch(changAge(11));
store.dispatch(changeName('cody'));
store.dispatch(addHobby('dog'));
store.dispatch(addHobby('dog1'));

window.store = store;