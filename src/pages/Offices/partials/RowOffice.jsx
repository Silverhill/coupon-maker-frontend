import React from 'react';
import { Typography } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from '../OfficesPage.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


const RowOffice = ({ className, data, onClick, isOpen, intl }) => {
  return (
    <div className={cx(styles.rowContainer, className)} onClick={onClick}>
      <div className={styles.basicInformation}>
        <div className={styles.information}>
          <Typography.Subtitle bold>
            {data.name}
          </Typography.Subtitle>
          <Typography.Label small lighter style={{margin:0}}>
            {data.address}
          </Typography.Label>
        </div>
        <div className={styles.information}>
          <Typography.Label lighter style={{margin:0}}>
            Telf: {data.officePhone}
          </Typography.Label>
          <Typography.Label lighter style={{margin:0}}>
            Email: {data.email}
          </Typography.Label>
        </div>
      </div>
      {isOpen && <div className={styles.moreInformation}>
        <Typography.Subtitle bold><FormattedMessage id='office.new.legalRepresentative.label' /></Typography.Subtitle>
        <Typography.Label small lighter style={{margin:0}}>{data.ruc}</Typography.Label>
        <Typography.Label small lighter style={{margin:0}}>{data.legalRepresentative}</Typography.Label>
        <Typography.Label small lighter style={{margin:0}}>{data.cellPhone}</Typography.Label>
      </div>}
    </div>
  )
};

export default injectIntl(RowOffice);
