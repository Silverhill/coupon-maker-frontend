import React from 'react';
//styles
import styles from './CouponsPage.css'
//components
import { InputBox, Button, Typography } from 'coupon-components';

class RegisterCouponForm extends React.Component {
  state = {
    code: ''
  }

  onChange = (ev) => {
    this.setState({code: ev.target.value});
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { code } = this.state;
    const { onSubmit } = this.props;
    if(onSubmit) onSubmit(code);
  }

  render() {
    const form = (
      <form className={styles.formRegisterCoupon}
            onChange={this.onChange}
            onSubmit={this.handleSubmit}>
        <div className={styles.inputRegister}>
          <InputBox
            name="code"
            className={styles.inputCode}
            placeholder="COP1093"
          />
        </div>
        <div className={styles.description}>
          <Typography.Text small light>
            Puedes buscar el código que aparece en cada cupon para registrarlo manualmente. Ingresa el código en el campo y registra tu cupón.
          </Typography.Text>
          <Button
            shape="pill"
            gradient
            type="submit"
            text="Canjear"
          />
        </div>
      </form>
    )

    return (
      <div className={styles.container}>
        {form}
      </div>
    );
  }
}

export default RegisterCouponForm;
