import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//styles
import classNames from 'classnames/bind';
import styles from './LoginPage.css'
import 'coupon-components/build/styles.css';
//components
import { InputBox, Button, Typography, Card } from 'coupon-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles);

class LoginForm extends React.Component {
  render() {
    const form = (
      <form onSubmit={this.props.handleSubmit}>
        <FormattedMessage id="login.labels.email">
          {placeholder =>
            <Field
              name="email"
              reduxFormInput
              component={InputBox}
              leftIcon="FaUser"
              placeholder={placeholder}
              shape="pill"
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="login.labels.password">
          { placeholder =>
            <Field
              name="password"
              reduxFormInput
              component={InputBox}
              leftIcon="FaLock"
              type="password"
              placeholder={placeholder}
              shape="pill"
              className={styles.input}
            />
          }
        </FormattedMessage>

        <Button
          shape="pill"
          gradient
          type="submit"
          text={<FormattedMessage id='login.buttons.login' />}
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
          <Link to='register' className={styles.link}>
            <FormattedMessage id='login.buttons.newUser' />
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(
  reduxForm({
    form: 'login'
  })(LoginForm)
);
