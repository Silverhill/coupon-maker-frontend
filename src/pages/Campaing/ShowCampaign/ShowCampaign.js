import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCampaign, huntersCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Typography, Icon, Panel, Card, BasicRow, Cover } from 'coupon-components';
import { maxnum } from 'Utils/filters';

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
                        label= 'Total Coupons'
                        number= {maxnum(cpg.couponsInCampaign)}
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
                                  <Typography.Text bold>Status</Typography.Text>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Typography.Text small>24 Mayo 2018</Typography.Text>
                                </td>
                                <td>
                                <Typography.Text small>Capturado</Typography.Text>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Typography.Text small>24 Enero 2018</Typography.Text>
                                </td>
                                <td>
                                <Typography.Text small>Canjeado</Typography.Text>
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

