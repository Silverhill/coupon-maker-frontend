import React, { Component } from 'react';
import { Panel } from 'coupon-components';

import styles from '../../Office/NewOffice.css';

class FirstStep extends Component {
  render() {
    return (
      <div>
        <Panel title="Información Básica" classNameContainer={styles.panel}>

        </Panel>
      </div>
    )
  }
}

export default FirstStep;