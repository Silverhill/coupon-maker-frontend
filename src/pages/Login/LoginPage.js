import React from 'react';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
//styles
import styles from './LoginPage.css';
//components
import { Slider } from 'coupon-components';
import LoginForm from './LoginForm';
import Footer from 'Components/Footer/Footer';
import * as userActions from 'Actions/userActions';
//values
import * as constants from 'Utils/values';

@connect(null, { loginAsync: userActions.login })
class LogInPage extends React.Component {

  state = {
    loading: false,
  }

  goToHome = () => {
    this.props.history.push('new_coupon');
  }

  loginApp = async (values) => {
    const {
      loginAsync,
      client: { query }
    } = this.props;

    try {
      this.setState({ loading: true });
      const res = await query({
        query: loginUser,
        variables: {
          email: values.email,
          password: values.password
        }
      });
      this.setState({ loading: false });
      const { data: { signIn } } = res;
      const { logged, role } = await loginAsync(signIn.token);
      if(logged && role === 'maker') {
        this.goToHome();
      }else{
        this.props.history.push(`/customer/${role}`);
      }
    } catch (err) {
      console.log('err', err.message);
      this.setState({ loading: false });
    }
  }

  render() {
    const items = constants.sliderImages;
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.view}>
            <LoginForm onSubmit={this.loginApp} loading={this.state.loading}/>
            <div style={{width: '500px', height: '600px'}}>
              <Slider items={items}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  );
  }
}

export default withApollo(LogInPage);
