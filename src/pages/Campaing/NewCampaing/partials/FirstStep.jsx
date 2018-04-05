import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Panel, InputBox, InputNested } from 'coupon-components';
import InputDate from 'Components/InputDate/InputDate'

import styles from '../../NewCampaing/NewCampaing.css';

class FirstStep extends Component {
  render() {
    return (
      <div>
        <Panel title="Información Básica" classNameContainer={styles.panel}>
          <Field name="title"
                reduxFormInput
                component={InputBox}
                placeholder="Escribe un nombre creativo de tu campaña"
                labelText="Cual es el nombre de tu campaña?"
                className={styles.row_padding}/>
          <Field name="promo"
                reduxFormInput
                component={InputBox}
                placeholder="Ingresa una descripción especifica de tu promoción"
                labelText="Descripción corta de tu campaña (Opcional)"
                className={styles.row_padding}/>
          <Field name="address"
                reduxFormInput
                component={InputBox}
                placeholder="Ingresa la dirección donde se va a hacer efectivo el cupón, principal o Sucursal"
                labelText="Cual es la dirección de tu empresa?"
                className={styles.row_padding}/>
        </Panel>
        <Panel classNameHeader={styles.headerWithoutTitle} classNameContainer={styles.panel}>
          <Field name="description"
                reduxFormInput
                component={InputBox}
                placeholder="Si prefieres escribir tu mensaje… eje: 2x1"
                labelText="Personaliza tu mensaje"
                className={styles.row_padding}/>
          <InputNested labelText="Duración" description="Elige el rango de duración para tu campaña" className={styles.row_padding}>
            <Field name="startAt"
                date={1523302872000}
                reduxFormInput
                component={InputDate}/>
            <Field
              name="endAt"
              reduxFormInput
              component={InputDate}/>
          </InputNested>
          <Field name="totalCoupons"
                reduxFormInput
                component={InputBox}
                type="number"
                labelText="Cupones a utilizar"
                placeholder="Seleccione un numero"
                className={styles.row_padding}/>
        </Panel>
      </div>
    )
  }
}

export default FirstStep;