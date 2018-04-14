import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { createOffice, getMyCompany } from 'Services/graphql/queries.graphql';
import { graphql, compose } from 'react-apollo';

@connect(state => ({
  form: state.form.create_office
}))
class NewOffice extends Component {

  createOffice = async (values = {}) => {
    const { form, changeSection, data: { myCompany } } = this.props;
    const { client: { mutate } } = this.props;
    try {
      await mutate({
        mutation: createOffice,
        variables: {
          ruc: form.values.ruc,
          economicActivity: form.values.economicActivity,
          contributorType: form.values.contributorType,
          legalRepresentative: form.values.legalRepresentative,
          name: form.values.name,
          officePhone: form.values.officePhone,
          cellPhone: form.values.cellPhone,
          address: form.values.address,
          email: form.values.email,
          companyId: myCompany.id
        }
      });
      changeSection();
    } catch (error) {
      return;
    }
  }

  render() {
    const data = [
      { id: 0, label: 'Representante', icon: 'FaUser', tooltip: 'Representante', active: true },
      { id: 1, label: 'Sucursal', icon: 'FaHome', tooltip: 'Sucursal', active: false }
    ];
    const { changeSection } = this.props;
    return <StepsContainer steps={data} changeSection={changeSection} onSubmit={this.createOffice}/>
  }
}

export default graphql(getMyCompany)(withApollo(NewOffice));