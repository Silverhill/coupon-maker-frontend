import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { getCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import { Typography, Icon, Panel, Card, BasicRow } from 'coupon-components';

import styles from './ShowCampaign.css';
import * as palette from 'Styles/palette.css';

class ShowCampaing extends Component {
  render() {
    const { data: {campaign, error}, intl } = this.props;
    const placeholderImage = 'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg';
    let stylesImage = {backgroundImage: `url(${campaign && campaign.image || placeholderImage})`}
    const hunters = [
      {
        name: 'Khal Drogo',
        email: 'khaldrogo@gmail.com',
        image: 'https://i.pinimg.com/originals/78/df/55/78df55e142774e705484324c944a0bb7.jpg',
        totalCoupons: 10,
        id: 1
      },
      {
        name: 'Hodor Harries',
        email: 'hodor@gmail.com',
        image: 'http://www.mariapicasso.com/wp-content/uploads/2015/09/hodor_by_mariapicasso.jpg',
        totalCoupons: 2,
        id: 2
      },
      {
        name: 'Margaery Tyrell',
        email: 'margaerytyrell@gmail.com',
        image: 'https://i.pinimg.com/originals/70/e2/9f/70e29fb0ec6721fcd6d740444c80e2e0.jpg',
        totalCoupons: 4,
        id: 3
      }
    ]
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
      <div className={styles.view}>
        <div className={styles.header} style={stylesImage}>
          <div className={styles.contentText}>
            <div className={styles.linkBtn}>
              <NavLink to='/new_campaign' className={styles.link}>
                {intl.formatMessage({id: 'campaigns.myCampaigns.new'})}
              </NavLink>
            </div>
            <div className={styles.address}>
              <Typography.Text small bold>
                {intl.formatMessage({id: 'campaigns.show.labels.office'})}
              </Typography.Text>
              <Typography.Text small>
                {campaign && campaign.address}
              </Typography.Text>
              <Typography.Text small style={{paddingTop: '5px'}}>
                {
                  moment(campaign && campaign.startAt).format("DD MMM") + ' - ' + moment(campaign && campaign.endAt).format("DD MMM YYYY")
                }
              </Typography.Text>
            </div>
            <div className={styles.coupons}>
              <Typography.Text small>
                {intl.formatMessage({id: 'campaigns.show.labels.available'})}
              </Typography.Text>
              <Typography.Title bold>
                {campaign && campaign.totalCoupons}
              </Typography.Title>
            </div>
          </div>
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
              16 - 20 años
            </Typography.Text>
          </div>
        </div>
        <Panel
          title={intl.formatMessage({id: 'campaigns.show.panel.title'})}
          className={styles.panel}>
            {hunters && hunters.map((cpg) => {
              const key = { key: cpg.id };
              return (
                <BasicRow {...key}
                  title={cpg.name}
                  image={cpg.image}
                  subtitle={cpg.email}
                  label= 'Total Coupons'
                  number={cpg.totalCoupons}
                  className={styles.row}
                />
              )
            })}
        </Panel>
      </div>
    )
    return (
      <div className={styles.container}>
        <Card title={intl.formatMessage({id: 'campaigns.show.card.title'})}>
          { error ? notFound : viewCampaign}
        </Card>
      </div>
    )
  }
}

export default graphql(getCampaign, {options: (props) => ({
  variables: {
    id: props.match.params.id
  }
}),})(injectIntl(ShowCampaing));

