import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { NavLink } from 'react-router-dom';
import { Typography, Icon } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createCampaing, makerCampaigns } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';
import { makerOffices } from 'Services/graphql/queries.graphql';
import * as palette from 'Styles/palette.css';
import styles from './NewCampaing.css';

@connect(state => ({
  form: state.form.create_campaign
}))

class NewCampaingPage extends Component {

  state = {
    offices: [],
    company: null,
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

  createCampaing = async (values = {}) => {
    const { form, client: { mutate } } = this.props;
    try {
      await mutate({
        mutation: createCampaing,
        variables: {
          startAt: form.values.startAt,
          endAt: form.values.endAt,
          officeId: form.values.office.id,
          country: form.values.country.value,
          city: form.values.city.value,
          couponsNumber: parseInt(form.values.couponsNumber),
          title: form.values.title,
          description: form.values.description,
          customMessage: form.values.customMessage,
          initialAgeRange: form.values.ageRange.min,
          finalAgeRange: form.values.ageRange.max,
          upload: form.values.image.file
        },
        optimisticResponse: {
          __typename: "Mutation",
          addCampaign: {
            __typename: "CampaignForHunter",
            id: -1,
            startAt: form.values.startAt,
            endAt: form.values.endAt,
            officeId: form.values.office.id,
            country: form.values.country.value,
            city: form.values.city.value,
            title: form.values.title,
            description: form.values.description,
            customMessage: form.values.customMessage,
            initialAgeRange: form.values.ageRange.min,
            finalAgeRange: form.values.ageRange.max,
            image: form.values.image.imagePreviewUrl,
            office: {
              __typename:"OfficeSimple",
              id: -1,
              address: 'waiting address'
            },
            totalCoupons: parseInt(form.values.couponsNumber)
          }
        },
        update: (cache, { data: {addCampaign} }) => {
          const dataCampaingsPage = cache.readQuery({ query: makerCampaigns, variables: {limit:10, sortDirection:-1} });
          const dataCampaingsHome = cache.readQuery({ query: makerCampaigns, variables: {limit:3, sortDirection:-1} });
          dataCampaingsPage.myCampaigns.campaigns = [addCampaign, ...dataCampaingsPage.myCampaigns.campaigns]
          dataCampaingsHome.myCampaigns.campaigns = [addCampaign, ...dataCampaingsHome.myCampaigns.campaigns]
          cache.writeQuery({ query: makerCampaigns, variables: {limit:10, sortDirection:-1}, data: dataCampaingsPage });
          cache.writeQuery({ query: makerCampaigns, variables: {limit:3, sortDirection:-1}, data: dataCampaingsHome });
          if(addCampaign.id === -1) this.goToCampaings();
        }
      });
    } catch (error) {
      return error;
    }
  }

  render() {
    const steps = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false }
    ];
    const { offices, company } = this.state;
    const total = offices ? offices.length : 0;
    const createCampaing = (<StepsContainer steps={steps} offices={offices} company={company} onSubmit={this.createCampaing}/>);
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
