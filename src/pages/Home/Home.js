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
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
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
    let tabOptions = [
      {
        id: 0,
        label: 'Registro Cupones',
        route: '/new_coupon',
        icon: 'CpTicket'
      },
      {
        id: 1,
        label: 'Campañas',
        route: '/campaigns',
        icon: 'FaListAlt'
      },
      {
        id: 2,
        label: 'Notificaciones',
        route: '/notifications',
        icon: 'FaBellO'
      },
    ];
    let userData = {
      name: 'Carbon Burguer',
      image: 'https://i.pinimg.com/564x/bc/c8/10/bcc8102f42e58720355ca02d833c204b.jpg',
    };

    if(error) return <h4>{error.message}</h4>
    else if(loading) return <h4>Loading...</h4>

    return (
      <div className={styles.container}>
        <Header tabs={tabOptions} userData={userData}/>
        <main className={styles.renderContainer}>
          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/campaigns' component={CampaignsPage} />
            <Route path='/new_coupon' component={CouponsPage} />
            <Route path='/notifications' component={NotificationsPage} />
          </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default graphql(getMe)(Home);
