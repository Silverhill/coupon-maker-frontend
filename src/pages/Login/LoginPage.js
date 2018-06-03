import React from 'react';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';

//styles
import styles from './LoginPage.css';
//components
import LoginForm from './LoginForm';
import Footer from 'Components/Footer/Footer';
import * as userActions from 'Actions/userActions';

// images
import waves from 'Assets/images/waves.svg';
import campaigns from 'Assets/images/campaigns.svg';

@connect(null, { loginAsync: userActions.login })
class LogInPage extends React.Component {
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
            title={<FormattedMessage id='login.toasts.error.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
  }

  goToHome = () => {
    this.props.history.push('register_coupon');
  }

  loginApp = async (values) => {
    const {
      loginAsync,
      client: { query }
    } = this.props;
    this.setState({isLoading: true, disabledBtn: true});
    try {
      const res = await query({
        query: loginUser,
        variables: {
          email: values.email,
          password: values.password
        }
      });
      const { data: { signIn } } = res;
      const { logged, role } = await loginAsync(signIn.token);
      if(logged && role === 'maker') {
        this.goToHome();
      }else{
        this.props.history.push(`/customer/${role}`);
      }
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
            <LoginForm onSubmit={this.loginApp} isLoading={isLoading} disabledBtn={disabledBtn}/>
            <img className={styles.image} src={campaigns} alt='maker-campaigns' />
          </div>
        </div>
        <Footer/>
      </div>
  );
  }
}

export default withApollo(LogInPage);
