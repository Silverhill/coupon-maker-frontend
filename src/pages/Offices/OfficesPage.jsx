import React, { Component } from 'react';
import { Typography, Icon, Panel, Card, Cover, InputFile } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import RowOffice from './partials/RowOffice';

import { graphql } from 'react-apollo';
import { makerOffices, getMyCompany } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';
import { changeLogoCompany } from 'Services/graphql/queries.graphql';

import styles from './OfficesPage.css';
import * as palette from 'Styles/palette.css';

class OfficesPage extends Component {
  state ={
    currentOffice:'',
    isLoadingImage: false
  };

  selectRowOffice(office){
    const { currentOffice } = this.state;
    if(currentOffice !== office.id){
      this.setState({currentOffice: office.id});
    }else {
      this.setState({currentOffice: ''});
    }
  }
  changeImage = async (ev, value) => {
    const { client: { mutate } } = this.props;
    this.setState({isLoadingImage: true});
    try {
      await mutate({
        mutation: changeLogoCompany,
        variables: {
          upload: value.file
        },
        optimisticResponse: {
          __typename: "Mutation",
          addImageToCompany: {
            __typename: "Company",
            id: -1,
            logo: value.imagePreviewUrl,
          }
        },
        update: (cache, { data: {addImageToCompany} }) => {
          const data = cache.readQuery({ query: getMyCompany});
          data.myCompany.logo = addImageToCompany.logo;
          cache.writeQuery({ query: getMyCompany, data: data });
        }
      });
      this.setState({isLoadingImage: false});
    } catch (error) {
      return;
    }
  }


  render() {
    const { intl, data: { myOffices, myCompany } } = this.props;
    const { currentOffice, isLoadingImage } = this.state;
    const total = myOffices ? myOffices.length : 0;
    const company = myCompany ? myCompany : {};
    let placeholderCompany = 'http://www.lavenderceiling.com/wp-content/uploads/2016/08/logo_placehold.jpg';
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
        <InputFile updateFile={this.changeImage} isLoading={isLoadingImage}>
          <Cover
            logo={companyLogo}
            backgroundColor="#f7f7f7"
            image="https://previews.123rf.com/images/flameandstar/flameandstar1511/flameandstar151100006/48071268-life-in-the-city-picture-in-flat-design-blue-background-taxi-cars-bicycle.jpg"
            leftLabel={intl.formatMessage({id: 'myCompany.slogan'})}
            leftText="Aqui va tu slogan(Ejm, Enganchate conmigo)"
            rightLabel={intl.formatMessage({id: 'myCompany.company'})}
            rightText={company.businessName}/>
        </InputFile>
        <Panel title={intl.formatMessage({id: 'myOffices.panelTitle'})}
          className={styles.panel}>
          { total === 0 && emptyState}
          { total > 0 && tableOffices}
        </Panel>
      </Card>
    )
  }
}

export default graphql(makerOffices, { options: () => ({
  variables: { withCompany: true }
}) })(withApollo(injectIntl(OfficesPage)));
