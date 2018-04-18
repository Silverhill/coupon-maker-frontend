import { combineReducers } from 'redux';
import * as actionTypes from 'Actions/actionTypes';

const initialState = {
  offices: [],
};

const offices = (state = initialState.offices, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_OFFICES:
      return action.payload;
    default:
      return state;
  }
};

const company = combineReducers({
  offices,
});

export default company;