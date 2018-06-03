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
            title={campaign && campaign.title}
            rangeAge={campaign && campaign.rangeAge}
            background={campaign.background}
          />
        </div>
        <div className={styles.panelInformation}>
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
