import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Coupon2.css'
import { Typography, Avatar, Icon } from 'coupon-components';

import * as palette from 'Styles/palette.css'

const cx = classNames.bind(styles)

class Cupon2 extends Component {
  render () {
    const {
      image,
      logo,
      title,
      address,
      totalCoupons,
      date,
      onClick,
      color,
      className,
      disabled,
      gold,
      patternUrl,
    } = this.props

    const getBackground = (value) => {

      const rgbExp = /rgb\(\d{1,3}\,\d{1,3}\,\d{1,3}\)/;
      const hexExp = /^\#\w{6,8}/;
      const urlExp = /^http/;
      const linearExp = /^linear-gradient/;

      if(rgbExp.test(value) || hexExp.test(value) ){ //hex or RGB
        return {backgroundColor: value}
      }

      if(urlExp.test(value)){ //https
        return {backgroundImage: `url(${value})`, backgroundSize: 'contain'}
      }

      if(linearExp.test(value)){ //linear-gradient
        return {backgroundImage: value}
      }

      return null;
    }

    let stylesImage = {backgroundImage: `url(${image})`}
    let colorCupon = color || palette.accentColorSecondary
    const patternStyles = getBackground(colorCupon)
    colorCupon = disabled ? palette.neutralColorPlain : colorCupon
    colorCupon = gold ? palette.goldGradient : colorCupon
    return (
      <div className={cx(styles.container, className)} onClick={onClick} style={patternStyles}>
        <div className={styles.brandCampaing}>
          <div className={styles.avatar}>
            <Avatar image={logo}/>
          </div>
          <div className={styles.cupons}>
            <Icon
                name="CpTicket"
                color={palette.whiteColor}
                size={15}
                style={{paddingRight: 5}}
              />
            <Typography.Text small lighter style={{color: palette.whiteColor}}>
              {totalCoupons}
            </Typography.Text>
          </div>
        </div>
        <div className={cx(styles.cuponInformation, styles.backgroundPromo)} style={stylesImage}>
          <div className={styles.promo}>
            <Typography.Text small light style={{color: palette.whiteColor}}>
              {date}
            </Typography.Text>
            <Typography.Text lead className={styles.promoTitle} style={{color: palette.whiteColor}}>
              {title}
            </Typography.Text>
            <Typography.Text small light style={{color: palette.whiteColor}}>
              {address}
            </Typography.Text>
          </div>
        </div>
      </div>
    )
  }
}

Cupon2.propTypes = {
  image: PropTypes.string,
  logo: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  address: PropTypes.string,
  totalCoupons: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  gold: PropTypes.bool,
  patternUrl: PropTypes.string,
}

export default Cupon2;
