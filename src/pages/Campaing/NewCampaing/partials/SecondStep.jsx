import React, { Component } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
// Components
import { Panel, Select, Typography } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';
//values
import * as constants from 'Utils/values';

const cx = classNames.bind(styles);

class SecondStep extends Component {

  getValuesToAgeRange(){
    const { intl } = this.props;
    const agesRanges = constants.agesRanges.map((item) => {
      let rangeField = intl.formatMessage({id: `common.agesRanges.${item.key}`});
      let rangeDescription = ' ('+item.min+' - '+item.max+' '+intl.formatMessage({id: 'common.agesRanges.years'})+')';
      item.value = rangeField + rangeDescription;
      return item;
    });
    return agesRanges;
  }

  render() {
    const { intl } = this.props;
    const agesRanges = this.getValuesToAgeRange();

    return (
      <div>
        <Panel title="Público" classNameContainer={styles.panel}>
          <div className={styles.rowsContainer}>
            <div className={cx(styles.row, styles.row_padding)}>
              <div className={styles.fieldColumn}>
                <Typography.Text bold>
                  {intl.formatMessage({id: 'campaigns.new.place.title'})}
                </Typography.Text>
                <Typography.Label light className={styles.descriptionField}>
                  {intl.formatMessage({id: 'campaigns.new.place.description'})}
                </Typography.Label>
              </div>
            </div>
            <div className={cx(styles.fieldsInline, styles.row_padding)}>
              <Field name="country"
                    reduxFormInput
                    component={Select}
                    labelText={intl.formatMessage({id: 'campaigns.new.place.country.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.country.placeholder'})}
                    options={constants.countries}
                    className={cx(styles.field, styles.left )}/>
              <Field name="city"
                    reduxFormInput
                    component={Select}
                    labelText={intl.formatMessage({id: 'campaigns.new.place.city.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.city.placeholder'})}
                    options={constants.cities}
                    className={cx(styles.field, styles.right)}/>
            </div>
            <div className={cx(styles.row, styles.row_padding)}>
              <div className={styles.fieldColumn}>
                <Typography.Text bold>
                  {intl.formatMessage({id: 'campaigns.new.ageRange.title'})}
                </Typography.Text>
                <Typography.Label light className={styles.descriptionField}>
                  {intl.formatMessage({id: 'campaigns.new.ageRange.description'})}
                </Typography.Label>
              </div>
            </div>
            <div className={cx(styles.fieldsInline, styles.row_padding, styles.field, styles.left)}>
              <Field name="ageRange"
                    reduxFormInput
                    component={Select}
                    options={agesRanges}
                    placeholder={intl.formatMessage({id: 'campaigns.new.ageRange.placeholder'})}
                    className={cx(styles.field, styles.left )}/>
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}

export default injectIntl(SecondStep);
