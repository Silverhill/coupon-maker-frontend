import React, { Component } from 'react';
import { withApollo, Query } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import { canjear, huntersCompany, couponsByHunterInCompany } from 'Services/graphql/queries.graphql';
import { injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import ToastTemplate from 'Components/ToastTemplate/ToastTemplate';
import { toast } from 'react-toastify';

import { Typography, Panel, Card, BasicRow, Icon, Table } from 'coupon-components';
import styles from './CouponsPage.css';
import RegisterCouponForm from './RegisterCouponForm';
import { maxnum } from 'Utils/filters';
import moment from 'moment';
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
      intl
    } = this.props;

    const formatDataTable = (data) => {
      const rows = data && data.map((value) => {
        return(
          {
            updatedAt:  <Typography.Text small>{moment(value.updatedAt).format("DD MMM YYYY")}</Typography.Text>,
            status: <Typography.Text small>{value.status}</Typography.Text>,
            code: <Typography.Text small>{value.code}</Typography.Text>,
            campaign: <NavLink to={`/campaign/${value.campaign.id}`}><Typography.Text small bold>{value.campaign.title}</Typography.Text></NavLink>,
          }
        )
      })
      const tableData = {
        columns: [
          {
            field: 'updatedAt',
            title: <Typography.Text bold>{intl.formatMessage({id: 'coupons.hunter.coupon.date'})}</Typography.Text>
          },
          {
            field: 'campaign',
            title: <Typography.Text bold>{intl.formatMessage({id: 'coupons.hunter.coupon.campaign'})}</Typography.Text>
          },
          {
            field: 'status',
            title: <Typography.Text bold>{intl.formatMessage({id: 'coupons.hunter.coupon.status'})}</Typography.Text>
          },
          {
            field: 'code',
            title: <Typography.Text bold>{intl.formatMessage({id: 'coupons.hunter.coupon.code'})}</Typography.Text>
          },
        ],
        rows: rows
      }
      return tableData;
    }

    const emptyState = (
      <div className={styles.emptyState}>
        <div className={styles.illustration}>
          <div className={styles.circle}>
            <Icon
              name="MdDirectionsRun"
              color={palette.darkNeutral}
              size={50}
              style={
                {
                  margin: 20,
                  padding: 30,
                }
              }
            />
            <div className={styles.coupons}>
              <Icon
                  name="CpTicket"
                  color={palette.silverColor}
                  size={10}
              />
              <Icon
                  name="CpTicket"
                  color={palette.brightBlue}
                  size={12}
              />
              <Icon
                  name="CpTicket"
                  color={palette.pinkRed}
                  size={15}
              />
            </div>
          </div>
        </div>
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
                hunters && hunters.map((hunter) => {
                  const key = { key: hunter.id };
                  const image = hunter.image || "http://www.drjoydentalclinic.com/wp-content/uploads/2017/03/user.png";
                  const show = isOpenRowId === hunter.id;
                  const classSelected = show ? styles.selected : '';
                  const totalCoupons = hunter.huntedCoupons + hunter.redeemedCoupons;
                  return (
                    <div {...key}>
                      <BasicRow
                        title={hunter.name}
                        image={image}
                        subtitle={hunter.email}
                        label={intl.formatMessage({id: 'coupons.hunter.totalCoupons'})}
                        number= {maxnum(totalCoupons)}
                        onClick={e => this.showDetails(e, hunter.id)}
                        className={cx(styles.row, classSelected)}
                      />
                      {
                        show &&
                        <Query
                          query={couponsByHunterInCompany}
                          variables={{hunterId: hunter.id}}>
                          {({ loading, error, data}) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            const { couponsByHunter } = data;
                            const tableData = formatDataTable(couponsByHunter);
                            return (
                              <Table columns={tableData.columns} rows = {tableData.rows} />
                            );
                          }}
                        </Query>
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
