import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Panel, InputBox, InputNested } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';

class FirstStep extends Component {
  render() {
    return (
      <div>
        <Panel title="Información Básica" classNameContainer={styles.panel}>
          <Field name="campaign"
                reduxFormInput
                component={InputBox}
                placeholder="Escribe un nombre creativo de tu campaña"
                labelText="Cual es el nombre de tu campaña?"/>
          <Field name="promotion"
                reduxFormInput
                component={InputBox}
                placeholder="Ingresa una descripción especifica de tu promoción"
                labelText="Descripción corta de tu campaña (Opcional)"/>
          <Field name="address"
                reduxFormInput
                component={InputBox}
                placeholder="Ingresa la dirección donde se va a hacer efectivo el cupón, principal o Sucursal"
                labelText="Cual es la dirección de tu empresa?"/>
        </Panel>
        <Panel classNameHeader={styles.headerWithoutTitle} classNameContainer={styles.panel}>
          <Field name="message"
                reduxFormInput
                component={InputBox}
                placeholder="Si prefieres escribir tu mensaje… eje: 2x1"
                labelText="Personaliza tu mensaje"/>
          <InputNested labelText="Duración" description="Elige el rango de duración para tu campaña">
            <InputBox
              type="text"
              placeholder="2017/1/20"
            />
            <InputBox
              type="text"
              placeholder="2017/2/20"
            />
          </InputNested>
          <Field name="coupons"
                reduxFormInput
                component={InputBox}
                type="number"
                labelText="Cupones a utilizar"
                placeholder="Seleccione un numero"/>
        </Panel>
      </div>
    )
  }
}

export default FirstStep;