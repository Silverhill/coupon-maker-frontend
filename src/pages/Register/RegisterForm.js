import React from 'react';
//styles
import classNames from 'classnames/bind';
import styles from './RegisterPage.css'
//components
import { InputBox, Button, Typography, Card, Form } from 'coupon-components';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles);

class RegisterForm extends React.Component {
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
    const { account } = this.state;
    const { onSubmit } = this.props;
    if(onSubmit) onSubmit(account);
  }

  render() {
    const { intl, isLoading, disabledBtn } = this.props;
    const form = (
      <Form onChange={this.onChange} onSubmit={this.handleSubmit}>
        <InputBox name="name"
            leftIcon="MdFace"
            placeholder={intl.formatMessage({id: 'register.labels.name'})}
            type="text"
            shape="pill"
            className={styles.input}
            required="required"/>
        <InputBox name="company"
            leftIcon="MdStore"
            placeholder={intl.formatMessage({id: 'register.labels.company'})}
            type="text"
            shape="pill"
            className={styles.input}
            required="required"/>
        <InputBox name="email"
            leftIcon="MdMailOutline"
            placeholder={intl.formatMessage({id: 'register.placeholders.email'})}
            type="email"
            shape="pill"
            className={styles.input}
            required="required"/>
        <InputBox name="password"
            leftIcon="MdLockOutline"
            placeholder={intl.formatMessage({id: 'register.labels.password'})}
            type="password"
            shape="pill"
            className={styles.input}
            required="required"/>
        <Button
          loading={isLoading}
          disabled={disabledBtn}
          shape="pill"
          gradient
          type="submit"
          text={intl.formatMessage({id: 'register.buttons.register'})}
        />
      </Form>
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
            {intl.formatMessage({id: 'register.buttons.hasAccount'})}
          </Link>
        </div>
      </div>
    );
  }
}

export default (injectIntl(RegisterForm));
