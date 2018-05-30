import React, { Component } from 'react';
import { Card, Panel, Coupon, StepByStep, RoundButton, InputFile, Form } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
import ColorPicker from 'Components/ColorPicker/ColorPicker';

import { injectIntl } from 'react-intl';

import moment from 'moment';
import classNames from 'classnames/bind';

import { maxnum } from 'Utils/filters';

import styles from './NewCampaing.css';
const cx = classNames.bind(styles)

class StepsContainer extends Component {
  state = {
    steps: [],
    currentStep: {},
    campaign: {
      startAt: moment(),
      endAt: moment(),
    },
    errors: null,
    backgroundCoupon: null,
    previewBackground: null,
  }

  componentWillMount() {
    const { steps } = this.props;
    this.setState({ steps, currentStep: steps[0] });
  }

  currentBackground = (color) => {
    this.setState({ previewBackground: color});
  }

  selectedBackground = (color) => {
    this.setState({ backgroundCoupon: color});
    if(this.props.selectedBackground) this.props.selectedBackground(color);
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
        return <FirstStep offices={this.props.offices}
                  campaign={this.state.campaign}
                  onChangeData={this.onChangeData}
                  errors={this.state.errors}/>;
      case 1:
        return <SecondStep campaign={this.state.campaign}
                  onChangeData={this.onChangeData}/>;
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
    if(ev.target.name === 'couponsNumber'){
      this.validateNumber(ev);
    }else{
      const field = { [ev.target.name]: ev.target.value };
      this.updateState(field);
    }
  }

  onChangeImage = (ev, values) => {
    const field = { upload:  values};
    this.updateState(field);
  }

  onChangeData = (values, label) => {
    const field = { [label]: values };
    this.updateState(field);
  }

  updateState = (field) => {
    this.setState(prevState => ({
      campaign: {
        ...prevState.campaign,
        ...field,
      }
    }));
  }

  validateNumber = (ev) => {
    var strNumber = ev.target.value;
    var isvalid = /^[1-9][0-9]*$/.test(strNumber);
    var msg = '';
    if(isvalid){
      if(parseInt(strNumber, 10) <= Number.MAX_SAFE_INTEGER){
        this.setState({ errors: null});
        const field = { [ev.target.name]: ev.target.value };
        this.updateState(field);
      }else{
        msg = 'Número fuera de rango, Por favor ingrese un número menor a '+Number.MAX_SAFE_INTEGER;
        this.setState({ errors: { validNumberCoupon: msg}});
      }
    }else{
      msg = 'Por favor ingrese un número entero positivo';
      this.setState({ errors: { validNumberCoupon: msg}});
    }
  }

  handleSubmit = (ev) => {
    const { campaign, currentStep, steps } = this.state;
    const { onSubmit } = this.props;
    if(currentStep.id === 1 && onSubmit){
      onSubmit(campaign);
    }else{
      let newStep = currentStep.id + 1 ;
      this.handleStepsChange(steps[newStep]);
    }
  }

  forceSubmit = (step) => {
    if(step.id === 1){
      this.form.forceSubmit();
    }else{
      this.prevStep();
    }
  }

  render() {
    const { steps, currentStep, campaign } = this.state;
    const { intl, company } = this.props;
    const cuponData = {};

    let moveBtn;
    if(currentStep.id === 1){
      moveBtn = {
        position: 'absolute',
        bottom: '16px',
        right: '72px',
      };
    }
    if(campaign){
      cuponData.title = campaign.title;
      cuponData.address = campaign.office && campaign.office.value;
      cuponData.totalCoupons = campaign.couponsNumber;
      cuponData.date = campaign.startAt.format("DD MMM") + '-' + campaign.endAt.format("DD MMM YYYY");
      cuponData.image = campaign.upload && campaign.upload.imagePreviewUrl;
    }

    return (
      <Card title={intl.formatMessage({id: 'campaigns.new.card.title'})} style={{position: 'relative'}}>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.forceSubmit} className={styles.steps}/>
        </div>
        <Panel title={intl.formatMessage({id: 'campaigns.new.panel.previsualization'})} classNameContainer={cx(styles.preview, styles.cuponContainer)}>
          <InputFile name="image"
              className={styles.inputFileTrigger}
              updateFile={this.onChangeImage}>
              <Coupon
                image={cuponData.image}
                logo={company.logo}
                title={cuponData.title}
                date={cuponData.date}
                address={cuponData.address}
                totalCoupons={maxnum(cuponData.totalCoupons)}
                background={this.state.previewBackground || this.state.backgroundCoupon}
                className={styles.campaing}/>
          </InputFile>
          <div className={styles.palettes}>
            {
              company.logo &&
              <ColorPicker
                image={company.logo}
                size="25px"
                current={this.currentBackground}
                selected={this.selectedBackground}
              />
            }
            {
              cuponData.image &&
              <ColorPicker
                image={cuponData.image}
                size="25px"
                current={this.currentBackground}
                selected={this.selectedBackground}
              />
            }
          </div>
        </Panel>
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
