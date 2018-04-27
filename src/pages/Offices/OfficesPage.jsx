import React, { Component } from 'react';
import { Typography, Icon, Panel, Card, Cover } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import RowOffice from './partials/RowOffice';

import { graphql, compose } from 'react-apollo';
import { makerOffices, getMyCompany } from 'Services/graphql/queries.graphql';

import styles from './OfficesPage.css';
import * as palette from 'Styles/palette.css';

class OfficesPage extends Component {
  state ={
    currentOffice:'',
  };

  selectRowOffice(office){
    const { currentOffice } = this.state;
    if(currentOffice !== office.id){
      this.setState({currentOffice: office.id});
    }else {
      this.setState({currentOffice: ''});
    }
  }

  render() {
    const { intl, data: { myCompany, myOffices } } = this.props;
    const { currentOffice } = this.state;
    const total = myOffices ? myOffices.length : 0;
    const company = myCompany ? myCompany : {};
    let placeholderCompany = 'https://www.dropque.com/assets/placeholder-company-5f3438282f524800f1d49cd2921bb0a56101e1aa16097ebd313b64778fc7c4bd.png';
    let companyLogo = company && company.logo ? company.logo : placeholderCompany;

    const tableOffices = (
      <div className={styles.table}>
        {myOffices && myOffices.map((office) => {
          const key = { key: office.id };
          let isOpen = office.id === currentOffice;
          return (
            <RowOffice {...key}
              data={office}
              className={styles.row}
              isOpen={isOpen}
              onClick={()=>{this.selectRowOffice(office)}}
            />
          )
        })}
        <div className={styles.linkBtn}>
          <NavLink to='/new_office' className={styles.link}>
            <FormattedMessage id='myOffices.new' />
          </NavLink>
        </div>
      </div>
    )
    const emptyState = (
      <div className={styles.emptyState}>
        <Icon
          name="FaHome"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 20,
              padding: 30,
              background: palette.baseGrayLow,
              borderRadius: '50%'
            }
          }
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          <FormattedMessage id='myOffices.empty' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='myOffices.description' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='myOffices.tip' />
        </Typography.Text>
        <div className={styles.linkBtn}>
          <NavLink to='/new_office' className={styles.link}>
            <FormattedMessage id='myOffices.new' />
          </NavLink>
        </div>
      </div>
    )

    return (
      <Card title={intl.formatMessage({id: 'myCompany.title'})}
            classNameCard={styles.offices}
            style={{position: 'relative'}}>
        <Cover logo={companyLogo}
          leftLabel={intl.formatMessage({id: 'myCompany.slogan'})}
          leftText="Aqui va tu slogan(Ejm, Enganchate conmigo)"
          rightLabel={intl.formatMessage({id: 'myCompany.company'})}
          rightText={company.businessName}/>
        <Panel title={intl.formatMessage({id: 'myOffices.panelTitle'})}
          className={styles.panel}>
          { total === 0 && emptyState}
          { total > 0 && tableOffices}
        </Panel>
      </Card>
    )
  }
}

export default graphql(makerOffices)(injectIntl(OfficesPage));
