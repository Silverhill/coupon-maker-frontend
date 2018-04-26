import React, { Component } from 'react';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
//Components
import { Panel, InputBox, InputNested, Select } from 'coupon-components';
import InputDate from 'Components/InputDate/InputDate'
//Styles
import classNames from 'classnames/bind';
import styles from '../../NewCampaing/NewCampaing.css';
const cx = classNames.bind(styles)

class FirstStep extends Component {
  render() {
    const { intl, offices } = this.props;
    const officesOptions = offices && offices.map(office => {
      return { key: office.id, id: office.id, value: office.address, name: office.name };
    });

    return (
      <div>
        <Panel title={intl.formatMessage({id: 'campaigns.new.panel.information'})} classNameContainer={styles.panel}>
          <Field name="title"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'campaigns.new.title.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.title.label'})}
                className={styles.row_padding}/>
          <Field name="customMessage"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'campaigns.new.customMessage.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.customMessage.label'})}
                className={styles.row_padding}/>
          <Field name="office"
                reduxFormInput
                component={Select}
                labelText={intl.formatMessage({id: 'campaigns.new.office.label'})}
                placeholder={intl.formatMessage({id: 'campaigns.new.office.placeholder'})}
                options={officesOptions}
                className={styles.selectItem}/>
        </Panel>
        <Panel classNameHeader={styles.headerWithoutTitle} classNameContainer={styles.panel}>
          <Field name="description"
                reduxFormInput
                component={InputBox}
                placeholder={intl.formatMessage({id: 'campaigns.new.description.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.description.label'})}
                className={styles.row_padding}/>
          <InputNested
            labelText={intl.formatMessage({id: 'campaigns.new.duration.label'})}
            description={intl.formatMessage({id: 'campaigns.new.duration.description'})}
            className={cx(styles.row_padding, styles.daterange)}>
            <Field name="startAt"
                reduxFormInput
                component={InputDate}/>
            <Field
              name="endAt"
              reduxFormInput
              component={InputDate}/>
          </InputNested>
          <Field name="couponsNumber"
                reduxFormInput
                component={InputBox}
                type="number"
                placeholder={intl.formatMessage({id: 'campaigns.new.couponsNumber.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.couponsNumber.label'})}
                className={styles.row_padding}/>
        </Panel>
      </div>
    )
  }
}

export default injectIntl(FirstStep);
