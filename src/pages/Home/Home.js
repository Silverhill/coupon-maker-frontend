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

// Components
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import { Card, Cupon, Campaign } from 'coupon-components';
// Pages
import CampaignsPage from '../Campaigns/CampaignsPage';
import NotificationsPage from '../Notifications/NotificationsPage';
import CouponsPage from '../Coupons/CouponsPage';
import ProfilePage from '../Profile/ProfilePage';

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
      options: [
        {
          value: 'Mi perfil',
          onClick: ()=>{this.props.history.push('/profile');}
        },
        {
          value: 'Cerrar Sesion'
        }
      ]
    };
    const pizzaHut = {
      maker: {
        image: 'https://aalfredosalinas.files.wordpress.com/2010/09/pizza-hut-logo1.jpg',
        cupons: 125,
        hunted: 50
      },
      cupon: {
        image: 'https://i2.wp.com/food.thecookbk.com/wp-content/uploads/2017/10/pizza-hut.jpg?fit=800%2C600',
        date: '11 Feb - 20 May 2017',
        promo: 'Martes 2 x 1 en pizzas',
        address: '12-34 Downtown S.Q'
      }
    }
    const starbucks = {
      maker: {
        image: 'https://pbs.twimg.com/profile_images/968173455580397568/Qe0pSZTk_400x400.jpg',
        cupons: 345,
        hunted: 2
      },
      cupon: {
        image: 'https://assets3.thrillist.com/v1/image/2439237/size/gn-gift_guide_variable_c.jpg',
        date: '11 Feb - 20 May 2017',
        promo: 'Enjoy 50% off any Starbucks drink',
        address: '901 S Miami Ave #106, Miami, FL 33130, EE. UU.'
      }
    }

    if(error) return <h4>{error.message}</h4>
    else if(loading) return <h4>Loading...</h4>

    return (
      <div className={styles.container}>
        <Header tabs={tabOptions} userData={userData}/>
        <div className={styles.mainView}>
          <div className={styles.lefPanel}>
            <Card title="Campañas" subtitle="Activas">
              <Cupon data={pizzaHut} className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaigns');}}/>
              <Cupon data={starbucks} className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaigns');}}/>
            </Card>
            <Card title="Campañas" subtitle="Inactivas">
              <Campaign data={pizzaHut} className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaigns');}}/>
              <Campaign data={starbucks} className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaigns');}}/>
            </Card>
          </div>
          <main className={styles.renderContainer}>
            <Switch>
              <Route exact path='/' component={PageHome} />
              <Route path='/campaigns' component={CampaignsPage} />
              <Route path='/new_coupon' component={CouponsPage} />
              <Route path='/notifications' component={NotificationsPage} />
              <Route path='/profile' component={ProfilePage} />
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default graphql(getMe)(Home);
