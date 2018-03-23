import * as actionTypes from './actionTypes';

const authValid = (token) => ({
  type: actionTypes.AUTH_VALID,
  payload: token,
});

const authNotValid = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

export const login = (token = '') => (dispatch) => {
  if(token) {
    localStorage.setItem('jwt', token);
    dispatch(authValid(token));
  }else {
    dispatch(authNotValid());
  }

  return { logged: !!token, token };
}

export const getAuthentication = () => (dispatch) => {
  return localStorage.getItem('jwt');
}