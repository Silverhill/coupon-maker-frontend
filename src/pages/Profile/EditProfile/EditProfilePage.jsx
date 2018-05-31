import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { InputFile, Avatar, InputBox, Form } from 'coupon-components';
import { withApollo, Mutation } from 'react-apollo';
import { getMe, updateProfile } from 'Services/graphql/queries.graphql';
import { toast } from 'react-toastify';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';

import styles from './EditProfile.css';

class EditProfilePage extends Component {
  state = {
    user: {}
  }

  showSuccessNotification = () => {
    toast(
      <ToastTemplate
        subtitle={<FormattedMessage id='profile.toasts.success.update.subtitle' />}
        status='success'
      />
    )
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='profile.toasts.error.update.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  onSubmit = async () => {
    console.log('Se llamooo..!!');
    const { user } = this.state;
    const { client: { mutate } } = this.props;
    let userFile = user.upload ? user.upload.file : null;
    let userImage = user.upload ? user.upload.imagePreviewUrl : null;
    try {
       await mutate({
        mutation: updateProfile,
        variables: {
          name: user.name,
          email: user.email,
          upload: userFile
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateUser: {
            __typename: "Maker",
            id: -1,
            role:'maker',
            name: user.name,
            email: user.email,
            image: userImage
          }
        },
        update: (cache, { data: {updateUser} }) => {
          const data = cache.readQuery({ query: getMe });
          if(updateUser.name) { data.me.name = updateUser.name; }
          if(updateUser.email) { data.me.email = updateUser.email; }
          if(updateUser.image) { data.me.image = updateUser.image; }
          cache.writeQuery({ query: getMe, data: data });
          console.log('pinche optimize');
          if(updateUser.id === -1) {
            console.log('Updated')
          }else{
            this.showSuccessNotification();
          }
        }
      });
    } catch (err) {
      this.showErrorNotification(err);
      return;
    }
  }

  onChange = (ev) => {
    const field = { [ev.target.name]: ev.target.value };
    this.updateState(field, () => {
      if(this.props.onChange) this.props.onChange(this.state.user);
    });

  }

  onChangeImage = (ev, values) => {
    const field = { upload:  values};
    this.updateState(field, () => {
      if(this.props.onChange) this.props.onChange(this.state.user);
    });
  }

  updateState = (field, cb) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        ...field,
      }
    }), cb);
  }

  render() {
    const { me, intl, formRef } = this.props;
    const { user } = this.state;
    const imageUser = (user.upload && user.upload.imagePreviewUrl) ? user.upload.imagePreviewUrl : me.image;
    const name = (user.name === undefined) ? me.name : user.name;
    const email = (user.email  === undefined) ? me.email : user.email;

    return (
      <div className={styles.editProfile}>
        <div className={styles.avatarContainer}>
          <InputFile updateFile={this.onChangeImage}>
            <Avatar image={imageUser} className={styles.avatar} />
          </InputFile>
        </div>
        <div className={styles.fieldsContainer}>
          <Form onChange={this.onChange} ref={formRef}>
            <InputBox name="name"
              placeholder={intl.formatMessage({ id: 'profile.edit.name.placeholder' })}
              className={styles.row_padding}
              value={name}
              required="required" />
            <InputBox name="email"
              placeholder={intl.formatMessage({ id: 'profile.edit.email.placeholder' })}
              className={styles.row_padding}
              value={email}
              required="required" />
          </Form>
        </div>
      </div>
    )
  }
}

export default withApollo(injectIntl(EditProfilePage));
