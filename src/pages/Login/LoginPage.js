import React from 'react';

// import { allHunters } from '../../services/graphql/queries.graphql';
import { InputBox, Button } from 'coupon-components';
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

export default LogInPage;

