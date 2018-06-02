import React from 'react';
import { Typography, Table } from 'coupon-components';
import { injectIntl } from 'react-intl';

import styles from '../OfficesPage.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const RowOffice = ({ className, data, onClick, isOpen, intl }) => {
  const formatDataTable = (data) => {

    const rows = [{
      ruc:  <Typography.Text small>{data.ruc}</Typography.Text>,
      legalRepresentative: <Typography.Text small>{data.legalRepresentative}</Typography.Text>,
      cellPhone: <Typography.Text small>{data.cellPhone}</Typography.Text>,
    }];

    const tableData = {
      columns: [
        {
          field: 'ruc',
          title: <Typography.Text bold>{intl.formatMessage({id: 'office.new.ruc.label'})}</Typography.Text>
        },
        {
          field: 'legalRepresentative',
          title: <Typography.Text bold>{intl.formatMessage({id: 'office.new.legalRepresentative.label'})}</Typography.Text>
        },
        {
          field: 'cellPhone',
          title: <Typography.Text bold>{intl.formatMessage({id: 'office.new.cellPhone.label'})}</Typography.Text>
        },
      ],
      rows: rows
    }
    return tableData;
  }

  const tableData = data ? formatDataTable(data) : [];

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
        <div className={styles.contacts}>
          <Typography.Label lighter style={{margin:0}}>
            Telf: {data.officePhone}
          </Typography.Label>
          <Typography.Label lighter style={{margin:0}}>
            Email: {data.email}
          </Typography.Label>
        </div>
      </div>
      {isOpen && <Table columns={tableData.columns} rows = {tableData.rows} />}
    </div>
  )
};

export default injectIntl(RowOffice);
