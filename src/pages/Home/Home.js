import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';

// Components
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer/Footer';
import { Card, Coupon, Campaign } from 'coupon-components';
// Pages
import CampaignsPage from '../Campaigns/CampaignsPage';
import NotificationsPage from '../Notifications/NotificationsPage';
import CouponsPage from '../Coupons/CouponsPage';
import ProfilePage from '../Profile/ProfilePage';
import CampaingPage from '../Campaing/CampaingPage';
import NewCampaingPage from '../Campaing/NewCampaing/NewCampaingPage';

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
          <div className={styles.leftPanel}>
            <Card title="Campañas" subtitle="Activas" classNameCard={styles.card}>
              <Coupon
                image={pizzaHut.cupon.image}
                logo={pizzaHut.maker.image}
                title={pizzaHut.cupon.promo}
                date={pizzaHut.cupon.date}
                address={pizzaHut.cupon.address}
                totalCoupons={pizzaHut.maker.cupons}
                className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaign');}}
              />
              <Coupon
                image={starbucks.cupon.image}
                logo={starbucks.maker.image}
                title={starbucks.cupon.promo}
                date={starbucks.cupon.date}
                address={starbucks.cupon.address}
                totalCoupons={starbucks.maker.cupons}
                className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaign');}}/>
            </Card>
            <Card title="Campañas" subtitle="Inactivas" classNameCard={styles.card}>
              <Campaign
                title={pizzaHut.cupon.promo}
                date={pizzaHut.cupon.date}
                address={pizzaHut.cupon.address}
                totalCoupons={pizzaHut.maker.cupons}
                totalCouponsHunted={pizzaHut.maker.hunted}
                className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaign');}}/>
              <Campaign
                title={starbucks.cupon.promo}
                date={starbucks.cupon.date}
                address={starbucks.cupon.address}
                totalCoupons={starbucks.maker.cupons}
                totalCouponsHunted={pizzaHut.maker.hunted}
                className={styles.campaign}
                onClick={()=>{this.props.history.push('/campaign');}}/>
            </Card>
          </div>
          <main className={styles.renderContainer}>
            <Switch>
              <Route exact path='/' component={PageHome} />
              <Route path='/campaigns' component={CampaignsPage} />
              <Route path='/new_coupon' component={CouponsPage} />
              <Route path='/notifications' component={NotificationsPage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/new_campaign' component={NewCampaingPage} />
              <Route path='/campaign' component={CampaingPage} />
            </Switch>
          </main>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default graphql(getMe)(Home);
