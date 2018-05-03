import React, { Component } from 'react';
import { withApollo, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { canjear, huntersCompany } from 'Services/graphql/queries.graphql';
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

    const hunters = (
      <Query query={huntersCompany} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const {hunters} = data;
          const total = hunters ? hunters.length : 0;
          return (
            <div>
              {total === 0 && anyHunter}
              {total > 0 &&
                hunters && hunters.map((cpg) => {
                  const key = { key: cpg.id };
                  return (
                    <BasicRow {...key}
                      title={cpg.name}
                      image={cpg.image}
                      subtitle={cpg.email}
                      label= {cpg.campaign}
                      number= {cpg.redeemedCoupons}
                      className={styles.row}
                    />
                  )
                })
              }
            </div>
          );
        }}
      </Query>
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
            {/* <Panel title="Top 5 Hunters">
              {hunters}
            </Panel> */}
          </div>
          <div style={{marginTop: '10px'}}>
            <Panel title="Todos los Hunters">
            {hunters}
            </Panel>
          </div>
        </Card>
      </div>
    )
  }
}

export default withApollo(injectIntl(CouponsPage));
