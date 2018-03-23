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
import AppNav from '../../commons/components/Nav';
import CampaignsPage from '../Campaigns/CampaignsPage';

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
        <h1 style={{ background: dark, color: 'white' }}>Welcome</h1>
        <AppNav />

        <main className={styles.renderContainer}>
          <Switch>
            <Route exact path='/' component={PageHome} />
            <Route path='/campaigns' component={CampaignsPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default graphql(getMe)(Home);
