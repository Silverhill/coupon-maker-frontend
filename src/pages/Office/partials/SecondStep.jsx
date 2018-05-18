import React, { Component } from 'react';
import { Panel, InputBox } from 'coupon-components';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';

import styles from '../NewOffice.css';
const cx = classNames.bind(styles)

class SecondStep extends Component {
  render() {
    const { intl, office } = this.props;
    return (
      <div>
        <Panel title={intl.formatMessage({id: 'office.new.secondStep'})} classNameContainer={styles.panel}>
          <InputBox name="name"
                placeholder={intl.formatMessage({id: 'office.new.name.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.name.label'})}
                className={styles.row_padding}
                value={office && office.name}
                required="required"/>
          <InputBox name="officePhone"
                placeholder={intl.formatMessage({id: 'office.new.officePhone.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.officePhone.label'})}
                className={cx(styles.row_padding, styles.office_number)}
                type="number"
                value={office && office.officePhone}/>
          <InputBox name="cellPhone"
                placeholder={intl.formatMessage({id: 'office.new.cellPhone.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.cellPhone.label'})}
                className={cx(styles.row_padding, styles.office_number)}
                type="number"
                value={office && office.cellPhone}/>
          <InputBox name="address"
                placeholder={intl.formatMessage({id: 'office.new.address.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.address.label'})}
                className={styles.row_padding}
                value={office && office.address}
                required="required"/>
          <InputBox name="email"
                placeholder={intl.formatMessage({id: 'office.new.email.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.email.label'})}
                className={styles.row_padding}
                type="email"
                value={office && office.email}
                required="required"/>
        </Panel>
      </div>
    )
  }
}

export default (injectIntl(SecondStep));
