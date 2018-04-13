import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getCampaign } from 'Services/graphql/queries.graphql';
import { injectIntl } from 'react-intl';

import { Typography, Icon } from 'coupon-components';

import styles from './ShowCampaign.css';
import * as palette from 'Styles/palette.css';

class ShowCampaing extends Component {
  render() {
    const { data: {campaign, error} } = this.props;
    console.log(campaign);
    const notFound = (
      <div className={styles.notFound}>
        <h1>404</h1>
        <Icon
          name="FaBullhorn"
          color={palette.baseGrayMedium}
          size={50}
          style={
            {
              margin: 20,
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
      <h2>Show Details Campaign Page</h2>
    )
    return (
      <div className={styles.container}>
        {error ? notFound : viewCampaign}
      </div>
    )
  }
}

export default graphql(getCampaign, {options: (props) => ({
  variables: {
    id: props.match.params.id
  }
}),})(ShowCampaing);

