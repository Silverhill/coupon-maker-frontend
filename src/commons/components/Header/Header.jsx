import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography, Icon, Menu } from 'coupon-components';
import classNames from 'classnames/bind';
import styles from './Header.css';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles)

class Header extends React.Component {

  render() {
    const menuOptions = [
      {
        label: 'My Profile'
      },
      {
        label: 'Logout'
      }
    ]


    return (
      <div className={cx(styles.container)}>
        <div>
          <NavLink exact to='/' activeClassName={styles.active}>
            <Logo color="#ff4a67"/>
          </NavLink>
        </div>
        <div className={cx(styles.itemsContainer)}>
          <NavLink to='/new_coupon' activeClassName={styles.active}>
            <Icon name='CpTicket' size={30}/>
            <Typography.Text small bold>Registro Cupones</Typography.Text>
          </NavLink>
          <NavLink to='/campaigns' activeClassName={styles.active}>
            <Icon name='FaListAlt' size={30}/>
            <Typography.Text small bold>Campañas</Typography.Text>
          </NavLink>
          <NavLink to='/notifications' activeClassName={styles.active}>
            <Icon name='FaBellO' size={30}/>
            <Typography.Text small bold>Notificaciones</Typography.Text>
          </NavLink>
          <div className={cx(styles.avatarContainer)}>
            <Avatar image='https://i.pinimg.com/564x/bc/c8/10/bcc8102f42e58720355ca02d833c204b.jpg'
            borderColor="accentColorSecondary"/>
          </div>
          <Typography.Text small bold>Carbon Burguer</Typography.Text>
          <Menu leftMenu options={menuOptions} />
        </div>
      </div>
  );
  }
}

export default Header