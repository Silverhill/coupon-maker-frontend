import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCampaign, huntersCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import { Typography, Icon, Panel, Card, BasicRow, Cover } from 'coupon-components';

import styles from './ShowCampaign.css';
import * as palette from 'Styles/palette.css';

class ShowCampaing extends Component {
  render() {
    const { intl } = this.props;

    const anyHunter = (
      <div className={styles.notFound}>
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          Aun nadie a tomado esta promoción
        </Typography.Text>
      </div>
    )

    const hunters = (
      <Query query={huntersCampaign} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const {hunters} = data;
          const total = hunters ? hunters.length : 0;
          return (
            <div>
              {total === 0 && anyHunter}
              {total > 0 &&
                hunters && hunters.map((cpg) => {
                  const key = { key: cpg.id };
                  return (
                    <BasicRow {...key}
                      title={cpg.name}
                      image={cpg.image}
                      subtitle={cpg.email}
                      label= 'Total Coupons'
                      number= {cpg.couponsInCampaign}
                      className={styles.row}
                    />
                  )
                })
              }
            </div>
          );
        }}
      </Query>
    )

    const notFound = (
      <div className={styles.notFound}>
        <Typography.Text bold style={{fontSize:'40px'}}>
          404
        </Typography.Text>
        <Icon
          name="FaBullhorn"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 10,
              padding: 30,
              background: palette.baseGrayLow,
              borderRadius: '50%'
            }
          }
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          No hemos encontrado la campaña que estas buscando
        </Typography.Text>
      </div>
    )
    const viewCampaign = (
      <Query query={getCampaign} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return notFound;
          const {campaign} = data;
          const placeholderImage = 'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg';
          const imageCover = campaign && campaign.image || placeholderImage
          const stylesStatus = campaign && campaign.status === "expired" ?
                            {color: palette.dark, backgroundColor: palette.baseGrayMedium} :
                            {color: palette.whiteColor, backgroundColor: palette.primaryColor};
          return (
            <div className={styles.view}>
              <div className={styles.header}>
                <Cover
                  status={campaign && campaign.status}
                  image={imageCover}
                  leftLabel={intl.formatMessage({id: 'campaigns.show.labels.office'})}
                  leftText= {
                    moment(campaign && campaign.startAt).format("DD MMM") + ' - ' + moment(campaign && campaign.endAt).format("DD MMM YYYY")
                  }
                  rightLabel={intl.formatMessage({id: 'campaigns.show.labels.available'})}
                  rightText={campaign && String(campaign.totalCoupons)}
                  stylesStatus={stylesStatus}
                />
              </div>
              <div className={styles.panelInformation}>
                <div className={styles.left}>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.title'})}
                  </Typography.Label>
                  <Typography.Text>
                    {campaign && campaign.title}
                  </Typography.Text>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.description'})}
                  </Typography.Label>
                  <Typography.Text small>
                    {campaign && campaign.description}
                  </Typography.Text>
                </div>
                <div className={styles.right}>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.segmentation'})}
                  </Typography.Label>
                  <div className={styles.icons}>
                    <Icon
                      name="FaMale"
                      color={palette.baseGray}
                      size={25}
                    />
                    <Icon
                      name="FaFemale"
                      color={palette.baseGray}
                      size={25}
                    />
                  </div>
                  <Typography.Text small>
                    {campaign && campaign.initialAgeRange} - {campaign && campaign.finalAgeRange} años
                  </Typography.Text>
                </div>
              </div>
              <Panel
                title={intl.formatMessage({id: 'campaigns.show.panel.title'})}
                className={styles.panel}>
                  {hunters}
              </Panel>
            </div>
          );
        }}
      </Query>
    )
    return (
      <div className={styles.container}>
        <Card title={intl.formatMessage({id: 'campaigns.show.card.title'})}>
          {viewCampaign}
        </Card>
      </div>
    )
  }
}

export default injectIntl(ShowCampaing);

