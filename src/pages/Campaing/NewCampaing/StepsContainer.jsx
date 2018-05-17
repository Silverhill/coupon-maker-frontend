import React, { Component } from 'react';
import { Card, Panel, Coupon, StepByStep, RoundButton, InputFile } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
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
    campaign: {}
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
        return <FirstStep offices={this.props.offices} campaign={this.state.campaign}/>;
      case 1:
        return <SecondStep campaign={this.state.campaign}/>;
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
      campaign: {
        ...prevState.campaign,
        ...field,
      }
    }));
  }

  onChangeImage = (ev, values) => {
    const field = { upload:  values};
    this.setState(prevState => ({
      campaign: {
        ...prevState.campaign,
        ...field,
      }
    }));
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { campaign, currentStep } = this.state;
    const { onSubmit } = this.props;
    if(currentStep.id === 1 && onSubmit){
      onSubmit(campaign);
    }else{
      const { steps } = this.state;
      let newStep = this.state.currentStep.id + 1 ;
      this.handleStepsChange(steps[newStep]);
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
      cuponData.date = moment(campaign.startAt).format("DD MMM") + '-' + moment(campaign.endAt).format("DD MMM YYYY");
      cuponData.image = campaign.image && campaign.image.imagePreviewUrl;
    }

    return (
      <Card title={intl.formatMessage({id: 'campaigns.new.card.title'})} style={{position: 'relative'}}>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.handleStepsChange} className={styles.steps}/>
        </div>
        <Panel title={intl.formatMessage({id: 'campaigns.new.panel.previsualization'})} classNameContainer={cx(styles.panel, styles.cuponContainer)}>
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
                className={styles.campaing}/>
          </InputFile>
        </Panel>
        <form onChange={this.onChange} onSubmit={this.handleSubmit}>
          {this.renderContent(currentStep)}
          <div className={styles.submitButton}>
            <RoundButton icon="FaArrowRight" type="submit"/>
          </div>
        </form>

        <div className={styles.submitButton} style={moveBtn}>
          {(currentStep.id === 1) && <RoundButton icon="FaArrowLeft" onClick={this.prevStep}/>}
        </div>
      </Card>
    )
  }
}

export default (injectIntl(StepsContainer));
