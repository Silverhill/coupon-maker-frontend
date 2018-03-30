import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
import styles from './RegisterPage.css'
import 'coupon-components/build/styles.css';
//components
import { InputBox, Button, Typography } from 'coupon-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles);

const inputField = (props) => (
  <div className="input-row">
    <input {...props.input} type="text"/>
    {props.meta.touched && props.meta.error &&
     <span className="error">{props.meta.error}</span>}
  </div>
)

class RegisterForm extends React.Component {
  state = {
    credentials: {
      representate: '',
      company: '',
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

  render() {
    const form = (
      <form onChange={this.onChange} onSubmit={this.onSubmit}>
        <FormattedMessage id="register.labels.name">
          { placeholder =>
            <InputBox
              name="representate"
              leftIcon="FaUser"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.name}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.company">
          { placeholder =>
            <InputBox
              name="company"
              leftIcon="FaBriefcase"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.company}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.email">
          { placeholder =>
            <InputBox
              name="email"
              leftIcon="FaEnvelope"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.email}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.password">
          { placeholder =>
            <InputBox
              name="password"
              leftIcon="FaLock"
              type="password"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.password}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <Button
          shape="pill"
          gradient
          type="submit"
          text={<FormattedMessage id='register.buttons.register' />}
        />
      </form>
    )

    return (
      <div className={styles.form}>
        <div className={cx(styles.logo)}>
          <Logo/>
          <div className={cx(styles.pipe)}/>
          <Typography.Subtitle light >MAKER</Typography.Subtitle>
        </div>
        {form}
        <Link to='register' className={styles.link}>
          <FormattedMessage id='login.buttons.newUser' />
        </Link>
      </div>
    );
  }
}

export default connect()(
  reduxForm({
    form: 'login'
  })(RegisterForm)
);
