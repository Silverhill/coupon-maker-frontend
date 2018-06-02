import React from 'react';
import { registerUser } from 'Services/graphql/queries.graphql';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';
//styles
import styles from './RegisterPage.css';
//components
import RegisterForm from './RegisterForm';
import Footer from 'Components/Footer/Footer';
import * as userActions from 'Actions/userActions';

// images
import waves from 'Assets/images/waves.svg';
import campaigns from 'Assets/images/campaigns.svg';

@connect(null, { loginAsync: userActions.login })
class RegisterPage extends React.Component {
  state = {
    isLoading: false,
    disabledBtn: false
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    this.setState({isLoading: false, disabledBtn: false});
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='register.toasts.error.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  goToHome = () => {
    this.props.history.push('/')
  }

  registerApp = async (values) => {
    const { loginAsync } = this.props;
    const { client: { mutate, query } } = this.props;
    this.setState({isLoading: true, disabledBtn: true});
    try {
      await mutate({
        mutation: registerUser,
        variables: {
          company: values.company,
          name: values.name,
          email: values.email,
          password: values.password
        }
      });
      const res = await query({
        query: loginUser,
        variables: {
          email: values.email,
          password: values.password
        }
      });
      const { data: { signIn } } = res;
      const { logged } = loginAsync(signIn.token);
      if(logged) this.goToHome();
    } catch (err) {
      this.showErrorNotification(err);
    }
  }

  render() {
    const { isLoading, disabledBtn } = this.state;
    return (
      <div className={styles.page} style={{ backgroundImage: `url(${waves})` }}>
        <div className={styles.container}>
          <div className={styles.view}>
            <RegisterForm onSubmit={this.registerApp} isLoading={isLoading} disabledBtn={disabledBtn}/>
            <img className={styles.image} src={campaigns} alt='maker-campaigns' />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(RegisterPage);
