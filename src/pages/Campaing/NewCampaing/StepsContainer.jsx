import React, { Component } from 'react';
import { Card, Panel, StepByStep, RoundButton, InputFile } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
import { injectIntl } from 'react-intl';
import Palette from 'react-palette';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';
import Coupon from 'Components/Coupon2/Coupon2';
import ColorPicker from 'Components/ColorPicker/ColorPicker';

import { maxnum } from 'Utils/filters';

import styles from './NewCampaing.css';
const cx = classNames.bind(styles)

class StepsContainer extends Component {
  state = {
    steps: [],
    currentStep: {},
    colorCoupon: null,
    previewColor: null
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
        return <FirstStep offices={this.props.offices}/>;
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

  currentColor = (color) => {
    this.setState({ previewColor: color});
  }

  selectedColor = (color) => {
    this.setState({ colorCoupon: color});
  }

  render() {
    const { steps, currentStep } = this.state;
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
    const valuesForm = this.props.form_campaing && this.props.form_campaing.values;
    if(valuesForm){
      cuponData.title = valuesForm.title;
      cuponData.address = valuesForm.office && valuesForm.office.value;
      cuponData.totalCoupons = valuesForm.couponsNumber;
      cuponData.date = moment(valuesForm.startAt).format("DD MMM") + '-' + moment(valuesForm.endAt).format("DD MMM YYYY");
      cuponData.image = valuesForm.image && valuesForm.image.imagePreviewUrl;
    }

    return (
      <Card title={intl.formatMessage({id: 'campaigns.new.card.title'})} style={{position: 'relative'}}>
        <div className={styles.tabs}>
          <StepByStep steps={steps} onChange={this.handleStepsChange} className={styles.steps}/>
        </div>

        <form onSubmit={this.props.handleSubmit}>
          <Panel title={intl.formatMessage({id: 'campaigns.new.panel.previsualization'})} classNameContainer={cx(styles.previsualization, styles.cuponContainer)}>
            <Field name="image"
                reduxFormInput
                component={InputFile}
                className={styles.inputFileTrigger}>
                <Coupon
                  patternUrl="http://thepatternlibrary.com/img/ak.png"
                  color={this.state.previewColor || this.state.colorCoupon}
                  image={cuponData.image}
                  logo={company.logo}
                  title={cuponData.title}
                  date={cuponData.date}
                  address={cuponData.address}
                  totalCoupons={maxnum(cuponData.totalCoupons)}
                  className={styles.campaing}/>
            </Field>
            <div className={styles.palettes}>
              <Palette image={company.logo}>
                { palette => (
                  <ColorPicker
                    colors={[
                      palette.vibrant,
                      palette.lightVibrant,
                      palette.darkVibrant,
                      palette.muted,
                      palette.lightMuted,
                      palette.darkMute
                    ]}
                    size="25px"
                    currentColor={this.currentColor}
                    selectedColor={this.selectedColor}
                  />
                )}
              </Palette>
              <Palette image={company.logo}>
                { palette => (
                  <ColorPicker
                    colors={[
                      palette.vibrant,
                      palette.lightVibrant,
                      palette.darkVibrant,
                      palette.muted,
                      palette.lightMuted,
                      palette.darkMute
                    ]}
                    size="25px"
                    currentColor={this.currentColor}
                    selectedColor={this.selectedColor}
                    withDegrate={true}
                  />
                )}
              </Palette>
              <ColorPicker
                colors={[
                  'http://thepatternlibrary.com/img/bc.png',
                  'http://thepatternlibrary.com/img/ah.png',
                  'http://thepatternlibrary.com/img/ap.jpg',
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOFCRV5yojlPRuBY-uIPAftcRaHaxfjzIWbe3sJmQvb2HA0-v',
                  'https://blog.spoongraphics.co.uk/wp-content/uploads/2012/12/15.png',
                  'https://d1yn1kh78jj1rr.cloudfront.net/image/preview/rDtN98Qoishumwih/seamless-patterns-for-mothers-day-celebration_fJnicT_O_SB_PM.jpg',
                  'https://previews.123rf.com/images/daisybea/daisybea1409/daisybea140900012/31359781-greeting-card-or-menu-template-for-father-s-day-with-hand-made-text-and-mustache-background-pattern-.jpg',
                  'https://img3.stockfresh.com/files/i/ivaleksa/m/64/2817004_stock-photo-chevron-pattern-fathers-day-card.jpg',
                  'https://i.pinimg.com/originals/49/d4/a9/49d4a9d77d730fd72481b472baf15cbd.jpg',
                  'https://previews.123rf.com/images/elenarolau/elenarolau1601/elenarolau160100003/50151959-simple-valentines-day-background-hearts-seamless-vector-pattern-flat-design-texture-made-of-heart-si.jpg',
                ]}
                size="25px"
                currentColor={this.currentColor}
                selectedColor={this.selectedColor}
                withPatterns={true}
              />
              {
                cuponData.image &&
                <Palette image={cuponData.image}>
                  { palette => (
                    <ColorPicker
                      colors={[
                        palette.vibrant,
                        palette.lightVibrant,
                        palette.darkVibrant,
                        palette.muted,
                        palette.lightMuted,
                        palette.darkMute
                      ]}
                      size="25px"
                      currentColor={this.currentColor}
                      selectedColor={this.selectedColor}
                    />
                  )}
                </Palette>
              }
            </div>
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
  })(injectIntl(StepsContainer))
);
