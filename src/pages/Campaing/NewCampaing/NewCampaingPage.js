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
          initialAgeRange: parseInt(form.values.initialAgeRange),
          finalAgeRange: parseInt(form.values.finalAgeRange),
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
            couponsNumber: parseInt(form.values.couponsNumber),
            title: form.values.title,
            description: form.values.description,
            customMessage: form.values.customMessage,
            initialAgeRange: parseInt(form.values.initialAgeRange),
            finalAgeRange: parseInt(form.values.finalAgeRange),
            image: form.values.image,
            address: 'nullllll',
            office: {
              __typename:"OfficeSimple",
              id: -1,
              name: 'dsadas',
              address: 'dsadas'
            },
            totalCoupons: 1
          }
        },
        update: (cache, { data: {addCampaign} }) => {
          // Read the data from our cache for this query.
          const data = cache.readQuery({ query: makerCampaigns });
          // Add our comment from the mutation to the end.
          console.log('DATA query',data);
          data.myCampaigns.campaigns.push(addCampaign);
          console.log('DATA Pushed', data);
          // Write our data back to the cache.
          cache.writeQuery({ query: makerCampaigns, data: data });
        }
        // refetchQueries: [{query: makerCampaigns}]
      });
      this.goToCampaings();
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
