import React from 'react';
//styles
import classNames from 'classnames/bind';
import styles from './LoginPage.css'
//components
import { InputBox, Typography, Card } from 'coupon-components';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';
import Button from 'Components/Button2/Button';

const cx = classNames.bind(styles);

class LoginForm extends React.Component {
  state = {
    account: {}
  }

  onChange = (ev) => {
    const field = { [ev.target.name]: ev.target.value };
    this.setState(prevState => ({
      account: {
        ...prevState.account,
        ...field,
      }
    }));
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { account } = this.state;
    const { onSubmit } = this.props;
    if(onSubmit) onSubmit(account);
  }

  render() {
    const { intl } = this.props;
    const form = (
      <form onChange={this.onChange} onSubmit={this.handleSubmit}>
        <InputBox name="email"
          leftIcon="FaUser"
          placeholder={intl.formatMessage({id: 'login.labels.email'})}
          type="email"
          shape="pill"
          className={styles.input}
          required="required"/>
        <InputBox name="password"
          leftIcon="FaLock"
          placeholder={intl.formatMessage({id: 'login.labels.password'})}
          type="password"
          shape="pill"
          className={styles.input}
          required="required"/>
        <Button
          shape="pill"
          gradient
          type="submit"
          loading={this.props.loading}
          text={intl.formatMessage({id: 'login.buttons.login'})}
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
            {intl.formatMessage({id: 'login.buttons.newUser'})}
          </Link>
        </div>
      </div>
    );
  }
}

export default (injectIntl(LoginForm));
