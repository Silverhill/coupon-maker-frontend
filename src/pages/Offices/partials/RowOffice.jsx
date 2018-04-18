import React from 'react';
import { Typography } from 'coupon-components';

import styles from '../OfficesPage.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const RowOffice = ({ className, name, address, officePhone, email }) => {
  return (
    <div className={cx(styles.rowContainer, className)}>
      <div className={styles.information}>
        <Typography.Subtitle bold>
          {name}
        </Typography.Subtitle>
        <Typography.Label small lighter style={{margin:0}}>
          {address}
        </Typography.Label>
      </div>
      <div className={styles.information}>
        <Typography.Label lighter style={{margin:0}}>
          Telf: {officePhone}
        </Typography.Label>
        <Typography.Label lighter style={{margin:0}}>
          Email: {email}
        </Typography.Label>
      </div>
    </div>
  )
};

export default RowOffice;
