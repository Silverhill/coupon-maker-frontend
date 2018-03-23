import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import LogInPage from './pages/Login/LoginPage';
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
        <Route path="/login" component={LogInPage} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </main>
  );
}

export default Pages;
