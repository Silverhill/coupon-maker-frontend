import React from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Queries, Subscriptions } from 'Services/graphql';
import { Subscription } from 'react-apollo';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';
import { Avatar, Typography, Icon, Dropdown, DropdownTrigger, DropdownContent } from 'coupon-components';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './Header.css';
import Logo from 'Components/Logo/Logo';
import { primaryColor } from 'Styles/palette.css';
const cx = classNames.bind(styles)

class Header extends React.Component {
  state = {
    menuIsOpen: false,
  }

  onMenuIsOpen = (isOpen) => {
    this.setState({ menuIsOpen: isOpen });
  }

  showSuccessNotification = (code) => {
    const { intl } = this.props;
    let title = intl.formatMessage({id: 'coupons.toasts.success.hunted.title'})+':'+code;
    toast(
      <ToastTemplate
        title={title}
        subtitle={intl.formatMessage({id: 'coupons.toasts.success.hunted.subtitle'})}
        status='success'
      />
    )
  }

  render() {
    const { tabs, optionsUser } = this.props;
    const { menuIsOpen } = this.state;

    return (
      <Subscription subscription={Subscriptions.HUNTED_COUPON}>{({ data, loading}) => {
        if(data && data.huntedCoupon){
          this.showSuccessNotification(data.huntedCoupon.code);
        }
        return(
          <div className={cx(styles.container)}>
            <div className={cx(styles.logo)}>
              <NavLink to='/'>
                <Logo color={primaryColor}/>
                <div className={cx(styles.dividerLogo)}></div>
                <Typography.Subtitle light style={{color: primaryColor}}>MAKER</Typography.Subtitle>
              </NavLink>
            </div>
            <div className={cx(styles.itemsContainer)}>
            <div className={cx(styles.optionTabs)}>
              {tabs && tabs.map((tab) => {
                const key = { key: tab.id };
                return (
                  <NavLink {...key} to={tab.route} className={styles.tabs} activeClassName={styles.active}>
                    <Icon name={tab.icon} size={30} />
                    <Typography.Text small bold>{tab.label}</Typography.Text>
                  </NavLink>
                )
              })}
            </div>
            <Query query={Queries.ME}>{({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              const {me} = data;
              const image = me.image;

              return (
                <Dropdown isOpen={this.onMenuIsOpen}>
                  <DropdownTrigger>
                    <div>
                      <div className={cx(styles.userMenu)}>
                        <div className={styles.profileContainer}>
                          <div className={cx(styles.avatarContainer)}>
                            <Avatar image={image} borderColor='accentColorSecondary' />
                          </div>
                          <Typography.Text small bold style={{margin: "0 10px"}}>{me.name}</Typography.Text>
                        </div>
                        <Icon name={menuIsOpen ? 'FaCaretUp' : 'FaCaretDown'} size={15}/>
                      </div>
                    </div>
                  </DropdownTrigger>
                  <DropdownContent className={styles.menuContainer}>
                    <div className={styles.infoContainer}>
                      <div className={styles.avatarInfo}>
                        <Avatar image={image}/>
                      </div>
                      <div className={styles.profileInfo}>
                        <Typography.Text small>{me.name}</Typography.Text>
                        <Typography.Label>{me.email}</Typography.Label>
                      </div>
                    </div>
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
              );
            }}</Query>
          </div>
        </div>
      );
    }}</Subscription>
  );
  }
}

Header.propTypes = {
  optionsUser: PropTypes.object,
  tabs: PropTypes.array,
}

export default (injectIntl(Header));
