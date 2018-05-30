import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCampaign, huntersCampaign, couponsByHunterInCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Typography, Icon, Panel, Card, BasicRow, Cover, Table } from 'coupon-components';
import { maxnum } from 'Utils/filters';
import moment from 'moment';

import styles from './ShowCampaign.css';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles)

class ShowCampaing extends Component {
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

  render() {
    const { intl } = this.props;

    const formatDataTable = (data) => {
      const rows = data && data.map((value) => {
        return(
          {
            updatedAt:  <Typography.Text small>{moment(value.updatedAt).format("DD MMM YYYY")}</Typography.Text>,
            status: <Typography.Text small>{value.status}</Typography.Text>,
            code: <Typography.Text small>{value.code}</Typography.Text>,
          }
        )
      })
      const tableData = {
        columns: [
          {
            field: 'updatedAt',
            title: <Typography.Text bold>{intl.formatMessage({id: 'campaigns.show.hunter.coupon.date'})}</Typography.Text>
          },
          {
            field: 'status',
            title: <Typography.Text bold>{intl.formatMessage({id: 'campaigns.show.hunter.coupon.status'})}</Typography.Text>
          },
          {
            field: 'code',
            title: <Typography.Text bold>{intl.formatMessage({id: 'campaigns.show.hunter.coupon.code'})}</Typography.Text>
          },
        ],
        rows: rows
      }
      return tableData;
    }

    const anyHunter = (
      <div className={styles.notFound}>
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          Aun nadie a tomado esta promoción
        </Typography.Text>
      </div>
    )

    const hunters = (
      <Query query={huntersCampaign} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const {isOpenRowId} = this.state;
          const {hunters} = data;
          const total = hunters ? hunters.length : 0;
          return (
            <div>
              {total === 0 && anyHunter}
              {total > 0 &&
                hunters && hunters.map((hunter) => {
                  const key = { key: hunter.id };
                  const image = hunter.image || "http://www.drjoydentalclinic.com/wp-content/uploads/2017/03/user.png";
                  const show = isOpenRowId === hunter.id;
                  const classSelected = show ? styles.selected : '';
                  return (
                    <div {...key}>
                      <BasicRow
                        title={hunter.name}
                        image={image}
                        subtitle={hunter.email}
                        label={intl.formatMessage({id: 'campaigns.show.hunter.totalCoupons'})}
                        number= {maxnum(hunter.couponsInCampaign)}
                        onClick={e => this.showDetails(e, hunter.id)}
                        className={cx(styles.row, classSelected)}
                      />
                      {
                        show &&
                        <Query
                          query={couponsByHunterInCampaign}
                          variables={{campaignId: this.props.match.params.id, hunterId: hunter.id}}>
                          {({ loading, error, data}) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            const { coupons } = data;
                            const tableData = formatDataTable(coupons);
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

    const notFound = (
      <div className={styles.notFound}>
        <Typography.Text bold style={{fontSize:'40px'}}>
          404
        </Typography.Text>
        <Icon
          name="FaBullhorn"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 10,
              padding: 30,
              background: palette.baseGrayLow,
              borderRadius: '50%'
            }
          }
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'20px'}}>
          No hemos encontrado la campaña que estas buscando
        </Typography.Text>
      </div>
    )
    const viewCampaign = (
      <Query query={getCampaign} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return notFound;
          const {campaign} = data;
          const placeholderImage = 'https://www.ocf.berkeley.edu/~sather/wp-content/uploads/2018/01/food--1200x600.jpg';
          const imageCover = (campaign && campaign.image) || placeholderImage
          const stylesStatus = campaign && campaign.status === "expired" ?
                            {color: palette.dark, backgroundColor: palette.baseGrayMedium} :
                            {color: palette.whiteColor, backgroundColor: palette.primaryColor};
          return (
            <div className={styles.view}>
              <div className={styles.header}>
                <Cover
                  status={campaign && campaign.status}
                  image={imageCover}
                  leftLabel={intl.formatMessage({id: 'campaigns.show.labels.office'})}
                  leftText= {campaign.office.address}
                  rightLabel={intl.formatMessage({id: 'campaigns.show.labels.available'})}
                  rightText={maxnum(campaign.totalCoupons)}
                  stylesStatus={stylesStatus}
                />
              </div>
              <div className={styles.panelInformation}>
                <div className={styles.left}>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.title'})}
                  </Typography.Label>
                  <Typography.Text>
                    {campaign && campaign.title}
                  </Typography.Text>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.description'})}
                  </Typography.Label>
                  <Typography.Text small>
                    {campaign && campaign.description}
                  </Typography.Text>
                </div>
                <div className={styles.right}>
                  <Typography.Label small bold>
                    {intl.formatMessage({id: 'campaigns.show.labels.segmentation'})}
                  </Typography.Label>
                  <div className={styles.icons}>
                    <Icon
                      name="FaMale"
                      color={palette.baseGray}
                      size={25}
                    />
                    <Icon
                      name="FaFemale"
                      color={palette.baseGray}
                      size={25}
                    />
                  </div>
                  <Typography.Text small>
                    {campaign && campaign.initialAgeRange} - {campaign && campaign.finalAgeRange} años
                  </Typography.Text>
                </div>
              </div>
              <Panel
                title={intl.formatMessage({id: 'campaigns.show.panel.title'})}
                className={styles.hunters}>
                  {hunters}
              </Panel>
            </div>
          );
        }}
      </Query>
    )
    return (
      <div className={styles.container}>
        <Card title={intl.formatMessage({id: 'campaigns.show.card.title'})}>
          {viewCampaign}
        </Card>
      </div>
    )
  }
}

export default injectIntl(ShowCampaing);

