import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.css';

const AppNav = (props) => (
  <div>
    <NavLink exact to='/' activeClassName={styles.active}>Home</NavLink>
    <NavLink to='/campaigns' activeClassName={styles.active}>Campaigns</NavLink>
  </div>
);

export default AppNav;