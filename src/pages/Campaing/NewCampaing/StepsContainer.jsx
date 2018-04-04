import React, { Component } from 'react';
import { Card, Panel, Cupon, StepByStep, RoundButton, InputFile } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import styles from './NewCampaing.css';

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
    const cuponData = {
      maker: {},
      cupon: {}
    };
    const valuesForm = this.props.form_campaing && this.props.form_campaing.values;
    if(valuesForm){
      cuponData.cupon.promo = valuesForm.promotion;
      cuponData.cupon.address = valuesForm.address;
      cuponData.maker.cupons = valuesForm.coupons;
      cuponData.cupon.image = valuesForm.image.imagePreviewUrl;
    }

    return (
      <Card title="Crear una campaña">
        <StepByStep steps={steps} />
        <form onSubmit={this.props.handleSubmit} onChange={this.onChangeForm}>
          <Panel title="Previsualización" classNameContainer={styles.panel}>
            <Field name="image"
                reduxFormInput
                component={InputFile}>
                <Cupon data={cuponData} className={styles.campaing}/>
            </Field>
          </Panel>
          {this.renderContent(currentStep)}
          {(currentStep.id === 1) && <RoundButton icon="FaArrowRight" type="submit"/>}
        </form>
        {(currentStep.id === 1) && <RoundButton icon="FaArrowLeft" onClick={this.prevStep}/>}
        {(currentStep.id === 0) && <RoundButton icon="FaArrowRight" onClick={this.nextStep}/>}
      </Card>
    )
  }
}

export default connect(state => ({ form_campaing: state.form.create_campaign }))(
  reduxForm({
    form: 'create_campaign'
  })(StepsContainer)
);