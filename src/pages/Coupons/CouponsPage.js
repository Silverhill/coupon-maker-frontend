import React, { Component } from 'react';
import { withApollo, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { canjear, huntersCompany } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';

import { Typography, Panel, Card, BasicRow } from 'coupon-components';
import styles from './CouponsPage.css';
import RegisterCouponForm from './RegisterCouponForm';
import { maxnum } from 'Utils/filters';

const cx = classNames.bind(styles)


@connect(state => ({
  form: state.form.registerCoupon
}))

class CouponsPage extends Component {

  state = {
    errors: null,
    isOpenRowId: ''
  }

  showDetails = (e, id) => {
    const {isOpenRowId} = this.state;
    if (isOpenRowId === id) {
      id = '';
    }
    this.setState({
      isOpenRowId: id
    })
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
          const {isOpenRowId} = this.state;
          const total = hunters ? hunters.length : 0;
          return (
            <div>
              {total === 0 && anyHunter}
              {total > 0 &&
                hunters && hunters.map((cpg) => {
                  const key = { key: cpg.id };
                  const image = cpg.image || "http://www.drjoydentalclinic.com/wp-content/uploads/2017/03/user.png";
                  const show = isOpenRowId === cpg.id;
                  const classSelected = show ? styles.selected : '';
                  return (
                    <div {...key}>
                      <BasicRow
                        title={cpg.name}
                        image={image}
                        subtitle={cpg.email}
                        label= {cpg.campaign}
                        number= {maxnum(cpg.redeemedCoupons )}
                        onClick={e => this.showDetails(e, cpg.id)}
                        className={cx(styles.row, classSelected)}
                      />
                      {
                        show &&
                        <div className={styles.moreInformation}>
                          <table className={styles.tableDetails}>
                            <thead>
                              <tr>
                                <th>
                                  <Typography.Text bold>Fecha</Typography.Text>
                                </th>
                                <th>
                                  <Typography.Text bold>Campaña</Typography.Text>
                                </th>
                                <th>
                                  <Typography.Text bold>Cupones</Typography.Text>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Typography.Text small>24 Mayo 2018</Typography.Text>
                                </td>
                                <td>
                                <Typography.Text small>Batidos al 2x1</Typography.Text>
                                </td>
                                <td>
                                  <Typography.Text small>1</Typography.Text>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Typography.Text small>24 Enero 2018</Typography.Text>
                                </td>
                                <td>
                                <Typography.Text small>Almuerzos al 2x1</Typography.Text>
                                </td>
                                <td>
                                  <Typography.Text small>1</Typography.Text>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      }
                    </div>
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
            <Panel title="Todos los Hunters" className={styles.hunters}>
            {hunters}
            </Panel>
          </div>
        </Card>
      </div>
    )
  }
}

export default withApollo(injectIntl(CouponsPage));
