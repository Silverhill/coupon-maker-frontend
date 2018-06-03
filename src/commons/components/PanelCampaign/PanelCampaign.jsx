import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
import { Typography, Icon, Cover } from 'coupon-components';
import { maxnum } from 'Utils/filters';

import styles from './PanelCampaign.css';
import * as palette from 'Styles/palette.css';
const cx = classNames.bind(styles);

class PanelCampaign extends Component {

  render() {
    const { intl, campaign } = this.props;
    const placeholderImage = 'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg';
    const imageCover = (campaign && campaign.image) || placeholderImage
    const stylesStatus = campaign && campaign.status === "expired" ?
                      {color: palette.dark, backgroundColor: palette.baseGrayMedium} :
                      {color: palette.whiteColor, backgroundColor: palette.primaryColor};
    return (
      <div className={cx(styles.containerCampaign)}>
        <div className={styles.header}>
          <Cover
            status={campaign && campaign.status}
            image={imageCover}
            leftLabel={intl.formatMessage({ id: 'campaigns.show.labels.office' })}
            leftText={campaign.office.address}
            rightLabel={intl.formatMessage({ id: 'campaigns.show.labels.available' })}
            rightText={maxnum(campaign.totalCoupons)}
            stylesStatus={stylesStatus}
          />
        </div>
        <div className={styles.panelInformation}>
          <div className={styles.left}>
            <Typography.Label small bold>
              {intl.formatMessage({ id: 'campaigns.show.labels.title' })}
            </Typography.Label>
            <Typography.Text>
              {campaign && campaign.title}
            </Typography.Text>
            <Typography.Label small bold>
              {intl.formatMessage({ id: 'campaigns.show.labels.description' })}
            </Typography.Label>
            <Typography.Text small>
              {campaign && campaign.description}
            </Typography.Text>
          </div>
          <div className={styles.right}>
            <Typography.Label small bold>
              {intl.formatMessage({ id: 'campaigns.show.labels.segmentation' })}
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
      </div>
    )
  }
}

PanelCampaign.propTypes = {
  campaign: PropTypes.object,
}

export default injectIntl(PanelCampaign);