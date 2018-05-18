import { combineReducers } from 'redux';
import user from './userReducer';

const initialState = {
  counter: 0,
}

const counterReducer = (state = initialState.counter, action = {}) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  user
})

export default rootReducer;
