import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Icon, Preloader } from 'coupon-components';

import styles from './Button.css';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles);

const Button = ({
  text,
  onClick,
  className,
  rightIcon,
  leftIcon,
  color,
  shape,
  gradient,
  customWidth,
  disabled,
  size,
  style,
  loading,
  loaderProps,
  ...other }) => {

  const colorBtn = palette[color] || palette.primaryColor
  let classNames = cx(
    styles.btn,
    shape,
    {
      [styles.gradient]: gradient,
      disabled,
      [styles[size]]: size,
    },
  );
  const copyLoaderProps = loaderProps || {};
  const loaderOptions = {
    size: copyLoaderProps.size || 40,
    color: copyLoaderProps.color || "white"
  }

return (
    <div className={className} {...other}>
      <button
        style={{width:customWidth, backgroundColor: !disabled && colorBtn, ...style}}
        className={classNames}
        onClick={onClick}
      >
        {leftIcon && !loading && <Icon className={styles.leftIcon} name={leftIcon} size={16} />}
        {loading ? <Preloader {...loaderOptions} /> : text}
        {rightIcon && !loading && <Icon className={styles.rightIcon} name={rightIcon} size={16} />}
      </button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  className: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  shape: PropTypes.string,
  customWidth: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
}

export default Button
