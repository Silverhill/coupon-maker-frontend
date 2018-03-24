import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Typography, Icon, Menu, Dropdown, DropdownTrigger, DropdownContent } from 'coupon-components';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Header.css';
import Logo from 'Components/Logo/Logo';

const cx = classNames.bind(styles)

class Header extends React.Component {

  render() {
    const { tabs, userData } = this.props;

    return (
      <div className={cx(styles.container)}>
        <div className={cx(styles.logo)}>
          <NavLink exact to='/' activeClassName={styles.active}>
            <Logo color="#ff4a67"/>
            <div className={cx(styles.dividerLogo)}></div>
            <Typography.Subtitle light style={{color: "#ff4a67"}}>MAKER</Typography.Subtitle>
          </NavLink>
        </div>
        <div className={cx(styles.itemsContainer)}>
          {tabs && tabs.map((tab) => {
            const key = { key: tab.id };
            return (
              <NavLink {...key} to={tab.route} className={cx(styles.tabs)} activeClassName={styles.active}>
                <Icon name={tab.icon} size={30}/>
                <Typography.Text small bold>{tab.label}</Typography.Text>
              </NavLink>
            )
          })}
          <Dropdown>
            <DropdownTrigger>
              <div className={cx(styles.userMenu)}>
                <div className={cx(styles.avatarContainer)}>
                  <Avatar image={userData.image}
                  borderColor="accentColorSecondary"/>
                </div>
                <Typography.Text small bold>{userData.name}</Typography.Text>
                <Icon name="FaCaretDown" size={10}/>
              </div>
            </DropdownTrigger>
            <DropdownContent>
              <div style={{textAlign:'center'}}>
                <ul style={{listStyleType:'none', padding:'0 10px'}}>
                  <li>My Profile</li>
                  <li>Logout</li>
                </ul>
              </div>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
  );
  }
}

Header.propTypes = {
  userData: PropTypes.object,
  tabs: PropTypes.array,
}

export default Header