import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Panel, Select } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';

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
          <Field name="countries"
                reduxFormInput
                component={Select}
                labelText="País"
                placeholder="Seleccione un país"
                options={countries}/>
          <Field name="cities"
                reduxFormInput
                component={Select}
                labelText="Ciudad"
                placeholder="Seleccione una ciudad"
                options={cities}/>
        </Panel>
      </div>
    )
  }
}

export default SecondStep;