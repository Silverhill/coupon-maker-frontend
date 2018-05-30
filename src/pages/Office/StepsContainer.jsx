import React, { Component } from 'react';
import { StepByStep, RoundButton, Card, Form } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
import { injectIntl } from 'react-intl';

import styles from './NewOffice.css';

class StepsContainer extends Component {
  state = {
    steps: [],
    currentStep: {},
    office: {}
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
        return <FirstStep office={this.state.office}/>;
      case 1:
        return <SecondStep office={this.state.office}/>;
      default:
        break;
    }
  }

  prevStep = () => {
    const { steps } = this.state;
    let newStep = this.state.currentStep.id - 1 ;
    this.handleStepsChange(steps[newStep]);
  }

  onChange = (ev) => {
    const field = { [ev.target.name]: ev.target.value };
    this.setState(prevState => ({
      office: {
        ...prevState.office,
        ...field,
      }
    }));
  }

  forceSubmit = (step) => {
    if(step.id === 1){
      this.form.forceSubmit();
    }else{
      this.prevStep();
    }
  }

  handleSubmit = (ev) => {
    const { office, currentStep, steps } = this.state;
    const { onSubmit } = this.props;
    if(currentStep.id === 1 && onSubmit){
      onSubmit(office);
    }else{
      let newStep = currentStep.id + 1 ;
      this.handleStepsChange(steps[newStep]);
    }
  }

  render() {
    const { steps, currentStep } = this.state;
    const { intl } = this.props;
    let moveBtn;
    if(currentStep.id === 1){
      moveBtn = {
        position: 'absolute',
        bottom: '16px',
        right: '72px',
      };
    }

    return (
      <Card title={intl.formatMessage({id: 'office.new.title'})}
            classNameCard={styles.offices}
            style={{position: 'relative'}}>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.forceSubmit} className={styles.steps}/>
        </div>

        <Form onChange={this.onChange} onSubmit={this.handleSubmit} ref={ref => this.form = ref}>
          {this.renderContent(currentStep)}
          <div className={styles.submitButton}>
            <RoundButton icon="FaArrowRight" type="submit"/>
          </div>
        </Form>

        <div className={styles.submitButton} style={moveBtn}>
          {(currentStep.id === 1) && <RoundButton icon="FaArrowLeft" onClick={this.prevStep}/>}
        </div>
      </Card>
    )
  }
}

export default (injectIntl(StepsContainer));
