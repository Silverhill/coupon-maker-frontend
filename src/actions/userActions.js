import * as actionTypes from './actionTypes';
import decode from 'jwt-decode';

const authValid = (token) => ({
  type: actionTypes.AUTH_VALID,
  payload: token,
});

const authNotValid = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

export const login = (token = '') => (dispatch) => {
  const { role } = decode(token);

  if(token && role === "maker") {
    localStorage.setItem('jwt', token);
    dispatch(authValid(token));
  }else{
    dispatch(authNotValid());
  }

  return { logged: !!token, token, role: role };
}

export const getAuthentication = () => (dispatch) => {
  return localStorage.getItem('jwt');
}

export const removeAuthentication = () => (dispatch) => {
  const removed = !localStorage.removeItem('jwt');
  return removed;
}
