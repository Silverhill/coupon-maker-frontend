import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { withApollo } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import moment from 'moment';

// Components
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import { Card, Coupon, Campaign, Typography, Icon } from 'coupon-components';
// Pages
import Campaigns from '../Campaigns/Campaigns';
import OfficesPage from '../Offices/OfficesPage';
import NewOfficePage from '../Office/NewOfficePage'
import CouponsPage from '../Coupons/CouponsPage';
import ProfilePage from '../Profile/ProfilePage';
import ShowCampaign from '../Campaing/ShowCampaign/ShowCampaign';
import NewCampaingPage from '../Campaing/NewCampaing/NewCampaingPage';
// Styles
import * as palette from 'Styles/palette.css';
//Actions
import * as userActions from '../../actions/userActions';

const PageHome = (props) => <div><h1>Home</h1></div>

@connect(state => ({
  user: state.user,
}),{
  removeAuthentication: userActions.removeAuthentication,
})

class Home extends Component {

  state = {
    me: null,
    myCampaigns: []
  }

  async componentDidMount() {
    const { client } = this.props;

    try {
      const { data: { me, myCampaigns } } = await client.query({
        query: getMe
      });
      this.setState({
        me: me,
        myCampaigns: myCampaigns
       });
      console.log(me);
      console.log(myCampaigns);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      // data: { error, loading, myCampaigns, me },
      error,
      loading,
      client,
      // myCampaigns,
      // me,
      intl,
      removeAuthentication,
      history
    } = this.props;
    const { me, myCampaigns} = this.state;
    const campaigns = myCampaigns ? myCampaigns.slice(0,3) : null;
    const total = campaigns ? campaigns.length : 0;
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
    let userData = {
      name: me && me.name,
      image: (me && me.image) || 'https://i.pinimg.com/564x/bc/c8/10/bcc8102f42e58720355ca02d833c204b.jpg',
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
      campaigns && campaigns.map((cpg) => {
        const key = { key: cpg.id };
        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
        return (
          <Coupon {...key}
            image={cpg.image || placeholderImage}
            logo={cpg.logo || placeholderlogo}
            title={cpg.title}
            date={date}
            address={cpg.address}
            totalCoupons={cpg.totalCoupons}
            className={styles.campaign}
            onClick={()=>{history.push(`/campaign/${cpg.id}`)}}
          />
        )
      })
    )

    const campaignsInactives = (
      campaigns && campaigns.map((cpg) => {
        const key = { key: cpg.id };
        const date = moment(cpg.startAt).format("DD MMM") + ' - ' + moment(cpg.endAt).format("DD MMM YYYY");
        return (
          <Campaign {...key}
            title={cpg.title}
            date={date}
            address={cpg.address}
            totalCoupons={cpg.totalCoupons}
            totalCouponsHunted={cpg.capturedCoupons || 0}
            className={styles.campaign}
            onClick={()=>{history.push(`/campaign/${cpg.id}`)}}
          />
        )
      })
    )

    if(error) return <h4>{error.message}</h4>
    else if(loading) return <h4>Loading...</h4>

    return (
      <div className={styles.container}>
        <Header tabs={tabOptions} userData={userData}/>
        <div className={styles.mainView}>
          <div className={styles.leftPanel}>
            <Card
              title={intl.formatMessage({id: 'home.campaings.active.title'})}
              subtitle={intl.formatMessage({id: 'home.campaings.active.subtitle'})}
              classNameCard={styles.card}>
              {total === 0 && emptyStateActiveCampaigns}
              {total > 0 && campaignsActives}
            </Card>
            <Card
              title={intl.formatMessage({id: 'home.campaings.inactive.title'})}
              subtitle={intl.formatMessage({id: 'home.campaings.inactive.subtitle'})}
              classNameCard={styles.card}>
              {total === 0 && emptyStateInactiveCampaigns}
              {total > 0 && campaignsInactives}
            </Card>
          </div>
          <main className={styles.renderContainer}>
            <Switch>
              <Route exact path='/' component={PageHome} />
              <Route path='/campaigns' component={Campaigns} />
              <Route path='/new_coupon' component={CouponsPage} />
              <Route path='/offices' component={OfficesPage} />
              <Route path='/new_office' component={NewOfficePage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/new_campaign' component={NewCampaingPage} />
              <Route path='/campaign/:id' component={ShowCampaign} />
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(injectIntl(Home));
