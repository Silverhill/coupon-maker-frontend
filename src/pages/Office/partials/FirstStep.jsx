import React, { Component } from 'react';
import { Panel, InputBox } from 'coupon-components';
import { injectIntl } from 'react-intl';

import styles from '../NewOffice.css';

class FirstStep extends Component {
  render() {
    const { intl, office } = this.props;
    return (
      <div>
        <Panel title={intl.formatMessage({id: 'office.new.firstStep'})} classNameContainer={styles.panel}>
          <InputBox name="ruc"
                placeholder={intl.formatMessage({id: 'office.new.ruc.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.ruc.label'})}
                className={styles.row_padding}
                type="number"
                value={office && office.ruc}
                required="required"/>
          <InputBox name="economicActivity"
                placeholder={intl.formatMessage({id: 'office.new.economicActivity.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.economicActivity.label'})}
                className={styles.row_padding}
                value={office && office.economicActivity}
                required="required"/>
          <InputBox name="contributorType"
                placeholder={intl.formatMessage({id: 'office.new.contributorType.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.contributorType.label'})}
                className={styles.row_padding}
                value={office && office.contributorType}
                required="required"/>
          <InputBox name="legalRepresentative"
                placeholder={intl.formatMessage({id: 'office.new.legalRepresentative.placeholder'})}
                labelText={intl.formatMessage({id: 'office.new.legalRepresentative.label'})}
                className={styles.row_padding}
                value={office && office.legalRepresentative}
                required="required"/>
        </Panel>
      </div>
    )
  }
}

export default (injectIntl(FirstStep));