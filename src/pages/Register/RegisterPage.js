import React from 'react';
import { loginUser } from 'Services/graphql/queries.graphql';
import classNames from 'classnames/bind';
import styles from './RegisterPage.css'
import 'coupon-components/build/styles.css';
import { InputBox, Button, Slider, Typography } from 'coupon-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/Logo';
import Footer from 'Components/Footer/Footer';



const cx = classNames.bind(styles);

class RegisterPage extends React.Component {
  state = {
    credentials: {
      email: '',
      password: ''
    }
  }

  onChange = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      }
    });

  }

  onSubmit = () => {

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

    const form = (
      <form onChange={this.onChange} onSubmit={this.onSubmit}>
        <FormattedMessage id="register.labels.name">
          { placeholder =>
            <InputBox
              name="name"
              leftIcon="FaUser"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.name}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.company">
          { placeholder =>
            <InputBox
              name="company"
              leftIcon="FaBriefcase"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.company}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.email">
          { placeholder =>
            <InputBox
              name="email"
              leftIcon="FaEnvelope"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.email}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <FormattedMessage id="register.labels.password">
          { placeholder =>
            <InputBox
              name="password"
              leftIcon="FaLock"
              type="password"
              placeholder={placeholder}
              shape="pill"
              value={this.state.credentials.password}
              className={styles.input}
            />
          }
        </FormattedMessage>

        <Button
          shape="pill"
          gradient
          type="submit"
          text={<FormattedMessage id='register.buttons.register' />}
        />
      </form>
    )

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.form}>
            <div className={cx(styles.logo)}>
              <Logo/>
              <div className={cx(styles.pipe)}/>
              <Typography.Subtitle light >MAKER</Typography.Subtitle>
            </div>
            {form}
            <Link to='login' className={styles.link}>
              <FormattedMessage id='register.buttons.hasAccount' />
            </Link>
          </div>
          <div style={{width: '500px', height: '600px'}}>
            <Slider items={items}/>
          </div>
        </div>
        <Footer/>
      </div>
  );
  }
}

export default RegisterPage;
