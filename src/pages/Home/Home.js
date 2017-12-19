import React, { Component } from 'react';
import logo from '../../logo.svg';
import styles from './Home.scss';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import * as counterActions from './../../actions/counterActions';

const cx = classNames.bind(styles);

@connect(state => ({
  counter: state.counter,
}), {
  increment: counterActions.increment,
  decrement: counterActions.decrement,
})
class Home extends Component {

  increment = () => {
    const { increment: incrementAction } = this.props;
    incrementAction();
  }

  decrement = () => {
    const { decrement: decrementAction } = this.props;
    decrementAction();
  }

  render() {
    const { counter } = this.props;
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>{counter}</h1>
        </header>
        <div className={styles.containerButtons}>
          <div className={cx(styles.button, styles.blue)} onClick={this.increment}>+</div>
          <div className={cx(styles.button, styles.red)} onClick={this.decrement}>-</div>
        </div>

        <small>Este counter reacciona a las acciones que hacer que el reducer modifique el estado actual del counter</small>
      </div>
    );
  }
}

export default Home;
