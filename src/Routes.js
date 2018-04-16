import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './pages/Home';
import LogInPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Customer from './pages/Customer/Customer';
import auth from './auth/authenticator';

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => (
    auth.loggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }} />
    )
  )}/>
)

const Pages = () => {
  return (
    <main role='application'>
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/customer/:name" component={Customer} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </main>
  );
}

export default Pages;
