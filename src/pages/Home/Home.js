import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Home.css';
import { graphql } from 'react-apollo';
import { getHunters, getMyInfo } from 'Services/graphql/queries.graphql';
import { dark } from 'Styles/palette.css';

// Components
import AppNav from '../../commons/components/Nav';
import CampaignsPage from '../Campaigns/CampaignsPage';

const Hunters = ({ children, data: { error, loading, allHunters } }) => {
  if(error) return <h4>{error.message}</h4>
  else if(loading) return <h4>Loading...</h4>

  return (
    <div>
      {(allHunters || []).map((hunter) => {
        return <h4 key={hunter.__typename}>name: {hunter.name}</h4>;
      })}
    </div>
  )
};

const AllHunters = graphql(getHunters)(Hunters)

const PageHome = (props) => <div><h1>Home</h1></div>

@connect(state => ({
  user: state.user,
}))
class Home extends Component {
  render() {
    const { data: { error, loading } } = this.props;

    console.log(this.props);
    if(error) {
      const errors = (error.graphQLErrors || []).map((err) => {
        return err.message;
      });

      if(errors.includes('jwt malformed')) return <Redirect to='/login' />;
      return <h4>{error.message}</h4>
    }
    else if(!loading) return <h4>Loading...</h4>

    return (
      <div className={styles.container}>
        <h1 style={{ background: dark, color: 'white' }}>Welcome</h1>
        <AllHunters />
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

export default graphql(getMyInfo)(Home);
