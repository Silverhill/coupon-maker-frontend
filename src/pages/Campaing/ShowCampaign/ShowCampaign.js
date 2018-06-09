import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCampaign, huntersCampaign, couponsByHunterInCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { Typography, Icon, Panel, Card, BasicRow, Table } from 'coupon-components';
import PanelCampaign from 'Components/PanelCampaign/PanelCampaign';
import { maxnum } from 'Utils/filters';
import EmptyState from 'Components/EmptyState/EmptyState';
import moment from 'moment';

// images
import planting from 'Assets/images/planting.svg';
import waterPlant from 'Assets/images/waterPlant.svg';
import plant from 'Assets/images/plant.svg';
import leaves from 'Assets/images/leaves.svg';
import mushroom from 'Assets/images/mushroom.svg';
import fruitTree from 'Assets/images/fruitTree.svg';

import styles from './ShowCampaign.css';

const cx = classNames.bind(styles)

class ShowCampaing extends Component {
  state = {
    errors: null,
    isOpenRowId: '',
    showOption: 'hunters'
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

  showOption = (e, key) => {
    const {showOption} = this.state;
    if (showOption !== key) {
      this.setState({
        showOption: key
      })
    }
  }

  render() {
    const { intl } = this.props;
    const { isOpenRowId, showOption } = this.state;

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
        <EmptyState
          name='notFoundCampaign'
          lowColor="#e4eefc"
          mediumColor="#3f92fe"
          highColor="#0169e5"
        />
        <Typography.Text bold style={{padding:"10px 0", fontSize:'18px'}}>
          No hemos encontrado la campaña que estas buscando
        </Typography.Text>
        <Typography.Text small style={{padding:"10px"}}>
          Aqui solo hay un conejo
        </Typography.Text>
      </div>
    )
    const AnalitycsIllustration = ({campaign}) => {
      const percentage = Math.round(( campaign.redeemedCoupons + (campaign.huntedCoupons * 0.5) ) * 100 / campaign.totalCoupons);
      const slider = {
        planting: percentage >=0,
        waterPlant: percentage >=20,
        plant: percentage >=40,
        leaves: percentage >=60,
        mushroom: percentage >=80,
        fruitTree: percentage === 100
      }
      const styleColor = {filter: 'grayscale(0%)'};

      return (
        <div className={styles.analitycsContainer}>
          <div className={styles.analitycsText}>
            <Typography.Text small>
              Cupones Capturados: {campaign.huntedCoupons}
            </Typography.Text>
            <Typography.Text small bold>
              Aceptación del: {percentage} %
            </Typography.Text>
            <Typography.Text small>
              Cupones Canjeados: {campaign.redeemedCoupons}
            </Typography.Text>
          </div>
          <div className={styles.progress}>
            <div className={styles.images}>
              <div className={styles.imageWithTitle}>
                <img alt='' src={planting} width="10px" style={slider.planting ? styleColor : {}} />
                <span>0%</span>
              </div>
              <div className={styles.imageWithTitle}>
                <img alt='' src={waterPlant} width="20px" style={slider.waterPlant ? styleColor : {}} />
                <span>20%</span>
              </div>
              <div className={styles.imageWithTitle}>
                <img alt='' src={plant} width="25px" style={slider.plant ? styleColor : {}} />
                <span>40%</span>
              </div>
              <div className={styles.imageWithTitle}>
                <img alt='' src={leaves} width="30px" style={slider.leaves ? styleColor : {}} />
                <span>60%</span>
              </div>
              <div className={styles.imageWithTitle}>
                <img alt='' src={mushroom} width="50px" style={slider.mushroom ? styleColor : {}} />
                <span>80%</span>
              </div>
              <div className={styles.imageWithTitle}>
                <img alt='' src={fruitTree} width="70px" style={slider.fruitTree ? styleColor : {}} />
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const ProgressCampaign = ({campaign}) => (
      <div className={styles.progressCampaign}>
        <div className={styles.headerOptions}>
          <Typography.Text bold>
            Desarrollo de Campaña
          </Typography.Text>
          <div className={styles.options}>
            <div className={cx(styles.option, showOption === 'grown' ? styles.selectedOption : '')}
                 onClick={e => this.showOption(e, 'grown')}>
              <Icon
                name="FaAreaChart"
                size={15}
              />
              <Typography.Text bold style={{marginTop:"5px", fontSize:'10px'}}>
                Alcance
              </Typography.Text>
            </div>
            <div className={cx(styles.option, showOption === 'hunters' ? styles.selectedOption : '')}
                 onClick={e => this.showOption(e, 'hunters')}>
              <Icon
                name="FaMale"
                size={15}
              />
              <Typography.Text bold style={{marginTop:"5px", fontSize:'10px'}}>
                Hunters
              </Typography.Text>
            </div>
          </div>
        </div>
        {
          showOption === 'grown' &&
          <Panel
            title="Alcance"
            className={styles.progressPanel}>
            <AnalitycsIllustration campaign={campaign}/>
          </Panel>
        }
        {
          showOption === 'hunters' &&
          <Panel
            title={intl.formatMessage({id: 'campaigns.show.panel.title'})}
            className={styles.hunters}>
              {hunters}
          </Panel>
        }
      </div>
    );

    const viewCampaign = (
      <Query query={getCampaign} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return notFound;
          const {campaign} = data;
          return (
            <div className={styles.view}>
              <PanelCampaign campaign={campaign}/>
              <ProgressCampaign campaign={campaign}/>
            </div>
          );
        }}
      </Query>
    )
    return (
      <div className={styles.container}>
        <Card title={intl.formatMessage({id: 'campaigns.show.card.title'})} classNameContent={styles.mainCard}>
          {viewCampaign}
        </Card>
      </div>
    )
  }
}

export default injectIntl(ShowCampaing);

