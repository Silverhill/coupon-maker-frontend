import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
import styles from './RegisterPage.css'
import 'coupon-components/build/styles.css';
//components
import { InputBox, Button, Typography, Card } from 'coupon-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles);

class RegisterForm extends React.Component {
  state = {
    credentials: {
      name: '',
      company: '',
      email: '',
      password: ''
    }
  }

  render() {
    const form = (
      <form onSubmit={this.props.handleSubmit}>
        <FormattedMessage id="register.labels.name">
          { placeholder =>
            <Field
              name="name"
              reduxFormInput
              component={InputBox}
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
            <Field
              name="company"
              reduxFormInput
              component={InputBox}
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
            <Field
              name="email"
              reduxFormInput
              component={InputBox}
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
            <Field
              name="password"
              reduxFormInput
              component={InputBox}
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
          text={<FormattedMessage id='register.buttons.register'/>}
        />
      </form>
    )

    return (
      <div className={styles.form}>
        <Card>
          <div className={cx(styles.logo)}>
            <Logo/>
            <div className={cx(styles.pipe)}/>
            <Typography.Subtitle light >MAKER</Typography.Subtitle>
          </div>
          {form}
        </Card>
        <div className={styles.linkBtn}>
          <Link to='login' className={styles.link}>
          <FormattedMessage id='register.buttons.hasAccount'/>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(
  reduxForm({
    form: 'register'
  })(RegisterForm)
);
