import React, { Component } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import { injectIntl } from 'react-intl';
// Components
import { Panel, Select, InputBox, Typography } from 'coupon-components';
import styles from '../../NewCampaing/NewCampaing.css';
const cx = classNames.bind(styles);

class SecondStep extends Component {
  render() {
    const { intl } = this.props;
    const countries = [
      {key:'ec', value:'Ecuador'}
    ];
    const cities = [
      {key:'loh', value:'Loja'}
    ];

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
            <div className={cx(styles.row, styles.row_padding)}>
              <Field name="country"
                    reduxFormInput
                    component={Select}
                    labelText={intl.formatMessage({id: 'campaigns.new.place.country.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.country.placeholder'})}
                    options={countries}
                    className={styles.selectItem}/>
              <Field name="city"
                    reduxFormInput
                    component={Select}
                    labelText={intl.formatMessage({id: 'campaigns.new.place.city.label'})}
                    placeholder={intl.formatMessage({id: 'campaigns.new.place.city.placeholder'})}
                    options={cities}
                    className={styles.selectItem}/>
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
            <div className={cx(styles.row, styles.row_padding)}>
              <Field name="initialAgeRange"
                      reduxFormInput
                      component={InputBox}
                      type="number"
                      labelText={intl.formatMessage({id: 'campaigns.new.ageRange.initial.label'})}
                      placeholder={intl.formatMessage({id: 'campaigns.new.ageRange.initial.placeholder'})}
                      className={styles.selectItem}/>
              <Field name="finalAgeRange"
                      reduxFormInput
                      component={InputBox}
                      type="number"
                      labelText={intl.formatMessage({id: 'campaigns.new.ageRange.final.label'})}
                      placeholder={intl.formatMessage({id: 'campaigns.new.ageRange.final.placeholder'})}
                      className={styles.selectItem}/>
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}

export default injectIntl(SecondStep);
