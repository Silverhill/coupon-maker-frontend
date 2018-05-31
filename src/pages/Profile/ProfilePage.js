import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { Card, Typography, Button, Avatar, InputBox } from 'coupon-components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withApollo } from 'react-apollo';
import { updateMyPassword } from 'Services/graphql/queries.graphql';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

import styles from './ProfilePage.css';
import * as palette from 'Styles/palette.css';
import EditProfile from './EditProfile/EditProfilePage';

class ProfilePage extends Component {
  state = {
    showEditForm: false,
    forcingSubmit: null,
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

  onChange = (ev) => {
    const field = { [ev.target.name]: ev.target.value };
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        ...field,
      }
    }));
  }
  forcingSubmit = (refForm) =>{
    refForm.forceSubmit();
  }

  onSubmit = () => {
    this.setState({forcingSubmit: this.forcingSubmit});

  }

  displayForm = (formVisible = true) => {
    this.setState({ showEditForm: formVisible });
  }

  render() {
    const { data: { me }, intl } = this.props;
    const { showEditForm, forcingSubmit } = this.state;
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
          { showEditForm && <EditProfile me={me} forcingSubmit={forcingSubmit}/>}
          <div className={styles.editProfile}>
            {showEditForm && <Button neutral text='Cancelar' onClick={this.cancelChanges} />}
            <Button neutral={!showEditForm}
              text={showEditForm ? 'Guardar Cambios' : 'Editar Perfil'}
              onClick={!showEditForm ? this.displayForm : this.onSubmit}
            />
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
