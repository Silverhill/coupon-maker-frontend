import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CampaignsPage extends Component {
  render() {
    return (
      <div>
        <h2>Campaigns Page</h2>
        <NavLink to='/new_campaign'> Crear Campaña </NavLink>
      </div>
    )
  }
}

export default CampaignsPage;