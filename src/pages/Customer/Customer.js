import React from 'react';
//styles
import styles from './Customer.css';
//components
import Footer from 'Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Typography } from 'coupon-components';


class Customer extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.view}>
            <div className={styles.image}>
              <img src="http://res.cloudinary.com/meruba/image/upload/v1523672883/hunter2_ltsm1g.png" alt="hunter" height="250px;"/>
            </div>
            <Typography.Subtitle light style={{margin:"20px 0 10px 0"}}>
              Esta cuenta se ha registrado como: {this.props.match.params.role}
            </Typography.Subtitle>
            <Link to='/register' className={styles.link}>
              Me gustaria ser Maker
            </Link>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Customer;
