import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { connect } from 'react-redux';
import { createCampaing } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';

@connect(state => ({
  form: state.form.create_campaign
}))

class NewCampaingPage extends Component {

  goToCampaings = () =>{
    this.props.history.push('/campaigns')
  }

  createCampaing = async (values = {}) => {
    const { form } = this.props;
    const { client: { mutate } } = this.props;
    try {
      await mutate({
        mutation: createCampaing,
        variables: {
          startAt: form.values.startAt,
          endAt: form.values.endAt,
          address: form.values.address,
          country: form.values.country,
          city: form.values.city,
          couponsNumber: parseInt(form.values.couponsNumber),
          title: form.values.title,
          description: form.values.description,
          customMessage: form.values.customMessage,
          initialAgeRange: parseInt(form.values.initialAgeRange),
          finalAgeRange: parseInt(form.values.finalAgeRange)
        }
      });
      this.goToCampaings();
    } catch (error) {
      return;
    }
  }

  render() {
    const data = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false }
    ];

    return <StepsContainer steps={data} onSubmit={this.createCampaing}/>
  }
}

export default withApollo(NewCampaingPage);