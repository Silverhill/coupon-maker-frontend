import React, { Component } from 'react';
import { Typography, Icon, Panel, Card, Cover, InputFile, Button } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import RowOffice from './partials/RowOffice';

import { Query } from 'react-apollo';
import { makerOffices, getMyCompany } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';
import { changeLogoCompany } from 'Services/graphql/queries.graphql';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';

import styles from './OfficesPage.css';
import * as palette from 'Styles/palette.css';

class OfficesPage extends Component {
  state ={
    currentOffice:'',
    isLoadingImage: false
  };

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='myCompany.toasts.error.update.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  onEdit = (id) => {
    this.props.history.push(`/company/${id}/edit`)
  }

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
    } catch (err) {
      this.showErrorNotification(err);
    }
    this.setState({isLoadingImage: false});
  }


  render() {
    const { intl } = this.props;
    const { currentOffice, isLoadingImage } = this.state;

    const companyquery = (
      <Query query={getMyCompany}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { myCompany } = data;
          let placeholderCompany = 'http://www.lavenderceiling.com/wp-content/uploads/2016/08/logo_placehold.jpg';
          let companyLogo = myCompany.logo || placeholderCompany;

          return (
            <div className={styles.companyView}>
              <InputFile updateFile={this.changeImage} isLoading={isLoadingImage} className={styles.cover}>
                <Cover
                  logo={companyLogo}
                  backgroundColor="#f7f7f7"
                  image="https://previews.123rf.com/images/flameandstar/flameandstar1511/flameandstar151100006/48071268-life-in-the-city-picture-in-flat-design-blue-background-taxi-cars-bicycle.jpg"
                  leftLabel={intl.formatMessage({id: 'myCompany.slogan'})}
                  leftText={myCompany.slogan || "Aqui va tu slogan (Ejm, Enganchate conmigo)" }
                  rightLabel={intl.formatMessage({id: 'myCompany.company'})}
                  rightText={myCompany.businessName}
                />
              </InputFile>
              <div className={styles.editButton}>
                <Button neutral text='Editar Empresa' onClick={() => this.onEdit(myCompany.id)}/>
              </div>
            </div>
          );
        }}
      </Query>
    )

    const emptyState = (
      <div className={styles.emptyState}>
        <Icon
          name="MdStore"
          color={palette.highColorEmptyState}
          size={50}
          style={
            {
              margin: 20,
              padding: 30,
              background: palette.lowColorEmptyState,
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

    const tableOffices = (
      <Query query={makerOffices}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { myOffices } = data;
          const total = myOffices ? myOffices.length : 0;

          return (
            <div>
              { total === 0 && emptyState}
              { total > 0 &&
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
              }
            </div>
          );
        }}
      </Query>
    )

    return (
      <Card title={intl.formatMessage({id: 'myCompany.title'})}
            classNameCard={styles.offices}
            style={{position: 'relative'}}>
        {companyquery}
        <Panel title={intl.formatMessage({id: 'myOffices.panelTitle'})}
          className={styles.panel}>
          {tableOffices}
        </Panel>
      </Card>
    )
  }
}

export default withApollo(injectIntl(OfficesPage));
