import React, { Component } from 'react';
import { withApollo, Query } from 'react-apollo';
import { canjear, huntersCompany } from 'Services/graphql/queries.graphql';
import { injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';
import EmptyState from 'Components/EmptyState/EmptyState';

import { Typography, Panel, Card, BasicRow, Icon } from 'coupon-components';
import styles from './CouponsPage.css';
import RegisterCouponForm from './RegisterCouponForm';
import { maxnum } from 'Utils/filters';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles)

class CouponsPage extends Component {

  state = {
    isOpenRowId: ''
  }

  showSuccessNotification = () => {
    toast(
      <ToastTemplate
        title={<FormattedMessage id='coupons.toasts.success.redeem.title' />}
        subtitle={<FormattedMessage id='coupons.toasts.success.redeem.subtitle' />}
        status='success'
      />
    )
  }

  showErrorNotification = (resp) => {
    const errors = resp || {};
    errors.graphQLErrors && errors.graphQLErrors.map((value)=>{
      return (
        toast(
          <ToastTemplate
            title={<FormattedMessage id='coupons.toasts.error.redeem.title' />}
            subtitle={value.message}
            status='error'
          />
        )
      )
    })
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

  registerCoupon = async (code) => {
    const { client: { mutate } } = this.props;
    try {
      await mutate({
        mutation: canjear,
        variables: {
          code: code
        }
      })
      this.showSuccessNotification();
    } catch (err) {
      this.showErrorNotification(err);
      return;
    }
  }

  render() {
    const {
      intl,
    } = this.props;

    const emptyState = (
      <div className={styles.emptyState}>
        <EmptyState
          name='hunter'
          lowColor="#e4eefc"
          mediumColor="#3f92fe"
          highColor="#0169e5"
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          {intl.formatMessage({id: 'coupons.AllHunters.empty.title'})}
        </Typography.Text>
        <Typography.Text small>
          {intl.formatMessage({id: 'coupons.AllHunters.empty.description'})}
        </Typography.Text>
        <Typography.Text small>
          {intl.formatMessage({id: 'coupons.AllHunters.empty.tip'})}
        </Typography.Text>
      </div>
    )

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
              {total === 0 && emptyState}
              {total > 0 &&
                hunters && hunters.map((cpg) => {
                  const key = { key: cpg.id };
                  const image = cpg.image;
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

    return (
      <div className={styles.container}>
        <Card title={intl.formatMessage({id: 'coupons.title'})}>
          <div className={styles.register}>
            <RegisterCouponForm onSubmit={this.registerCoupon}/>
          </div>
          <div style={{marginTop: '10px'}}>
            {/* <Panel title="Top 5 Hunters">
              {hunters}
            </Panel> */}
          </div>
          <div style={{marginTop: '10px'}}>
            <Panel
              title={intl.formatMessage({id: 'coupons.AllHunters.panel.title'})}
              className={styles.hunters}>
              {hunters}
            </Panel>
          </div>
        </Card>
      </div>
    )
  }
}

export default withApollo(injectIntl(CouponsPage));
