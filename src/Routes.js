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
import { withApollo } from 'react-apollo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'coupon-components';

// Styles
import * as palette from 'Styles/palette.css';

const redirectToHome = (client, props) =>{
  client.resetStore();
  return (
    <Redirect to={{
      pathname: '/login',
      state: { from: props.location },
    }} />
  )
}

const PrivateRoute = ({ client, component: Component }) => (
  <Route render={(props) => (
    auth.loggedIn() ? ( <Component {...props} />) : redirectToHome(client, props)
  )}/>
)

class Pages extends React.Component {
  render () {
    const CloseButton = ({closeToast }) => (
      <Icon
        name="TiDelete"
        color={palette.baseGrayMedium}
        size={20}
        onClick={closeToast}
      />
    );
    const { client } = this.props;
    return (
      <main role='application'>
        <ToastContainer
          closeButton={<CloseButton />}
          draggable={false}
          autoClose= {5000}
          hideProgressBar={true}
        />
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LogInPage} />
          <Route path="/customer/:role" component={Customer} />
          <PrivateRoute path='/' client={client} component={Home} />
        </Switch>
      </main>
    )
  }
}

export default withApollo(Pages);
