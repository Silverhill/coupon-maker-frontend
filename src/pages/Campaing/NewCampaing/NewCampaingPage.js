import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { NavLink } from 'react-router-dom';
import { Typography, Icon } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createCampaing, makerCampaigns } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';
import { makerOffices } from 'Services/graphql/queries.graphql';
import * as palette from 'Styles/palette.css';
import styles from './NewCampaing.css';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

class NewCampaingPage extends Component {

  state = {
    offices: [],
    company: null,
    couponBackground: null,
  }

  updateCampaigns = (cache, { data: {addCampaign} }) => {
    try {
      const dataCampaingsPage = cache.readQuery({ query: makerCampaigns, variables: {limit:10, sortDirection:-1} });
      dataCampaingsPage.myCampaigns.campaigns = [addCampaign, ...dataCampaingsPage.myCampaigns.campaigns]
      cache.writeQuery({ query: makerCampaigns, variables: {limit:10, sortDirection:-1}, data: dataCampaingsPage });
    } catch (err) {
      this.showErrorNotification(err);
    }

    try {
      const dataCampaingsHome = cache.readQuery({ query: makerCampaigns, variables: {limit:3, sortDirection:-1} });
      dataCampaingsHome.myCampaigns.campaigns = [addCampaign, ...dataCampaingsHome.myCampaigns.campaigns]
      cache.writeQuery({ query: makerCampaigns, variables: {limit:3, sortDirection:-1}, data: dataCampaingsHome })
    } catch (err) {
      this.showErrorNotification(err);
    }

    if(addCampaign.id === -1){
      this.goToCampaings();
    }else{
      this.showSuccessNotification();
    }
  }

  selectedBackground = (background) =>{
    this.setState({
      couponBackground: background
    });
  }

  showSuccessNotification = () => {
    toast(
      <ToastTemplate
        title={<FormattedMessage id='campaigns.toasts.success.create.title' />}
        subtitle={<FormattedMessage id='campaigns.toasts.success.create.subtitle' />}
        status='success'
      />
    )
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='campaigns.toasts.error.create.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  async componentDidMount() {
    const { client } = this.props;
    try {
      const { data: { myOffices, myCompany } } = await client.query({
        query: makerOffices,
        variables: { withCompany: true }
      });
      this.setState({
        offices: myOffices,
        company: myCompany
      });
    } catch (error) {
      console.log(error);
    }
  }

  goToCampaings = () =>{
    this.props.history.push('/campaigns')
  }

  getIdsRangeAge = (values) => {
    return values && values.map((value)=>{
      return value.key
    })
  }


  createCampaing = async (values) => {
    const { client: { mutate } } = this.props;
    const coupons = parseInt(values.couponsNumber, 10);
    let couponBackground = this.state.couponBackground ? this.state.couponBackground : palette.pinkRed;
    const idsRangeAge = this.getIdsRangeAge(values.rangeAge);
    try {
      await mutate({
        mutation: createCampaing,
        variables: {
          startAt: values.startAt.valueOf(),
          endAt: values.endAt.valueOf(),
          officeId: values.office.id,
          country: values.country.value,
          city: values.city.value,
          couponsNumber: coupons,
          title: values.title,
          description: values.description,
          customMessage: values.customMessage,
          upload: values.upload.file,
          background: couponBackground,
          rangeAge: idsRangeAge
        },
        optimisticResponse: {
          __typename: "Mutation",
          addCampaign: {
            __typename: "CampaignForHunter",
            id: -1,
            startAt: values.startAt.valueOf(),
            endAt: values.endAt.valueOf(),
            officeId: values.office.id,
            country: values.country.value,
            city: values.city.value,
            title: values.title,
            description: values.description,
            customMessage: values.customMessage,
            image: values.upload.imagePreviewUrl,
            office: {
              __typename:"OfficeSimple",
              id: -1,
              address: 'waiting address'
            },
            background: this.state.couponBackground,
            totalCoupons: coupons,
            rangeAge: idsRangeAge
          }
        },
        update: this.updateCampaigns
      });
    } catch (err) {
      this.showErrorNotification(err);
      return;
    }
  }

  render() {
    const steps = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false }
    ];
    const { offices, company } = this.state;
    const total = offices ? offices.length : 0;
    const createCampaing = (
      <StepsContainer
        steps={steps}
        offices={offices}
        company={company}
        onSubmit={this.createCampaing}
        selectedBackground={this.selectedBackground}
      />
    );
    const emptyState = (
      <div className={styles.emptyOffice}>
        <Icon
          name="FaHome"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 20,
              padding: 30,
              background: palette.baseGrayLow,
              borderRadius: '50%'
            }
          }
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          <FormattedMessage id='campaigns.new.emptyOffice.title' />
        </Typography.Text>
        <Typography.Text small>
          <FormattedMessage id='campaigns.new.emptyOffice.description' />
        </Typography.Text>
        <div className={styles.linkBtn}>
          <NavLink to='/new_office' className={styles.link}>
            <FormattedMessage id='myOffices.new' />
          </NavLink>
        </div>
      </div>
    )

    return (
      <div className={styles.newCampaign}>
        { total === 0 && emptyState}
        { total > 0 && createCampaing}
      </div>
    )
  }
}

export default withApollo(injectIntl(NewCampaingPage));
