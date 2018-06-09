import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
import { Typography } from 'coupon-components';
import CoverText from 'Components/CoverText/CoverText';
import styles from './PanelCampaign.css';

const cx = classNames.bind(styles);

class PanelCampaign extends Component {

  render() {
    const { intl, campaign } = this.props;
    const margin = {marginBottom:'15px'};
    const currentCampaign = campaign || {};
    const description = currentCampaign.description || 'No se agrego ninguna description de esta campaña'
    const customMessage = currentCampaign.customMessage || 'No se agrego ningun Termino o Condicion de esta campaña'

    return (
      <div className={cx(styles.containerCampaign)}>
        <div className={styles.header}>
          <CoverText
            campaign={currentCampaign}
          />
        </div>
        <div className={styles.panelInformation}>
          <div className={styles.panelSplit}>
            <div className={styles.left}>
              <Typography.Text bold>
                Sucursal
              </Typography.Text>
              <Typography.Text small style={margin}>
                {currentCampaign.office.address}
              </Typography.Text>
            </div>
            <div className={styles.rigth}>
              <Typography.Text bold>
                Cupones Creados
              </Typography.Text>
              <Typography.Text small style={margin}>
                {currentCampaign.totalCoupons}
              </Typography.Text>
            </div>
          </div>
          <div className={styles.left}>
            <Typography.Text bold>
              {intl.formatMessage({ id: 'campaigns.show.labels.description' })}
            </Typography.Text>
            <Typography.Text small style={margin}>
              {description}
            </Typography.Text>
            <Typography.Text bold>
              Terminos y Condiciones
            </Typography.Text>
            <Typography.Text small style={margin}>
              {customMessage}
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
