import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { withApollo } from 'react-apollo';
import { createOffice, getMyCompany, makerOffices } from 'Services/graphql/queries.graphql';
import { graphql } from 'react-apollo';

class NewOfficePage extends Component {

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
        refetchQueries: [{query: makerOffices}]
      });
      this.goToOffices();
    } catch (err) {
      console.log('err', err.message);
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

export default graphql(getMyCompany)(withApollo(NewOfficePage));
