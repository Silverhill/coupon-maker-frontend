import React, { Component } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { Panel, Select, InputBox, Typography } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';
const cx = classNames.bind(styles);

class SecondStep extends Component {
  render() {
    const countries = [
      {key:'ec', value:'Ecuador'}
    ];

    const cities = [
      {key:'loh', value:'Loja'}
    ];

    return (
      <div>
        <Panel title="Público" classNameContainer={styles.panel}>
          <div className={styles.rowsContainer}>
            <div className={cx(styles.row, styles.row_padding)}>
              <div className={styles.fieldColumn}>
                <Typography.Text bold>Lugar</Typography.Text>
                <Typography.Label light className={styles.descriptionField}>Donde quieres que se publiciten tus cupones</Typography.Label>
              </div>
              <div className={styles.selectColumn}>
                <Field name="country"
                      reduxFormInput
                      component={Select}
                      labelText="País"
                      placeholder="Seleccione un país"
                      options={countries}/>
                <Field name="city"
                      reduxFormInput
                      component={Select}
                      labelText="Ciudad"
                      placeholder="Seleccione una ciudad"
                      options={cities}/>
              </div>
            </div>
            <div className={cx(styles.row, styles.row_padding)}>
              <div className={styles.fieldColumn}>
                <Typography.Text bold>Rango de edad</Typography.Text>
                <Typography.Label light className={styles.descriptionField}>Personas a las que eliges por segmentación</Typography.Label>
              </div>
              <div className={styles.selectColumn}>
                <Field name="initialAgeRange"
                        reduxFormInput
                        component={InputBox}
                        type="number"
                        labelText="Desde"
                        placeholder="Seleccione un numero"
                        className={styles.select}/>
                <Field name="finalAgeRange"
                        reduxFormInput
                        component={InputBox}
                        type="number"
                        labelText="Hasta"
                        placeholder="Seleccione un numero"
                        className={styles.select}/>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}

export default SecondStep;