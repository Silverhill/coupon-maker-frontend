import React, { Component } from 'react';
import { Typography, Icon, Panel, Card } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import RowOffice from './partials/RowOffice';

import { graphql } from 'react-apollo';
import { makerOffices } from 'Services/graphql/queries.graphql';

import styles from './OfficesPage.css';
import * as palette from 'Styles/palette.css';

class OfficesPage extends Component {
  render() {
    const { intl, data: { myOffices } } = this.props;
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
        <div className={styles.linkBtn}>
          <NavLink to='/new_office' className={styles.link}>
            <FormattedMessage id='myOffices.new' />
          </NavLink>
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
          <FormattedMessage id='myOffices.empty' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='myOffices.description' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='myOffices.tip' />
        </Typography.Text>
        <div className={styles.linkBtn}>
          <NavLink to='/new_office' className={styles.link}>
            <FormattedMessage id='myOffices.new' />
          </NavLink>
        </div>
      </div>
    )

    return (
      <Card title={intl.formatMessage({id: 'myOffices.title'})}
            classNameCard={styles.offices}
            style={{position: 'relative'}}>
        <Panel title={intl.formatMessage({id: 'myOffices.panelTitle'})}
          className={styles.panel}>
          { total === 0 && emptyState}
          { total > 0 && tableOffices}
        </Panel>
      </Card>
    )
  }
}

export default graphql(makerOffices)(injectIntl(OfficesPage));
