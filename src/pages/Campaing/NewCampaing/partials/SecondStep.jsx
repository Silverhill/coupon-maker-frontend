import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
// Components
import { Panel, Select, Typography } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';
//values
import Multiselect from 'Components/Multiselect/Multiselect';
import * as constants from 'Utils/values';
import * as illustrations from 'Utils/illustrations';
const cx = classNames.bind(styles);

class SecondStep extends Component {

  getValuesToAgeRange(){
    const { intl } = this.props;
    const agesRanges = constants.agesRanges.map((item) => {
      let rangeField = intl.formatMessage({id: `common.agesRanges.${item.key}`});
      let rangeDescription = item.min+' - '+item.max+' '+intl.formatMessage({id: 'common.agesRanges.years'});
      item.title = rangeField;
      item.subtitle = rangeDescription;
      item.icon = illustrations.faces[item.key];
      return item;
    });
    return agesRanges;
  }

  render() {
    const { intl, onChangeData } = this.props;
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
              <Select name="country"
                    labelText={intl.formatMessage({id: 'campaigns.new.place.country.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.country.placeholder'})}
                    options={constants.countries}
                    className={cx(styles.field, styles.left )}
                    selectedOption={values => onChangeData(values, 'country')}/>
              <Select name="city"
                    labelText={intl.formatMessage({id: 'campaigns.new.place.city.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.city.placeholder'})}
                    options={constants.cities}
                    className={cx(styles.field, styles.right)}
                    selectedOption={values => onChangeData(values, 'city')}/>
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
            <div className={cx(styles.row_padding)}>
              <Multiselect values={agesRanges} />
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}

export default injectIntl(SecondStep);
