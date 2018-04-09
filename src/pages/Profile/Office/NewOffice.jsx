import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { connect } from 'react-redux';

@connect(state => ({
  form: state.form.create_office
}))
class NewOffice extends Component {

  createOffice = async (values = {}) => {
    console.log('values', values);
  }

  render() {
    const data = [
      { id: 0, label: 'Representante', icon: 'FaUser', tooltip: 'Representante', active: true },
      { id: 1, label: 'Sucursal', icon: 'FaHome', tooltip: 'Sucursal', active: false }
    ];

    return <StepsContainer steps={data} onSubmit={this.createOffice}/>
  }
}

export default NewOffice;