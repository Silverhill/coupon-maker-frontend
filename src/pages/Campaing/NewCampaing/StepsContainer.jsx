import React, { Component } from 'react';
import { Card, Panel,
      Coupon, StepByStep,
      RoundButton, InputFile,
      Form, Modal, Button } from 'coupon-components';
import FirstStep from './partials/FirstStep';
import SecondStep from './partials/SecondStep';
import ColorPicker from 'Components/ColorPicker/ColorPicker';
import PanelCampaign from 'Components/PanelCampaign/PanelCampaign';
import { injectIntl, IntlProvider, addLocaleData } from 'react-intl';
import moment from 'moment';
import classNames from 'classnames/bind';
import { maxnum } from 'Utils/filters';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import messages from '../../../messages';
import { flattenMessages } from '../../../commons/utils';


import styles from './NewCampaing.css';

addLocaleData([...en, ...es])
const locale = navigator.languages.indexOf('es') >= 0 ? 'es' : 'en'
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
    modalIsOpen: false,
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

  updateState = (field, errors) => {
    this.setState(prevState => ({
      ...errors,
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

    if(strNumber === ''){
      let field = { [ev.target.name]: ev.target.value };
      msg = 'Por favor ingrese un número';
      let errors = { errors: { validNumberCoupon: msg}};
      this.updateState(field, errors);
      return;
    }

    if(isvalid){
      if(parseInt(strNumber, 10) <= Number.MAX_SAFE_INTEGER){
        let errors = { errors: null};
        let field = { [ev.target.name]: ev.target.value };
        this.updateState(field, errors);
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
    const { currentStep, steps, errors } = this.state;
    if(!errors){
      if(currentStep.id === 1){
        this.toggleModal(ev);
      }else{
        let newStep = currentStep.id + 1 ;
        this.handleStepsChange(steps[newStep]);
      }
    }
  }

  forceSubmit = (step) => {
    if(step.id === 1){
      this.form.forceSubmit();
    }else{
      this.prevStep();
    }
  }

  saveData = () =>{
    const { campaign } = this.state;
    const { onSubmit } = this.props;
    if(onSubmit) onSubmit(campaign);
  }
  toggleModal = e => {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  modalDismiss = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    const { steps, currentStep, campaign, modalIsOpen, backgroundCoupon } = this.state;
    const { intl, company } = this.props;
    const cuponData = {};
    const previewCampaign = {};

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
      previewCampaign.title = campaign.title || '';
      previewCampaign.status = 'Unavailable';
      previewCampaign.description = campaign.description || '';
      previewCampaign.office = { address: campaign.office ? campaign.office.value : ''};
      cuponData.address = campaign.office && campaign.office.value;
      cuponData.totalCoupons = campaign.couponsNumber;
      previewCampaign.totalCoupons = campaign.couponsNumber;
      cuponData.date = campaign.startAt.format("DD MMM") + '-' + campaign.endAt.format("DD MMM YYYY");
      cuponData.image = campaign.upload && campaign.upload.imagePreviewUrl;
      previewCampaign.image = campaign.upload && campaign.upload.imagePreviewUrl;
      previewCampaign.rangeAge = campaign.rangeAge ? campaign.rangeAge.map(range => range.key) : [];
      previewCampaign.background = backgroundCoupon;
      previewCampaign.customMessage = campaign.customMessage || '';
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

        <Modal isOpen={modalIsOpen} dismiss={this.modalDismiss} classNameModal={styles.modalBox}>
          <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
            <div className={styles.modalContainer}>
              <PanelCampaign campaign={previewCampaign}/>
              <div className={styles.btnsModal}>
                <Button neutral text='Cancelar' onClick={this.modalDismiss} className={styles.sizeBtn}/>
                <Button text='Aceptar' onClick={this.saveData} className={styles.sizeBtn}/>
              </div>
            </div>
          </IntlProvider>
        </Modal>
      </Card>
    )
  }
}

export default injectIntl(StepsContainer);
