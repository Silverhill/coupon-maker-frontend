import React from 'react';
import {connect} from 'react-redux';
import { graphql } from 'react-apollo';

import QueryService from 'Services/graphql/queries-service';
import * as userActions from 'Actions/userActions';
import { InputBox, Button } from 'coupon-components';

import gql from 'graphql-tag';

class LogInPage extends React.Component {
  state = {
    credentials: {
      email: '',
      password: ''
    }
  }

  onChange = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      }
    });

  }

  onSave = () => {
  }

  render() {
    return (
      <div>
        <form onChange={this.onChange} onSubmit={this.onSave}>

          <InputBox
            name="email"
            leftIcon="FaUser"
            placeholder="Usuario"
            shape="pill"
            value={this.state.credentials.email}
          />

          <InputBox
            name="password"
            leftIcon="FaLock"
            type="password"
            placeholder="Contraseña"
            shape="pill"
            value={this.state.credentials.password}
          />

          <Button shape="pill"
                  gradient
                  type="submit"
                  text="login" />
        </form>
      </div>
  );
  }
}

let query = gql`
  query {
    allHunters {
      name
    }
  }
`;

const LoginPageWithLogin = graphql(query)(LogInPage);

export default connect(
  null,
{
  loginUser: userActions.login,
})(LoginPageWithLogin);

