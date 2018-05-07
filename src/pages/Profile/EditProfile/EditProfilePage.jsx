import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Card, InputFile, Avatar, InputBox, Button } from 'coupon-components';
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo';
import { getMe, updateProfile } from 'Services/graphql/queries.graphql';

import styles from './EditProfile.css';

class EditProfilePage extends Component {
  state = {
    user: {}
  }

  onSubmit = async (ev) => {
    ev.preventDefault();
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
          this.props.history.push('/profile')
        }
      });
    } catch (error) {
      console.log('error', error);
      return;
    }
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

  onChangeImage = (ev, values) => {
    const field = { upload:  values};
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        ...field,
      }
    }));
  }

  render() {
    const { intl } = this.props;
    const { user } = this.state;
    return (
      <Query query={getMe}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { me } = data;
          const imageUser = (user.upload && user.upload.imagePreviewUrl) ? user.upload.imagePreviewUrl : me.image;
          const name = (user.name === undefined) ? me.name : user.name;
          const email = (user.email  === undefined) ? me.email : user.email;

          return (
            <div className={styles.editProfile}>
              <Card title={intl.formatMessage({id: 'profile.edit.title'})}>
                <div className={styles.formContainer}>
                  <div className={styles.avatarContainer}>
                    <InputFile updateFile={this.onChangeImage}>
                      <Avatar image={imageUser} className={styles.avatar}/>
                    </InputFile>
                  </div>
                  <div className={styles.fieldsContainer}>
                    <form onChange={this.onChange} onSubmit={this.onSubmit}>
                      <InputBox name="name"
                            placeholder={intl.formatMessage({id: 'profile.edit.name.placeholder'})}
                            labelText={intl.formatMessage({id: 'profile.edit.name.label'})}
                            className={styles.row_padding}
                            value={name}
                            required="required"/>
                      <InputBox name="email"
                            placeholder={intl.formatMessage({id: 'profile.edit.email.placeholder'})}
                            labelText={intl.formatMessage({id: 'profile.edit.email.label'})}
                            className={styles.row_padding}
                            value={email}
                            required="required"/>
                      <Button shape="pill"
                          text={intl.formatMessage({id: 'profile.edit.update'})}
                          type="submit"
                          className={styles.btnUpdate}/>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default withApollo(injectIntl(EditProfilePage));