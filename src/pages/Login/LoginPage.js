import React from 'react';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

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

  goToHome = () => {
    this.props.history.push('new_coupon');
  }

  loginApp = async (values) => {
    const {
      loginAsync,
      client: { query }
    } = this.props;
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
      console.log('err', err.message);
    }
  }

  render() {
    return (
      <div className={styles.page} style={{ backgroundImage: `url(${waves})` }}>
        <div className={styles.container}>
          <div className={styles.view}>
            <LoginForm onSubmit={this.loginApp}/>
            <img className={styles.image} src={campaigns} alt='maker-campaigns' />
          </div>
        </div>
        <Footer/>
      </div>
  );
  }
}

export default withApollo(LogInPage);
