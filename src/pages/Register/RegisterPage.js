import React from 'react';
import { registerUser } from 'Services/graphql/queries.graphql';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
//styles
import styles from './RegisterPage.css';
//components
import { Slider } from 'coupon-components';
import RegisterForm from './RegisterForm';
import Footer from 'Components/Footer/Footer';
import * as userActions from 'Actions/userActions';
//values
import * as constants from 'Utils/values';

@connect(null, { loginAsync: userActions.login })
class RegisterPage extends React.Component {

  state = {
    loading: false,
  }

  goToHome = () => {
    this.props.history.push('/')
  }

  registerApp = async (values) => {
    const { loginAsync } = this.props;
    const { client: { mutate, query } } = this.props;
    try {
      this.setState({ loading: true });
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
      this.setState({ loading: false });
      const { data: { signIn } } = res;
      const { logged } = loginAsync(signIn.token);
      if(logged) this.goToHome();
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
            <RegisterForm onSubmit={this.registerApp} loading={this.state.loading}/>
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

export default withApollo(RegisterPage);
