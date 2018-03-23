import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { dark } from 'Styles/palette.css';

// Components
import Header from '../../commons/components/Header/Header';
// Pages
import CampaignsPage from '../Campaigns/CampaignsPage';
import NotificationsPage from '../Notifications/NotificationsPage';
import CouponsPage from '../Coupons/CouponsPage';

const PageHome = (props) => <div><h1>Home</h1></div>

@connect(state => ({
  user: state.user,
}))
class Home extends Component {
  render() {
    const { data: { error, loading } } = this.props;

    if(error) return <h4>{error.message}</h4>
    else if(loading) return <h4>Loading...</h4>

    return (
      <div className={styles.container}>
        <Header/>
        <main className={styles.renderContainer}>
          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/campaigns' component={CampaignsPage} />
            <Route path='/new_coupon' component={CouponsPage} />
            <Route path='/notifications' component={NotificationsPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default graphql(getMe)(Home);
