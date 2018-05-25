import decode from 'jwt-decode';
import moment from 'moment';

class Auth {
  static loggedIn() {
    const notAuth = false
    const authenticated = true;
    const token = localStorage.getItem('jwt');

    if(!token) return notAuth;
    try {
      const { exp } = decode(token);

      if((exp * 1000) < moment().valueOf()) {
        localStorage.removeItem('jwt');
        return notAuth;
      }

    } catch(err) {
      localStorage.removeItem('jwt');
      return notAuth;
    }

    return authenticated;
  }

  static logOut() {
    localStorage.removeItem('jwt');
  }
}

export default Auth;
