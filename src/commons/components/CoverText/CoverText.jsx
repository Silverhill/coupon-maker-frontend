import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Cover.css'
import { Typography } from 'coupon-components';
import * as palette from 'Styles/palette.css'
import * as illustrations from 'Utils/illustrations';
import * as constants from 'Utils/values';
import EmptyState from 'Components/EmptyState/EmptyState';

const cx = classNames.bind(styles)

class CoverText extends Component {

  render () {
    const {
      className,
      background,
      title,
      rangeAge,
    } = this.props

    return (
      <div className={cx(styles.container, className)}>
        <div className={cx(styles.cover)}>
          <div className={styles.coverWave}>
            <EmptyState
              name='wave'
              neutralColor={background || "#FF007C"}
              width="255px"
            />
          </div>
          <div className={styles.contentText}>
            <div className={styles.address}>
              <Typography.Title bold style={{color: palette.dark, fontSize:'30px', marginBottom:'10px'}}>
                {title}
              </Typography.Title>
              <div className={styles.info}>
                <div className={styles.segmentation}>
                  <Typography.Text small bold>
                    Segmentacion
                  </Typography.Text>
                  <div className={styles.icons}>
                    {
                      rangeAge && rangeAge.map((range, index)=>{
                        const age = constants.agesRangesObject[range];
                        const icon = illustrations.faces[age.type];
                        return (
                          <div className={styles.icon} key={index}>
                            {icon}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className={styles.totalCoupons}>
                  <Typography.Text small bold>
                    Cupones creados
                  </Typography.Text>
                  <Typography.Title bold>
                    384
                  </Typography.Title>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CoverText.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  background: PropTypes.string,
  rangeAge: PropTypes.array
}

export default CoverText;
