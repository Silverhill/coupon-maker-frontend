import React, { Component } from 'react';
import { Panel } from 'coupon-components';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import { InputBox } from 'coupon-components';

import styles from '../../Office/NewOffice.css';

class FirstStep extends Component {
  render() {
    const { intl } = this.props;
    return (
      <div>
        <Panel title={intl.formatMessage({id: 'office.new.firstStep'})} classNameContainer={styles.panel}>
          <Field name="ruc"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'office.new.ruc.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.ruc.label'})}
                className={styles.row_padding}
                type="number"/>
          <Field name="economicActivity"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'office.new.economicActivity.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.economicActivity.label'})}
                className={styles.row_padding}/>
          <Field name="contributorType"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'office.new.contributorType.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.contributorType.label'})}
                className={styles.row_padding}/>
          <Field name="legalRepresentative"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'office.new.legalRepresentative.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.legalRepresentative.label'})}
                className={styles.row_padding}/>
        </Panel>
      </div>
    )
  }
}

export default (injectIntl(FirstStep));