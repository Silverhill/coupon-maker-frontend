import React, { Component } from 'react';
import { Typography, Icon, Panel, Button } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './Offices.css';
import * as palette from 'Styles/palette.css';

class Offices extends Component {
  render() {
    const { intl, myOffices, changeSection } = this.props;
    const total = myOffices ? myOffices.length : 0;

    const tableOffices = (
      <div className={styles.table}>
        | Listado
      </div>
    )
    const emptyState = (
      <div className={styles.emptyState}>
        <Icon
          name="FaHome"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 20,
              padding: 30,
              background: palette.baseGrayLow,
              borderRadius: '50%'
            }
          }
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          <FormattedMessage id='profile.myOffices.empty' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='profile.myOffices.description' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='profile.myOffices.tip' />
        </Typography.Text>
        <div className={styles.btnCreate}>
          <Button
            onClick={changeSection}
            text={intl.formatMessage({id: 'profile.myOffices.new'})}
            shape="pill"
          />
        </div>
      </div>
    )

    return (
      <div className={styles.offices}>
        <Panel title={intl.formatMessage({id: 'profile.myOffices.panelTitle'})}
          className={styles.panel}>
          { total === 0 && emptyState}
          { total > 0 && tableOffices}
        </Panel>
      </div>
    )
  }
}

export default (injectIntl(Offices));
