import React, { Component } from 'react';
import { Card, Panel, Coupon, StepByStep, RoundButton, InputFile } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';

import styles from './NewCampaing.css';
const cx = classNames.bind(styles)

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
    const cuponData = {};
    let moveBtn;
    if(currentStep.id === 1){
      moveBtn = {
        position: 'absolute',
        bottom: '16px',
        right: '72px',
      };
    }
    const valuesForm = this.props.form_campaing && this.props.form_campaing.values;
    if(valuesForm){
      cuponData.title = valuesForm.title;
      cuponData.address = valuesForm.address;
      cuponData.totalCoupons = valuesForm.totalCoupons;
      cuponData.date = moment(valuesForm.startAt).format("DD MMM") + '-' + moment(valuesForm.endAt).format("DD MMM YYYY");
      cuponData.image = valuesForm.image && valuesForm.image.imagePreviewUrl;
    }

    return (
      <Card title="Crear una campaña" style={{position: 'relative'}}>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.handleStepsChange} className={styles.steps}/>
        </div>

        <form onSubmit={this.props.handleSubmit}>
          <Panel title="Previsualización" classNameContainer={cx(styles.panel, styles.cuponContainer)}>
            <Field name="image"
                reduxFormInput
                component={InputFile}
                className={styles.inputFileTrigger}>
                <Coupon image={cuponData.image}
                  title={cuponData.title}
                  date={cuponData.date}
                  address={cuponData.address}
                  totalCoupons={cuponData.totalCoupons}
                  className={styles.campaing}/>
            </Field>
          </Panel>
          {this.renderContent(currentStep)}
          {(currentStep.id === 1) && <div className={styles.submitButton}>
            <RoundButton icon="FaArrowRight" type="submit"/>
          </div>}
        </form>

        <div className={styles.submitButton} style={moveBtn}>
          {(currentStep.id === 1) && <RoundButton icon="FaArrowLeft" onClick={this.prevStep}/>}
          {(currentStep.id === 0) && <RoundButton icon="FaArrowRight" onClick={this.nextStep}/>}
        </div>
      </Card>
    )
  }
}

export default connect(state => ({ form_campaing: state.form.create_campaign }))(
  reduxForm({
    form: 'create_campaign'
  })(StepsContainer)
);