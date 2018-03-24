import React from 'react';
import { Typography, Icon } from 'coupon-components';
import classNames from 'classnames/bind';
import styles from './Footer.css';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles)

class Footer extends React.Component {

  render() {
    const { tabs, userData } = this.props;

    return (
      <div className={cx(styles.container)}>
        <div className={cx(styles.footer)}>
          <div className={cx(styles.logo)}>
            <Logo/>
            <Typography.Subtitle bold style={{color: "#9b9b9b"}}>2017</Typography.Subtitle>
          </div>
          <Typography.Subtitle light style={{color: "#ff4a67"}}>Contactanos</Typography.Subtitle>
          <div className={cx(styles.logo)}>
            <Icon name="FaFacebook" color='#1e477b' size={20}/>
            <Icon name="FaInstagram" color='#285b9e' size={20}/>
            <Icon name="FaTwitter" color='#0093b5' size={20}/>
            <Icon name="FaPinterestP" color='#b93326' size={20}/>
          </div>
        </div>
      </div>
  );
  }
}

export default Footer