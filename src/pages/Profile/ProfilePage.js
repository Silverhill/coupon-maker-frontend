import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { Card, Typography, Button, Avatar, InputFile } from 'coupon-components';
import { injectIntl } from 'react-intl';
import { withApollo } from 'react-apollo';
import { changeUserImage } from 'Services/graphql/queries.graphql';

import styles from './ProfilePage.css';
import * as palette from 'Styles/palette.css';
class ProfilePage extends Component {
  state = {
    isLoadingImage: false
  }

  changeImage = async (ev, value) => {
    const { client: { mutate } } = this.props;
    this.setState({isLoadingImage: true});
    try {
      await mutate({
        mutation: changeUserImage,
        variables: {
          upload: value.file
        },
        refetchQueries: [{query: getMe}]
      });
      this.setState({isLoadingImage: false});
    } catch (error) {
      return;
    }
  }

  render() {
    const { data: { me }, intl } = this.props;
    const { isLoadingImage } = this.state;
    let userImage = (me && me.image) ? me.image : '';
    return (
      <div className={styles.profile}>
        <Card title={intl.formatMessage({id: 'profile.title'})}
          classNameContent={styles.profileContent}>
          <InputFile updateFile={this.changeImage} isLoading={isLoadingImage}>
            <Avatar image={userImage} className={styles.avatar}/>
          </InputFile>
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

export default graphql(getMe)(withApollo((injectIntl(ProfilePage))));
