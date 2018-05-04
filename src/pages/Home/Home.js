import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { withApollo, Query } from 'react-apollo';
import { getMyCompany, makerCampaigns } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Components
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import { Card, Coupon, Typography, Icon } from 'coupon-components';
// Pages
import Campaigns from '../Campaigns/Campaigns';
import OfficesPage from '../Offices/OfficesPage';
import NewOfficePage from '../Office/NewOfficePage'
import CouponsPage from '../Coupons/CouponsPage';
import ProfilePage from '../Profile/ProfilePage';
import ShowCampaign from '../Campaing/ShowCampaign/ShowCampaign';
import NewCampaingPage from '../Campaing/NewCampaing/NewCampaingPage';
import EditProfilePage from '../Profile/EditProfile/EditProfilePage';
// Styles
import * as palette from 'Styles/palette.css';
//Actions
import * as userActions from '../../actions/userActions';

import { maxnum } from 'Utils/filters';

const PageHome = (props) => <div><h1>Home</h1></div>

@connect(state => ({
  user: state.user,
}),{
  removeAuthentication: userActions.removeAuthentication,
})

class Home extends Component {

  render() {
    const {
      client,
      intl,
      removeAuthentication,
      history
    } = this.props;

    const placeholderlogo = 'https://fandog.co/wp-content/plugins/yith-woocommerce-multi-vendor-premium/assets/images/shop-placeholder.jpg';
    const placeholderImage = 'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg';

    let tabOptions = [
      {
        id: 0,
        label: intl.formatMessage({id: 'header.option.coupons'}),
        route: '/new_coupon',
        icon: 'CpTicket'
      },
      {
        id: 1,
        label: intl.formatMessage({id: 'header.option.campaigns'}),
        route: '/campaigns',
        icon: 'FaListAlt'
      },
      {
        id: 2,
        label:  intl.formatMessage({id: 'header.option.offices'}),
        route: '/offices',
        icon: 'FaHome'
      },
    ];

    let optionsUser = {
      options: [
        {
          value: intl.formatMessage({id: 'header.user.option.profile'}),
          onClick: ()=>{this.props.history.push('/profile');}
        },
        {
          value: intl.formatMessage({id: 'header.user.option.logout'}),
          onClick: ()=>{
            const remove = removeAuthentication();
            if(remove) client.resetStore(); this.props.history.push('/login');
          }
        }
      ]
    };

    const emptyStateActiveCampaigns = (
      <div className={styles.emptyState}>
        <Icon
          name="FaNewspaperO"
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
        <Typography.Text small>
          {intl.formatMessage({id: 'home.campaings.active.empty.text'})}
        </Typography.Text>
      </div>
    )

    const emptyStateInactiveCampaigns = (
      <div className={styles.emptyState}>
        <Icon
          name="FaClockO"
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
        <Typography.Text small>
          {intl.formatMessage({id: 'home.campaings.inactive.empty.text'})}
        </Typography.Text>
      </div>
    )

    const campaignsActives = (
      <Query query={getMyCompany}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { myCompany } = data;
          const logo = myCompany && myCompany.logo || placeholderlogo;
          return (
            <Query query={makerCampaigns}>
              {({ loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                const {myCampaigns: {campaigns} } = data;
                const total = campaigns ? campaigns.length : 0;
                return (
                  <div>
                    {total === 0 && emptyStateActiveCampaigns}
                    {total > 0 &&
                      campaigns && campaigns.map((cpg) => {
                        const key = { key: cpg.id };
                        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
                        return (
                          <Coupon {...key}
                            image={cpg.image || placeholderImage}
                            logo={logo}
                            title={cpg.title}
                            date={date}
                            address={cpg.office.address}
                            totalCoupons={maxnum(cpg.totalCoupons)}
                            className={styles.campaign}
                            onClick={()=>{history.push(`/campaign/${cpg.id}`)}}
                          />
                        )
                      })
                    }
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );

    return (
      <div className={styles.container}>
        <Header tabs={tabOptions} optionsUser={optionsUser}/>
        <div className={styles.mainView}>
          <div className={styles.leftPanel}>
            <Card
              title={intl.formatMessage({id: 'home.campaings.active.title'})}
              subtitle={intl.formatMessage({id: 'home.campaings.active.subtitle'})}
              classNameCard={styles.card}>
              {campaignsActives}
            </Card>
            <Card
              title={intl.formatMessage({id: 'home.campaings.inactive.title'})}
              subtitle={intl.formatMessage({id: 'home.campaings.inactive.subtitle'})}
              classNameCard={styles.card}>
              {emptyStateInactiveCampaigns}
            </Card>
          </div>
          <main className={styles.renderContainer}>
            <Switch>
              <Route exact path='/' component={PageHome} />
              <Route path='/campaigns' component={Campaigns} />
              <Route path='/new_coupon' component={CouponsPage} />
              <Route path='/offices' component={OfficesPage} />
              <Route path='/new_office' component={NewOfficePage} />
              <Route exact path='/profile' component={ProfilePage} />
              <Route path='/new_campaign' component={NewCampaingPage} />
              <Route path='/campaign/:id' component={ShowCampaign} />
              <Route path='/profile/edit' component={EditProfilePage} />
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(injectIntl(Home));
