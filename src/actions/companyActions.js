import * as actionTypes from './actionTypes';

export const setOffices = (offices) => ({
  type: actionTypes.SET_OFFICES,
  payload: offices,
})