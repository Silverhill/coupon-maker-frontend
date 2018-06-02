import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { withApollo, Query } from 'react-apollo';
import { getMyCompany, makerCampaigns, inactiveCampaigns } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Components
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import { Card, Coupon, Typography, Campaign } from 'coupon-components';
import EmptyState from 'Components/EmptyState/EmptyState';

// Pages
import Campaigns from '../Campaigns/Campaigns';
import OfficesPage from '../Offices/OfficesPage';
import NewOfficePage from '../Office/NewOfficePage'
import CouponsPage from '../Coupons/CouponsPage';
import ProfilePage from '../Profile/ProfilePage';
import ShowCampaign from '../Campaing/ShowCampaign/ShowCampaign';
import NewCampaingPage from '../Campaing/NewCampaing/NewCampaingPage';
import EditProfilePage from '../Profile/EditProfile/EditProfilePage';
import EditCompanyPage from '../Offices/EditCompany/EditCompanyPage';

// Styles
import * as palette from 'Styles/palette.css';
//Actions
import * as userActions from 'Actions/userActions';

import { maxnum } from 'Utils/filters';

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

    let tabOptions = [
      {
        id: 0,
        label: intl.formatMessage({id: 'header.option.coupons'}),
        route: '/new_coupon',
        icon: 'MdStyle'
      },
      {
        id: 1,
        label: intl.formatMessage({id: 'header.option.campaigns'}),
        route: '/campaigns',
        icon: 'MdDeveloperBoard'
      },
      {
        id: 2,
        label:  intl.formatMessage({id: 'header.option.offices'}),
        route: '/offices',
        icon: 'MdStore'
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
        <EmptyState
          name='coupons'
          lowColor="#e4eefc"
          mediumColor="#3f92fe"
          highColor="#0169e5"
          width="55%"
        />
        <Typography.Text small>
          {intl.formatMessage({id: 'home.campaings.active.empty.text'})}
        </Typography.Text>
      </div>
    )

    const emptyStateInactiveCampaigns = (
      <div className={styles.emptyState}>
        <EmptyState
          name='history'
          lowColor="#e4eefc"
          mediumColor="#3f92fe"
          highColor="#0169e5"
          width="55%"
        />
        <Typography.Text small>
          {intl.formatMessage({id: 'home.campaings.inactive.empty.text'})}
        </Typography.Text>
      </div>
    )

    const activesCampaigns = (
      <Query query={getMyCompany}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { myCompany } = data;
          const logo = (myCompany && myCompany.logo) || placeholderlogo;
          return (
            <Query query={makerCampaigns} variables={{limit:3, sortDirection:-1}}>
              {({ loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                const { myCampaigns } = data;
                const campaigns = myCampaigns ? myCampaigns.campaigns : [];
                const lastCampaigns = campaigns ? campaigns.slice(0,3) : [];
                const total = campaigns ? campaigns.length : 0;
                return (
                  <div>
                    {total === 0 && emptyStateActiveCampaigns}
                    {total > 0 &&
                      lastCampaigns && lastCampaigns.map((cpg) => {
                        const key = { key: cpg.id };
                        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
                        return (
                          <Coupon {...key}
                            image={cpg.image}
                            logo={logo}
                            title={cpg.title}
                            date={date}
                            address={cpg.office.address}
                            totalCoupons={maxnum(cpg.totalCoupons)}
                            className={styles.campaign}
                            background={cpg.background}
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

    const inactivesCampaigns = (
      <Query query={getMyCompany}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Query query={inactiveCampaigns} variables={{limit:3, sortDirection:-1}}>
              {({ loading, error, data}) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                const { myCampaigns } = data;
                const campaigns = myCampaigns ? myCampaigns.campaigns : [];
                const lastCampaigns = campaigns ? campaigns.slice(0,3) : [];
                const total = campaigns ? campaigns.length : 0;
                return (
                  <div>
                    {total === 0 && emptyStateInactiveCampaigns}
                    {total > 0 &&
                      lastCampaigns && lastCampaigns.map((cpg) => {
                        const key = { key: cpg.id };
                        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
                        return (
                          <Campaign {...key}
                            title={cpg.title}
                            date={date}
                            address={cpg.address}
                            totalCoupons={maxnum(cpg.totalCoupons)}
                            totalCouponsHunted={maxnum(cpg.huntedCoupons)}
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
              {activesCampaigns}
            </Card>
            <Card
              title={intl.formatMessage({id: 'home.campaings.inactive.title'})}
              subtitle={intl.formatMessage({id: 'home.campaings.inactive.subtitle'})}
              classNameCard={styles.card}>
              {inactivesCampaigns}
            </Card>
          </div>
          <main className={styles.renderContainer}>
            <Switch>
              <Route exact path='/' component={CouponsPage} />
              <Route path='/campaigns' component={Campaigns} />
              <Route path='/new_coupon' component={CouponsPage} />
              <Route path='/offices' component={OfficesPage} />
              <Route path='/new_office' component={NewOfficePage} />
              <Route exact path='/profile' component={ProfilePage} />
              <Route path='/new_campaign' component={NewCampaingPage} />
              <Route path='/campaign/:id' component={ShowCampaign} />
              <Route path='/profile/edit' component={EditProfilePage} />
              <Route path='/company/:id/edit' component={EditCompanyPage} />
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(injectIntl(Home));
