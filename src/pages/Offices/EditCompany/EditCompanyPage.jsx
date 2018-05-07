import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Card, InputFile, Avatar, InputBox, Button } from 'coupon-components';
import { withApollo } from 'react-apollo';
import { Query } from 'react-apollo';
import { getMyCompany, updateMyCompany } from 'Services/graphql/queries.graphql';

import styles from './EditCompany.css';

class EditCompanyPage extends Component {
  state = {
    company: {}
  }

  onSubmit = async (ev) => {
    ev.preventDefault();
    const { company } = this.state;
    const { client: { mutate } } = this.props;
    let companyFile = company.upload ? company.upload.file : null;
    let companyImage = company.upload ? company.upload.imagePreviewUrl : null;

    try {
       await mutate({
        mutation: updateMyCompany,
        variables: {
          businessName: company.name,
          slogan: company.slogan,
          upload: companyFile,
          id: this.props.match.params.id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          updateCompany: {
            __typename: "Company",
            id: -1,
            businessName: company.name || '',
            slogan: company.slogan || '',
            logo: companyImage
          }
        },
        update: (cache, { data: {updateCompany} }) => {
          const data = cache.readQuery({ query: getMyCompany });
          if(updateCompany.businessName) { data.myCompany.businessName = updateCompany.businessName; }
          if(updateCompany.slogan) { data.myCompany.slogan = updateCompany.slogan; }
          if(updateCompany.logo) { data.myCompany.logo = updateCompany.logo; }
          cache.writeQuery({ query: getMyCompany, data: data });
          this.props.history.push('/offices')
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
      company: {
        ...prevState.company,
        ...field,
      }
    }));
  }

  onChangeImage = (ev, values) => {
    const field = { upload:  values};
    this.setState(prevState => ({
      company: {
        ...prevState.company,
        ...field,
      }
    }));
  }

  render() {
    const { intl } = this.props;
    const { company } = this.state;
    return (
      <Query query={getMyCompany}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const { myCompany } = data;
          const imageCompany = (company.upload && company.upload.imagePreviewUrl) ? company.upload.imagePreviewUrl : myCompany.logo;
          const name = (company.name === undefined) ? myCompany.businessName : company.name;
          const slogan = (company.slogan  === undefined) ? myCompany.slogan : company.slogan;

          return (
            <div className={styles.editcCompany}>
              <Card title={intl.formatMessage({id: 'profile.edit.title'})}>
                <div className={styles.formContainer}>
                  <div className={styles.avatarContainer}>
                    <InputFile updateFile={this.onChangeImage}>
                      <Avatar image={imageCompany} className={styles.avatar}/>
                    </InputFile>
                  </div>
                  <div className={styles.fieldsContainer}>
                    <form onChange={this.onChange} onSubmit={this.onSubmit}>
                      <InputBox name="name"
                            placeholder={intl.formatMessage({id: 'profile.edit.name.placeholder'})}
                            labelText={intl.formatMessage({id: 'myCompany.company'})}
                            className={styles.row_padding}
                            value={name}
                            required="required"/>
                      <InputBox name="slogan"
                            placeholder={intl.formatMessage({id: 'profile.edit.email.placeholder'})}
                            labelText={intl.formatMessage({id: 'myCompany.slogan'})}
                            className={styles.row_padding}
                            value={slogan}/>
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

export default withApollo(injectIntl(EditCompanyPage));
