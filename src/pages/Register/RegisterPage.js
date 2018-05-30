import React from 'react';
import { registerUser } from 'Services/graphql/queries.graphql';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
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

  goToHome = () => {
    this.props.history.push('/')
  }

  registerApp = async (values) => {
    const { loginAsync } = this.props;
    const { client: { mutate, query } } = this.props;
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
      console.log('err', err.message);
    }
  }

  render() {
    return (
      <div className={styles.page} style={{ backgroundImage: `url(${waves})` }}>
        <div className={styles.container}>
          <div className={styles.view}>
            <RegisterForm onSubmit={this.registerApp}/>
            <img className={styles.image} src={campaigns} alt='maker-campaigns' />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(RegisterPage);
