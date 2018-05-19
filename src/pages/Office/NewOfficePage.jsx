import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { withApollo } from 'react-apollo';
import { createOffice, getMyCompany, makerOffices } from 'Services/graphql/queries.graphql';
import { graphql } from 'react-apollo';
import { toast, Flip } from 'react-toastify';

class NewOfficePage extends Component {

  toastId = 'officeToast';

  notify = () => this.toastId = toast("Almacenando....", { autoClose: false });

  update = () => toast.update(this.toastId, {
    render: 'Guardado',
    type: toast.TYPE.SUCCESS,
    autoClose: 2000,
    transition: Flip
  });

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
        update: (cache, { data: {addOffice} }) => {
          const data = cache.readQuery({ query: makerOffices });
          data.myOffices = [addOffice, ...data.myOffices]
          cache.writeQuery({ query: makerOffices, data: data });
          if(addOffice.id === -1) {
            this.goToOffices();
            this.notify();
          }else{
            this.update();
          }
        }
      });
    } catch (err) {
      const errors = err;
      errors.graphQLErrors.map((value)=>{
        toast(value.message, { type: toast.TYPE.ERROR, autoClose: 5000 });
      })
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
