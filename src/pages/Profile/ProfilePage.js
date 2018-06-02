import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMe, updateProfile, updateMyPassword } from 'Services/graphql/queries.graphql';
import { Card, Typography, Button, Avatar, InputBox } from 'coupon-components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withApollo, Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

import styles from './ProfilePage.css';
import * as palette from 'Styles/palette.css';
import EditProfile from './EditProfile/EditProfilePage';

class ProfilePage extends Component {
  state = {
    showEditForm: false,
    user: {}
  }

  showSuccessNotification = () => {
    toast(
      <ToastTemplate
        subtitle={<FormattedMessage id='profile.toasts.success.updatePassword.subtitle' />}
        status='success'
        iconProps={{name: 'MdVpnKey'}}
      />
    )
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='profile.toasts.error.updatePassword.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  cancelChanges = () => {
    this.displayForm(false);
  }

  onSubmit = () => {
    this.editForm.forceSubmit();
  }

  displayForm = (formVisible = true) => {
    this.setState({ showEditForm: formVisible });
  }

  onChangeProfileForm = (user) => {
    this.setState({ user });
  }

  render() {
    const { data: { me }, intl } = this.props;
    const { showEditForm, user } = this.state;
    let userImage = (me && me.image) ? me.image : '';

    const passwordSection = (
      <form onChange={this.onChange} className={styles.formContainer}>
        <InputBox name="oldPass"
              type="password"
              style={{width: 250}}
              placeholder={intl.formatMessage({id: 'profile.password.old.placeholder'})}
              labelText={intl.formatMessage({id: 'profile.password.old.label'})}
              className={styles.row_padding}/>
        <InputBox name="newPass"
              type="password"
              style={{width: 250}}
              placeholder={intl.formatMessage({id: 'profile.password.new.placeholder'})}
              labelText={intl.formatMessage({id: 'profile.password.new.label'})}
              className={styles.row_padding}/>
        <Button shape="pill"
                          text={intl.formatMessage({id: 'profile.edit.update'})}
                          onClick={this.onSubmit}
                          className={styles.btnUpdate}/>
      </form>
    )

    const profileSection = (
      <div className={styles.profileContent}>
        <Avatar image={userImage} className={styles.avatar}/>
        <div className={styles.information}>
          <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
            {me && me.name}
          </Typography.Text>
          <Typography.Text small>
            {me && me.email}
          </Typography.Text>
        </div>
      </div>
    )

    return (
      <div className={styles.profile}>
        <Card title={intl.formatMessage({id: 'profile.title'})}
          classNameContent={styles.profileContent}>
          { !showEditForm && profileSection}
          { showEditForm &&
            <EditProfile
              me={me}
              onChange={this.onChangeProfileForm}
              formRef={ref => this.editForm = ref}
            />
          }
          <div className={styles.editProfile}>
            {showEditForm && (
              <React.Fragment>
                <Button neutral text='Cancelar' onClick={this.cancelChanges} />
                <Mutation
                  variables={user}
                  mutation={updateProfile}
                  update={(cache, { data: { updateUser } }) => {
                    const data = cache.readQuery({ query: getMe });
                    cache.writeQuery({ query: getMe, data: { me: { ...data.me, ...updateUser } } });
                  }}
                >{(updateUser, { loading }) => {
                  return (
                    <Button text='Guardar Cambios' onClick={async () => {
                      try {
                        await updateUser({
                          optimisticResponse: {
                            __typename: "Mutation",
                            updateUser: {
                              __typename: "Maker",
                              id: -1,
                              role:'maker',
                              name: (user || {}).name || me.name,
                              email: (user || {}).email || me.email,
                              image: (user.upload || {}).imagePreviewUrl || me.image,
                            }
                          }
                        });

                        // this.showSuccessNotification();
                        console.log('UPDATE USER');
                      } catch (error) {
                        console.log(error);
                        // this.showErrorNotification(error);
                      }
                    }}/>
                  )
                }}</Mutation>
              </React.Fragment>
            )}
            {!showEditForm && (
              <Button neutral text='Editar Perfil' onClick={this.displayForm} />
            )}
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
