import React, { Component } from 'react';
import StepsContainer from './StepsContainer';

class NewCampaingPage extends Component {

  render() {
    const data = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false },
      { id: 2, label: 'Pago', icon: 'FaCreditCard', tooltip: 'Pago', active: false }
    ];

    return <StepsContainer steps={data} />
  }
}

export default NewCampaingPage;