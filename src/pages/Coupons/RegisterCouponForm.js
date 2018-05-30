import React from 'react';
import { injectIntl } from 'react-intl';

//styles
import styles from './CouponsPage.css'
//components
import { InputBox, Button, Typography, Form } from 'coupon-components';

class RegisterCouponForm extends React.Component {
  state = {
    code: ''
  }

  onChange = (ev) => {
    this.setState({code: ev.target.value});
  }

  handleSubmit = (ev) => {
    const { code } = this.state;
    const { onSubmit } = this.props;
    if(onSubmit) onSubmit(code);
  }

  render() {
    const {
      intl,
    } = this.props;

    const form = (
      <Form className={styles.formRegisterCoupon}
            onChange={this.onChange}
            onSubmit={this.handleSubmit}>
        <div className={styles.inputRegister}>
          <InputBox
            name="code"
            className={styles.inputCode}
            placeholder="COP1093"
            required="required"
          />
        </div>
        <div className={styles.description}>
          <Typography.Text small light>
            {intl.formatMessage({id: 'coupons.form.label'})}
          </Typography.Text>
          <Button
            shape="pill"
            gradient
            type="submit"
            text={intl.formatMessage({id: 'coupons.form.button'})}
          />
        </div>
      </Form>
    )

    return (
      <div className={styles.container}>
        {form}
      </div>
    );
  }
}

export default injectIntl(RegisterCouponForm);
