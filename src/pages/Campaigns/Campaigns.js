import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { campaigns } from 'Services/graphql/queries.graphql';
import { Card, Typography, Icon, BasicRow, Panel } from 'coupon-components';
import { FormattedMessage } from 'react-intl';

import styles from './Campaigns.css';
import * as palette from 'Styles/palette.css';

class Campaigns extends Component {
  render() {
    const { data: { myCampaigns } } = this.props;
    const total = myCampaigns ? myCampaigns.length : 0;
    const placeholderImage = 'https://fandog.co/wp-content/plugins/yith-woocommerce-multi-vendor-premium/assets/images/shop-placeholder.jpg';
    const tableCampaigns = (
      <div className={styles.table}>
        {myCampaigns && myCampaigns.map((cpg) => {
          const key = { key: cpg.id };
          return (
            <BasicRow {...key}
              title={cpg.title}
              image={cpg.image || placeholderImage}
              subtitle={cpg.address}
              label="Duracion: "
              description="24 Mayo - 30 Junio"
              number={cpg.totalCoupons}
              className={styles.row}
            />
          )
        })}
        <NavLink to='/new_campaign' className={styles.link}>
          <FormattedMessage id='campaigns.myCampaigns.new' />
        </NavLink>
      </div>
    )
    const emptyState = (
      <div className={styles.emptyState}>
        <Icon
          name="CpTicket"
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
          <FormattedMessage id='campaigns.myCampaigns.empty' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='campaigns.myCampaigns.description' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='campaigns.myCampaigns.tip' />
        </Typography.Text>
        <div className={styles.linkBtn}>
          <NavLink to='/new_campaign' className={styles.link}>
            <FormattedMessage id='campaigns.myCampaigns.new' />
          </NavLink>
        </div>
      </div>
    )

    return (
      <div className={styles.campaigns}>
        <Card title="Mis Campañas">
          <Panel title="Campañas Registradas" className={styles.panel}>
            { total === 0 && emptyState}
            { total > 0 && tableCampaigns}
          </Panel>
        </Card>
      </div>
    )
  }
}

export default graphql(campaigns)(Campaigns);
