import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
//styles
import styles from './CouponsPage.css'
//components
import { InputBox, Button, Typography } from 'coupon-components';

class RegisterCouponForm extends React.Component {
  render() {
    const form = (
      <form onSubmit={this.props.handleSubmit} className={styles.formRegisterCoupon}>
        <div className={styles.inputRegister}>
          <Field
            name="code"
            reduxFormInput
            component={InputBox}
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

export default connect()(
  reduxForm({
    form: 'registerCoupon'
  })(RegisterCouponForm)
);
