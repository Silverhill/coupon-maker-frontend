import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import { makerCampaigns } from 'Services/graphql/queries.graphql';
import { Card, Typography, Icon, BasicRow, Panel } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { maxnum } from 'Utils/filters';

import styles from './Campaigns.css';
import * as palette from 'Styles/palette.css';

class Campaigns extends Component {
  render() {
    const {intl, history } = this.props;

    const btnLink = (
      <div className={styles.linkBtn}>
        <NavLink to='/new_campaign' className={styles.link}>
          <FormattedMessage id='campaigns.myCampaigns.new' />
        </NavLink>
      </div>
    )

    const view = (
      <div className={styles.container}>
        <Query query={makerCampaigns} variables={{limit:10, sortDirection:-1}}>
          {({ loading, error, data}) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            const {myCampaigns: {campaigns} } = data;
            const total = campaigns ? campaigns.length : 0;
            return (
              <div>
                {total === 0 && emptyState}
                {total > 0 &&
                  <div className={styles.table}>
                    <div>
                      {
                        campaigns && campaigns.map((cpg) => {
                        const key = { key: cpg.id };
                        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
                        return (
                          <BasicRow {...key}
                            title={cpg.title}
                            image={cpg.image}
                            subtitle={cpg.address}
                            label={date}
                            number={maxnum(cpg.totalCoupons)}
                            className={styles.row}
                            onClick={()=>{history.push(`/campaign/${cpg.id}`)}}
                          />
                        )
                      })
                      }
                    </div>
                    {btnLink}
                  </div>
                }
              </div>
            );
          }}
        </Query>
      </div>
    )

    const emptyState = (
      <div className={styles.emptyState}>
        <Icon
          name="MdRecordVoiceOver"
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
        {btnLink}
      </div>
    )

    return (
      <div className={styles.campaigns}>
        <Card title={intl.formatMessage({id: 'campaigns.myCampaigns.title'})}>
          <Panel title={intl.formatMessage({id: 'campaigns.myCampaigns.panelTitle'})}
            className={styles.panel}>
            {view}
          </Panel>
        </Card>
      </div>
    )
  }
}

export default injectIntl(Campaigns);
