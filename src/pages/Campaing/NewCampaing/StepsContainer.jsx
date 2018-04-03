import React, { Component } from 'react';
import { Card, StepByStep } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
import ThirdStep from './partials/ThirdStep';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class StepsContainer extends Component {
  state = {
    steps: [],
    currentStep: {},
  }

  componentWillMount() {
    const { steps } = this.props;
    this.setState({ steps, currentStep: steps[0] });
  }

  handleStepsChange = (currentStep) => {
    const { steps } = this.state;

    const newSteps = steps.map(step => {
      step.active = false;
      if(step.label === currentStep.label) step.active = true;
      return step;
    });

    this.setState({ currentStep: currentStep, steps: newSteps });
  }

  renderContent = (currentStep) => {
    switch (currentStep.id) {
      case 0:
        return <FirstStep/>;
      case 1:
        return <SecondStep/>;
      case 2:
        return <ThirdStep/>;
      default:
        break;
    }
  }

  render() {
    const { steps, currentStep } = this.state;
    return (
      <Card title="Crear una campaña">
        <StepByStep steps={steps} onChange={this.handleStepsChange}/>
        <form onSubmit={this.props.handleSubmit}>
          {this.renderContent(currentStep)}
        </form>
      </Card>
    )
  }
}

export default connect()(
  reduxForm({
    form: 'create_campaign'
  })(StepsContainer)
);