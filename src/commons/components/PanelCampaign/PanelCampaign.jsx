import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
import { Typography } from 'coupon-components';
import CoverText from 'Components/CoverText/CoverText';
import styles from './PanelCampaign.css';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles);

class PanelCampaign extends Component {

  render() {
    const { intl, campaign } = this.props;
    return (
      <div className={cx(styles.containerCampaign)}>
        <div className={styles.header}>
          <CoverText
            campaign={campaign}
          />
        </div>
        <div className={styles.panelInformation}>
          <div className={styles.panelSplit}>
            <div className={styles.left}>
              <Typography.Text bold>
                Sucursal
              </Typography.Text>
              <Typography.Text small small style={{marginBottom:'10px'}}>
                {campaign.office.address}
              </Typography.Text>
            </div>
            <div className={styles.rigth}>
              <Typography.Text bold>
                Cupones Creados
              </Typography.Text>
              <Typography.Text small small style={{marginBottom:'10px'}}>
                {campaign.totalCoupons}
              </Typography.Text>
            </div>
          </div>
          <div className={styles.left}>

            <Typography.Text bold>
              {intl.formatMessage({ id: 'campaigns.show.labels.description' })}
            </Typography.Text>
            <Typography.Text small style={{marginBottom:'10px'}}>
              {campaign && campaign.description}
            </Typography.Text>
            <Typography.Text bold>
              Terminos y Condiciones
            </Typography.Text>
            <Typography.Text small style={{marginBottom:'10px'}}>
              {campaign && campaign.customMessage}
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
