import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { injectIntl } from 'react-intl';
import styles from './Cover.css'
import { Typography, Avatar, Tooltip } from 'coupon-components';
import * as palette from 'Styles/palette.css'
import * as illustrations from 'Utils/illustrations';
import * as constants from 'Utils/values';
import EmptyState from 'Components/EmptyState/EmptyState';
import { maxnum } from 'Utils/filters';
import moment from 'moment';

const cx = classNames.bind(styles)

class CoverText extends Component {

  render () {
    const {
      className,
      campaign,
      intl,
    } = this.props

    const currentCampaign = campaign || {};
    const rangeAge = currentCampaign.rangeAge || [];
    const background = currentCampaign.background || '#FF007C';
    const title = currentCampaign.title || 'Unknow';
    const date = moment(currentCampaign.startAt).format("DD MMM") + ' - ' + moment(currentCampaign.endAt).format("DD MMM YYYY");

    return (
      <div className={cx(styles.cover, className)}>
        <div className={styles.coverWave}>
          <EmptyState
            name='wave'
            neutralColor={background}
            width="255px"
          />
        </div>
        <div className={styles.contentText}>
          <div className={cx(styles.title)}>
            <Typography.Title bold style={{color: palette.dark, fontSize:'1.6rem', marginBottom:'10px'}}>
              {title}
            </Typography.Title>
            <Typography.Text small style={{marginBottom:'10px'}}>
              {date}
            </Typography.Text>
          </div>
          <div className={styles.info}>
            <div className={styles.segmentation}>
              <Typography.Text bold small>
                Segmentacion
              </Typography.Text>
              <div className={styles.icons}>
                {
                  campaign.rangeAge && campaign.rangeAge.map((range, index)=>{
                    const age = constants.agesRangesObject[range];
                    const icon = illustrations.faces[age.type];
                    const ranges = age.min + ' - ' + age.max+ ' '+ intl.formatMessage({id: 'common.agesRanges.years'});
                    return (
                      <Tooltip content={ranges} direction="top" key={index}>
                        <div className={styles.icon}>
                          {icon}
                        </div>
                      </Tooltip>
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.promo}>
              <Avatar image={campaign.image} width="120px"/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

CoverText.propTypes = {
  className: PropTypes.string,
  campaign: PropTypes.object,
}

export default injectIntl(CoverText);
