import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { withApollo } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { createOffice, getMyCompany, makerOffices } from 'Services/graphql/queries.graphql';
import { graphql } from 'react-apollo';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

class NewOfficePage extends Component {

  updateOffice = (cache, { data: {addOffice} }) => {
    try {
      const data = cache.readQuery({ query: makerOffices });
      data.myOffices = [addOffice, ...data.myOffices]
      cache.writeQuery({ query: makerOffices, data: data });
    } catch (err) {
      this.showErrorNotification(err);
    }

    if(addOffice.id === -1) {
      this.goToOffices();
    }else{
      this.showSuccessNotification();
    }
  }

  showSuccessNotification = () => {
    toast(
      <ToastTemplate
        title={<FormattedMessage id='office.toasts.success.create.title' />}
        subtitle={<FormattedMessage id='office.toasts.success.create.subtitle' />}
        status='success'
      />
    )
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='office.toasts.error.create.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  goToOffices = () =>{
    this.props.history.push('/offices')
  }

  createOffice = async (values) => {
    const { data: { myCompany }, client: { mutate } } = this.props;
    try {
      await mutate({
        mutation: createOffice,
        variables: {
          ruc: values.ruc,
          economicActivity: values.economicActivity,
          contributorType: values.contributorType,
          legalRepresentative: values.legalRepresentative,
          name: values.name,
          officePhone: values.officePhone,
          cellPhone: values.cellPhone,
          address: values.address,
          email: values.email,
          companyId: myCompany.id
        },
        optimisticResponse: {
          __typename: "Mutation",
          addOffice: {
            __typename: "Office",
            id: -1,
            ruc: values.ruc,
            economicActivity: values.economicActivity,
            contributorType: values.contributorType,
            legalRepresentative: values.legalRepresentative,
            name: values.name,
            officePhone: values.officePhone,
            cellPhone: values.cellPhone,
            address: values.address,
            email: values.email,
            companyId: myCompany.id
          }
        },
        update: this.updateOffice
      });
    } catch (err) {
      this.showErrorNotification(err);
    }
  }

  render() {
    const data = [
      { id: 0, label: 'Representante', icon: 'FaUser', tooltip: 'Representante', active: true },
      { id: 1, label: 'Sucursal', icon: 'FaHome', tooltip: 'Sucursal', active: false }
    ];
    return <StepsContainer steps={data} onSubmit={this.createOffice}/>
  }
}

export default graphql(getMyCompany)(withApollo(injectIntl(NewOfficePage)));
