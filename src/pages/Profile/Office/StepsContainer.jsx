import React, { Component } from 'react';
import { StepByStep, RoundButton } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';

import styles from './NewOffice.css';

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
      default:
        break;
    }
  }

  nextStep = () => {
    const { steps } = this.state;
    let newStep = this.state.currentStep.id + 1 ;
    this.handleStepsChange(steps[newStep]);
  }
  prevStep = () => {
    const { steps } = this.state;
    let newStep = this.state.currentStep.id - 1 ;
    this.handleStepsChange(steps[newStep]);
  }

  render() {
    const { steps, currentStep } = this.state;
    const { handleSubmit } = this.props;
    let moveBtn;
    if(currentStep.id === 1){
      moveBtn = {
        position: 'absolute',
        bottom: '16px',
        right: '72px',
      };
    }

    return (
      <div>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.handleStepsChange} className={styles.steps}/>
        </div>

        <form onSubmit={handleSubmit}>
          {this.renderContent(currentStep)}
          {(currentStep.id === 1) && <div className={styles.submitButton}>
            <RoundButton icon="FaArrowRight" type="submit"/>
          </div>}
        </form>

        <div className={styles.submitButton} style={moveBtn}>
          {(currentStep.id === 1) && <RoundButton icon="FaArrowLeft" onClick={this.prevStep}/>}
          {(currentStep.id === 0) && <RoundButton icon="FaArrowRight" onClick={this.nextStep}/>}
        </div>
      </div>
    )
  }
}

export default StepsContainer;