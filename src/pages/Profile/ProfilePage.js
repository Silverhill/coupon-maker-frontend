import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { Card, Typography, Button, Avatar } from 'coupon-components';
import { injectIntl } from 'react-intl';

import styles from './ProfilePage.css';
import * as palette from 'Styles/palette.css';
class ProfilePage extends Component {

  render() {
    const { data: { me }, intl } = this.props;

    return (
      <div className={styles.profile}>
        <Card title={intl.formatMessage({id: 'profile.title'})}
          classNameContent={styles.profileContent}>
          <div className={styles.avatar}>
            <Avatar image={'https://i.pinimg.com/564x/bc/c8/10/bcc8102f42e58720355ca02d833c204b.jpg'}/>
          </div>
          <div className={styles.information}>
            <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
              {me && me.name}
            </Typography.Text>
            <Typography.Text small>
              {me && me.email}
            </Typography.Text>
          </div>
        </Card>
        <Card classNameContent={styles.accountOptions}>
          <div className={styles.information}>
            <Typography.Text bold style={{padding:"10px 0", fontSize:'20px', color: palette.pinkRed}}>
              Desactivar tu cuenta
            </Typography.Text>
            <Typography.Text small>
              Esto borrará permanentemente tus cupones, campañas y toda la información almacenada
            </Typography.Text>
          </div>
          <div>
            <Button
              shape="pill"
              text="Desactivar Cuenta"
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default graphql(getMe)(injectIntl(ProfilePage));
