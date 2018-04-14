import React, { Component } from 'react';
import { Typography, Icon, Panel, Button } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import RowOffice from './partials/RowOffice';

import styles from './Offices.css';
import * as palette from 'Styles/palette.css';

class Offices extends Component {
  render() {
    const { intl, changeSection } = this.props;
    const myOffices = [
      {
        "id": 0,
        "name": "Sucursal 1",
        "address": "Av 24 de Mayo y 10 de Agosto",
        "officePhone": '072567345',
        "email": 'admin@example.com'
      },
      {
        "id": 1,
        "name": "Sucursal 2",
        "address": "Centro comercial la pradera",
        "officePhone": '072557346',
        "email": 'admin@example.com'
      },
    ];
    const total = myOffices ? myOffices.length : 0;

    const tableOffices = (
      <div className={styles.table}>
        {myOffices && myOffices.map((office) => {
          const key = { key: office.id };
          return (
            <RowOffice {...key}
              name={office.name}
              address={office.address}
              officePhone={office.officePhone}
              email={office.email}
              className={styles.row}
            />
          )
        })}
        <div className={styles.btnCreate}>
          <Button
            onClick={changeSection}
            text={intl.formatMessage({id: 'profile.myOffices.new'})}
            shape="pill"
          />
        </div>
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
