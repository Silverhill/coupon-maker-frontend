import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMe } from 'Services/graphql/queries.graphql';
import { Card, Typography, Button, Avatar, InputFile, Menu, InputBox } from 'coupon-components';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withApollo } from 'react-apollo';
import { changeUserImage, updateMyPassword } from 'Services/graphql/queries.graphql';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

import styles from './ProfilePage.css';
import * as palette from 'Styles/palette.css';

class ProfilePage extends Component {
  state = {
    isLoadingImage: false,
    showChangePassword: false,
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

  changeImage = async (ev, value) => {
    const { client: { mutate } } = this.props;
    this.setState({isLoadingImage: true});
    try {
      await mutate({
        mutation: changeUserImage,
        variables: {
          upload: value.file
        },
        optimisticResponse: {
          __typename: "Mutation",
          addImageToUser: {
            __typename: "Maker",
            id: -1,
            image: value.imagePreviewUrl,
          }
        },
        update: (cache, { data: {addImageToUser} }) => {
          const data = cache.readQuery({ query: getMe });
          data.me.image = addImageToUser.image;
          cache.writeQuery({ query: getMe, data: data });
        }
      });
    } catch (err) {
      this.showErrorNotification(err);
    }
    this.setState({isLoadingImage: false});
  }

  changeMenu = (ev, value) => {
    // if(value.iconName === 'FaEdit'){
    //   this.props.history.push('/profile/edit')
    // }else if(value.iconName === 'FaKey'){
      // this.setState({showChangePassword: true});
    // }

    this.displayForm();
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

  onSubmit = async (ev) => {
    ev.preventDefault();
    const { user } = this.state;
    const { client: { mutate } } = this.props;
    try {
       await mutate({
        mutation: updateMyPassword,
        variables: {
          oldPass: user.oldPass,
          newPass: user.newPass
        }
      });
      this.showSuccessNotification();
      this.displayForm(false);
    } catch (err) {
      this.showErrorNotification(err);
      return;
    }
  }

  displayForm = (formVisible = true) => {
    this.setState({ showChangePassword: formVisible });
  }

  render() {
    const { data: { me }, intl } = this.props;
    const { isLoadingImage, showChangePassword } = this.state;
    let userImage = (me && me.image) ? me.image : '';
    const menuOptions = [
      {label: "Editar", iconName: "FaEdit"},
      {label: "Cambiar Contraseña", iconName: "FaKey"},
    ];

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
            { showChangePassword && passwordSection}
          </div>
          <div className={styles.editProfile}>
            {showChangePassword && <Button neutral text='Cancelar' onClick={this.cancelChanges} />}
            <Button neutral={!showChangePassword}
              text={showChangePassword ? 'Guardar Cambios' : 'Editar Perfil'}
              onClick={!showChangePassword ? this.changeMenu : this.onSubmit}
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
