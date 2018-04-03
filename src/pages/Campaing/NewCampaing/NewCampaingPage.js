import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { connect } from 'react-redux';

@connect(state => ({
  form: state.form.create_campaign
}), {})

class NewCampaingPage extends Component {

  createCampaing = async (values = {}) => {
    const { form } = this.props;
    console.log('Values', form.values);
  }

  render() {
    const data = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false }
    ];

    return <StepsContainer steps={data} onSubmit={this.createCampaing}/>
  }
}

export default NewCampaingPage;