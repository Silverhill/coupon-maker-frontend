import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Home.scss';
import { graphql } from 'react-apollo';
import { getHunters } from 'Services/graphql/queries.graphql';

@connect(state => ({
  counter: state.counter,
}))
class Home extends Component {
  render() {
    const { data: { error, loading, allHunters: hunters } } = this.props;

    if(error) return <span>Ups! Algo va mal {error.message}</span>;
    else if(loading) return <h3>Loading...</h3>;

    console.log(hunters);

    return (
      <div className={styles.container}>
        <h1>Home</h1>
      </div>
    );
  }
}

export default graphql(getHunters)(Home);
