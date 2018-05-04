import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Card, InputFile, Avatar, InputBox, Button } from 'coupon-components';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import styles from './EditProfile.css';

class EditProfilePage extends Component {

  handleSubmit = (values = {}) => {
    const { form } = this.props;
    console.log('form', form);
  }

  render() {
    const { intl } = this.props;
    const profileData = {};
    const valuesForm = this.props.form_profile && this.props.form_profile.values;
    if(valuesForm){
      profileData.image = valuesForm.image && valuesForm.image.imagePreviewUrl;
    }

    return (
      <div className={styles.editProfile}>
        <Card title={intl.formatMessage({id: 'profile.edit.title'})}>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formContainer}>
              <div className={styles.avatarContainer}>
                <Field name="image"
                    reduxFormInput
                    component={InputFile}>
                  <Avatar image={profileData.image} className={styles.avatar}/>
                </Field>
              </div>
              <div className={styles.fieldsContainer}>
                <Field name="name"
                      reduxFormInput
                      component={InputBox}
                      placeholder={intl.formatMessage({id: 'profile.edit.name.placeholder'})}
                      labelText={intl.formatMessage({id: 'profile.edit.name.label'})}
                      className={styles.row_padding}/>
                <Field name="email"
                      reduxFormInput
                      component={InputBox}
                      placeholder={intl.formatMessage({id: 'profile.edit.email.placeholder'})}
                      labelText={intl.formatMessage({id: 'profile.edit.email.label'})}
                      className={styles.row_padding}/>
              </div>
            </div>
            <Button shape="pill" type="submit"
                    text={intl.formatMessage({id: 'profile.edit.update'})}
                    className={styles.btnUpdate}/>
          </form>
        </Card>
      </div>
    )
  }
}

export default connect(state => ({ form_profile: state.form.edit_profile, initialValues: {name:"Darwin", email:"daosgc@gmail.com"}}))(
  reduxForm({
    form: 'edit_profile'
  })(injectIntl(EditProfilePage)));