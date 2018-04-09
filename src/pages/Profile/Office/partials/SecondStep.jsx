import React, { Component } from 'react';
import { Panel } from 'coupon-components';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import { InputBox } from 'coupon-components';
import classNames from 'classnames/bind';

import styles from '../../Office/NewOffice.css';
const cx = classNames.bind(styles)

class SecondStep extends Component {
  render() {
    const { intl } = this.props;
    return (
      <div>
        <Panel title={intl.formatMessage({id: 'profile.office.new.secondStep'})} classNameContainer={styles.panel}>
          <Field name="name"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'profile.office.new.name.placeholder'})}
                labelText={intl.formatMessage({id: 'profile.office.new.name.label'})}
                className={styles.row_padding}/>
          <Field name="officePhone"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'profile.office.new.officePhone.placeholder'})}
                labelText={intl.formatMessage({id: 'profile.office.new.officePhone.label'})}
                className={cx(styles.row_padding, styles.office_number)}
                type="number"/>
          <Field name="cellPhone"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'profile.office.new.cellPhone.placeholder'})}
                labelText={intl.formatMessage({id: 'profile.office.new.cellPhone.label'})}
                className={cx(styles.row_padding, styles.office_number)}
                type="number"/>
          <Field name="address"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'profile.office.new.address.placeholder'})}
                labelText={intl.formatMessage({id: 'profile.office.new.address.label'})}
                className={styles.row_padding}/>
          <Field name="email"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'profile.office.new.email.placeholder'})}
                labelText={intl.formatMessage({id: 'profile.office.new.email.label'})}
                className={styles.row_padding}
                type="email"/>
        </Panel>
      </div>
    )
  }
}

export default (injectIntl(SecondStep));