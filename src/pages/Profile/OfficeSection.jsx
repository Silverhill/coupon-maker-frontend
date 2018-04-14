import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Card } from 'coupon-components';
import Offices from './Offices/Offices';
import NewOffice from './Office/NewOffice';
import styles from './ProfilePage.css';

class OfficeSection extends Component {
  state = {
    currentSection: 'list'
  }

  goToNewOffice = () => {
    this.setState({ currentSection: 'create' });
  }

  goToOffices = () => {
    this.setState({ currentSection: 'list' });
  }

  renderSection = (section) => {
    switch (section) {
      case 'list':
        return <Offices changeSection={this.goToNewOffice}/>;
      case 'create':
        return <NewOffice changeSection={this.goToOffices}/>;
      default:
        break;
    }
  }

  render() {
    const { intl } = this.props;
    const { currentSection } = this.state;

    return (
      <Card title={intl.formatMessage({id: 'profile.office.title'})}
              classNameCard={styles.offices}
              style={{position: 'relative'}}>
        {this.renderSection(currentSection)}
      </Card>
    )
  }
}

export default (injectIntl(OfficeSection));