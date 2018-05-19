import React from 'react';
import { Typography, Icon } from 'coupon-components';
import classNames from 'classnames/bind';
import styles from './ToastTemplate.css';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles)

class ToastTemplate extends React.Component {

  render() {
    const {
      title,
      subtitle,
      iconProps,
      status,
    } = this.props

    const copyIconProps = iconProps || {};

    const toastsIcon = {
      success: {
        color: palette.toastSuccess,
        name: copyIconProps.name || 'MdCheckCircle',
        size: 25,
      },
      warning: {
        color: palette.toastWarning,
        name: copyIconProps.name || 'MdWarning',
        size: 25,
      },
      error: {
        color: palette.toastError,
        name: copyIconProps.name || 'MdError',
        size: 25,
      },
      info: {
        color: palette.toastInfo,
        name: copyIconProps.name || 'MdInfo',
        size: 25,
      }
    }

    const iconConfig = toastsIcon[status] || null;
    const iconFields =  iconConfig || iconProps;
    const titleColor = iconConfig ? iconConfig.color : null;

    const template = (
      <div className={cx(styles.toast)}>
        {
          iconFields &&
          <div className={styles.icon}>
            <Icon {...iconFields}/>
          </div>
        }
        <div className={styles.message}>
          {
            title &&
            <Typography.Text bold style={{color: titleColor}}>
              {title}
            </Typography.Text>
          }
          { subtitle &&
            <Typography.Text small className={styles.subtitle}>
              {subtitle}
            </Typography.Text>
          }
        </div>
      </div>
    )

    return (
      <div className={cx(styles.container)}>
        {template}
      </div>
    );
  }
}

export default ToastTemplate
