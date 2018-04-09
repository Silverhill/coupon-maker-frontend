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
      { id: 0, label: 'Información', icon: 'FaUser', tooltip: 'Información', active: true },
      { id: 1, label: 'Dirección', icon: 'FaHome', tooltip: 'Dirección', active: false }
    ];

    return <StepsContainer steps={data} onSubmit={this.createOffice}/>
  }
}

export default NewOffice;