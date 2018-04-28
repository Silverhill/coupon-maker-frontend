import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { canjear } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';

import { Typography, Panel, Card, BasicRow } from 'coupon-components';
import styles from './CouponsPage.css';
import RegisterCouponForm from './RegisterCouponForm';

@connect(state => ({
  form: state.form.registerCoupon
}))

class CouponsPage extends Component {

  state = {
    errors: null
  }

  registerCoupon = async (values = {}) => {
    const {
      form,
      client: { mutate }
    } = this.props;
    try {
      await mutate({
        mutation: canjear,
        variables: {
          code: form.values.code
        }
      })
    } catch (error) {
      this.setState({
        errors: error
      });
      return;
    }
  }

  render() {

    const lastHunters = [
      {
        name: 'Khal Drogo',
        email: 'khaldrogo@gmail.com',
        image: 'https://i.pinimg.com/originals/78/df/55/78df55e142774e705484324c944a0bb7.jpg',
        totalCoupons: 10,
        id: 1,
        campaign: "2x1 en hamburguesas"
      },
      {
        name: 'Hodor Harries',
        email: 'hodor@gmail.com',
        image: 'http://www.mariapicasso.com/wp-content/uploads/2015/09/hodor_by_mariapicasso.jpg',
        totalCoupons: 2,
        id: 2,
        campaign: "30% de descuento en bebidas y jugos"
      },
      {
        name: 'Margaery Tyrell',
        email: 'margaerytyrell@gmail.com',
        image: 'https://i.pinimg.com/originals/70/e2/9f/70e29fb0ec6721fcd6d740444c80e2e0.jpg',
        totalCoupons: 4,
        id: 3,
        campaign: "Jueves 2x1 en pizzas medianas y familiares"
      }
    ]

    const hunters = (
      lastHunters && lastHunters.map((cpg) => {
        const key = { key: cpg.id };
        return (
          <BasicRow {...key}
            title={cpg.name}
            image={cpg.image}
            subtitle={cpg.email}
            label= {cpg.campaign}
            number= {1}
            className={styles.row}
          />
        )
      })
    )
    const anyHunter = (
      <div className={styles.notFound}>
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          Aun nadie a tomado esta promoción
        </Typography.Text>
      </div>
    )

    const errorMessages = (
      <div className={styles.errorMessages}>
        <Typography.Text  small style={{color:"red"}}>
          Codigo Invalido
        </Typography.Text>
      </div>
    )
    return (
      <div className={styles.container}>
        <Card title="Registrar Coupon">
          <div className={styles.register}>
            <RegisterCouponForm onSubmit={this.registerCoupon}/>
            {this.state.errors ? errorMessages : ""}
          </div>
          <div style={{marginTop: '10px'}}>
            <Panel title="Top 5 Hunters">
              {hunters.length > 0 ? hunters : anyHunter }
            </Panel>
          </div>
          <div style={{marginTop: '10px'}}>
            <Panel title="Todos los Hunters">
            {hunters.length > 0 ? hunters : anyHunter }
            </Panel>
          </div>
        </Card>
      </div>
    )
  }
}

export default withApollo(injectIntl(CouponsPage));
