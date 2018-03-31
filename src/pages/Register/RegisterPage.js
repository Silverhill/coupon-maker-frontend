import React from 'react';
import { registerUser } from 'Services/graphql/queries.graphql';
import { loginUser } from 'Services/graphql/queries.graphql';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
//styles
import styles from './RegisterPage.css';
import 'coupon-components/build/styles.css';
//components
import { Slider } from 'coupon-components';
import RegisterForm from './RegisterForm';
import Footer from 'Components/Footer/Footer';
import * as userActions from '../../actions/userActions';

@connect(state => ({
  form: state.form.register
}), {
  loginAsync: userActions.login,
})

class RegisterPage extends React.Component {

  goToHome = () => {
    this.props.history.push('/')
  }

  registerApp = async (values = {}) => {
    const { loginAsync, form } = this.props;
    const { client: { mutate, query } } = this.props;
    try {
      await mutate({
        mutation: registerUser,
        variables: {
          name: form.values.name,
          email: form.values.email,
          password: form.values.password
        }
      });
      const res = await query({
        query: loginUser,
        variables: {
          email: form.values.email,
          password: form.values.password
        }
      });
      const { data: { signIn } } = res;
      const { logged } = loginAsync(signIn.token);
      if(logged) this.goToHome();
    } catch (error) {
      return;
    }
  }

  render() {
    const items = [
      {
        id: 0,
        title: 'Ingresa tu promoción',
        description: 'Many people understand the concept of passive solar'+
        'for heating a home. Fewer realize it can be used in to cook food and sterilize water.',
        image: 'https://i.ytimg.com/vi/mEBFswpYms4/maxresdefault.jpg'
      },
      {
        id: 1,
        title: 'Gana mas en tu negocio',
        description: 'Ingresa tus promociones en cada campaña',
        image: 'https://www.goodfood.com.au/content/dam/images/h/0/f/a/q/i/image.related.wide'+
        'Landscape.940x529.h0fa4n.png/1515456591895.jpg'
      },
      {
        id: 2,
        title: 'Consigue más consumidores',
        description: 'Crea tus cupones y incrementa tus ventas.',
        image: 'https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,'+
        'q_75,w_1200/v1/clients/pensacola/5Seafood_a02cf72f-a540-429f-868c-977de095e977.jpg'
      }
    ];

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <RegisterForm onSubmit={this.registerApp}/>
          <div style={{width: '500px', height: '600px'}}>
            <Slider items={items}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withApollo(RegisterPage);
