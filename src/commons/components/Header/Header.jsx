import React from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { Avatar, Typography, Icon, Dropdown, DropdownTrigger, DropdownContent } from 'coupon-components';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Header.css';
import Logo from 'Components/Logo/Logo';
import { primaryColor } from 'Styles/palette.css';
const cx = classNames.bind(styles)

class Header extends React.Component {

  render() {
    const { tabs, optionsUser } = this.props;

    return (
      <div className={cx(styles.container)}>
        <div className={cx(styles.logo)}>
          <NavLink to='/'>
            <Logo color={primaryColor}/>
            <div className={cx(styles.dividerLogo)}></div>
            <Typography.Subtitle light style={{color: primaryColor}}>MAKER</Typography.Subtitle>
          </NavLink>
        </div>
        <div className={cx(styles.itemsContainer)}>
          {tabs && tabs.map((tab) => {
            const key = { key: tab.id };
            return (
              <NavLink {...key} to={tab.route} className={styles.tabs} activeClassName={styles.active}>
                <Icon name={tab.icon} size={30} />
                <Typography.Text small bold>{tab.label}</Typography.Text>
              </NavLink>
            )
          })}
          <Dropdown>
            <DropdownTrigger>
              <div>
                <Query query={getMe}>
                  {({ loading, error, data}) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    const {me} = data;
                    const image = me.image || 'https://i.pinimg.com/564x/bc/c8/10/bcc8102f42e58720355ca02d833c204b.jpg';
                    return (
                      <div className={cx(styles.userMenu)}>
                        <div className={cx(styles.avatarContainer)}>
                          <Avatar
                            image={image}
                            borderColor="accentColorSecondary"
                          />
                        </div>
                        <Typography.Text small bold style={{margin: "0 10px"}}>{me.name}</Typography.Text>
                        <Icon name="FaCaretDown" size={10}/>
                      </div>
                    );
                  }}
                </Query>
              </div>
            </DropdownTrigger>
            <DropdownContent className={styles.menuContainer}>
              {optionsUser.options && optionsUser.options.map((option, i) => {
                return (
                  <div key={`option-${i}`} onClick={option.onClick} className={styles.menuOption}>
                    <Typography.Text small>
                      {option.value}
                    </Typography.Text>
                  </div>
                )
              })}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
  );
  }
}

Header.propTypes = {
  optionsUser: PropTypes.object,
  tabs: PropTypes.array,
}

export default Header
