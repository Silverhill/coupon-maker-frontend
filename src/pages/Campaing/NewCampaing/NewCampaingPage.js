import React, { Component } from 'react';
import StepsContainer from './StepsContainer';
import { NavLink } from 'react-router-dom';
import { Card, Typography, Icon, BasicRow, Panel } from 'coupon-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createCampaing } from 'Services/graphql/queries.graphql';
import { withApollo } from 'react-apollo';
import { makerOffices } from 'Services/graphql/queries.graphql';
import * as companyActions from 'Actions/companyActions';
import * as palette from 'Styles/palette.css';
import styles from './NewCampaing.css';

@connect(state => ({
  form: state.form.create_campaign,
  offices: state.company.offices,
}), {
  setOffices: companyActions.setOffices,
})

class NewCampaingPage extends Component {

  async componentDidMount() {
    const { setCampaigns, client, setOffices } = this.props;

    try {
      const { data: { myOffices } } = await client.query({
        query: makerOffices
      });

      setOffices(myOffices);
    } catch (error) {
      console.log(error);
    }
  }

  goToCampaings = () =>{
    this.props.history.push('/campaigns')
  }

  createCampaing = async (values = {}) => {
    const { form, offices, client: { mutate } } = this.props;

    try {
      await mutate({
        mutation: createCampaing,
        variables: {
          startAt: form.values.startAt,
          endAt: form.values.endAt,
          address: form.values.address,
          country: form.values.country,
          city: form.values.city,
          couponsNumber: parseInt(form.values.couponsNumber),
          title: form.values.title,
          description: form.values.description,
          customMessage: form.values.customMessage,
          initialAgeRange: parseInt(form.values.initialAgeRange),
          finalAgeRange: parseInt(form.values.finalAgeRange)
        }
      });
      this.goToCampaings();
    } catch (error) {
      return;
    }
  }

  render() {
    const data = [
      { id: 0, label: 'Información', icon: 'FaImage', tooltip: 'Información', active: true },
      { id: 1, label: 'Segmentación', icon: 'FaGroup', tooltip: 'Segmentación', active: false }
    ];
    const { offices } = this.props;
    const total = offices ? offices.length : 0;
    const createCampaing = (<StepsContainer steps={data} onSubmit={this.createCampaing}/>);
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