import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
//Components
import { Panel, InputBox, InputNested, Select, Typography } from 'coupon-components';
import InputDate from 'Components/InputDate/InputDate'
//Styles
import classNames from 'classnames/bind';
import styles from '../../NewCampaing/NewCampaing.css';
const cx = classNames.bind(styles)

class FirstStep extends Component {
  render() {
    const { intl, offices, campaign, onChangeData, errors } = this.props;
    const officesOptions = offices && offices.map(office => {
      return { key: office.id, id: office.id, value: office.address, name: office.name };
    });

    const errorMessages = (
      <div className={styles.errorMessages}>
        <Typography.Text  small style={{color:"red"}}>
          { errors && errors.validNumberCoupon }
        </Typography.Text>
      </div>
    );

    return (
      <div>
        <Panel title={intl.formatMessage({id: 'campaigns.new.panel.information'})} classNameContainer={styles.panel}>
          <InputBox name="title"
                placeholder={intl.formatMessage({id: 'campaigns.new.title.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.title.label'})}
                className={styles.row_padding}
                value={campaign && campaign.title}
                required="required"/>
          <InputBox name="description"
                placeholder={intl.formatMessage({id: 'campaigns.new.description.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.description.label'})}
                className={styles.row_padding}
                value={campaign && campaign.description}/>
          <InputBox name="customMessage"
                placeholder={intl.formatMessage({id: 'campaigns.new.customMessage.placeholder'})}
                labelText={intl.formatMessage({id: 'campaigns.new.customMessage.label'})}
                className={styles.row_padding}
                value={campaign && campaign.customMessage}/>
        </Panel>
        <Panel classNameHeader={styles.headerWithoutTitle} classNameContainer={styles.panel}>
          <div className={cx(styles.fieldsInline, styles.row_padding)}>
            <Select name="office"
                labelText={intl.formatMessage({id: 'campaigns.new.office.label'})}
                placeholder={intl.formatMessage({id: 'campaigns.new.office.placeholder'})}
                options={officesOptions}
                className={cx(styles.field, styles.left)}
                selectedOption={values => onChangeData(values, 'office')}
                currentOption={campaign && campaign.office}/>
            <div className={cx(styles.couponsNumber, styles.field, styles.right)}>
              <InputBox name="couponsNumber"
                  type="number"
                  placeholder={intl.formatMessage({id: 'campaigns.new.couponsNumber.placeholder'})}
                  labelText={intl.formatMessage({id: 'campaigns.new.couponsNumber.label'})}
                  required="required"
                  value={campaign && campaign.couponsNumber}/>
              { errors && errors.validNumberCoupon ? errorMessages : "" }
            </div>
          </div>
          <InputNested
            labelText={intl.formatMessage({id: 'campaigns.new.duration.label'})}
            description={intl.formatMessage({id: 'campaigns.new.duration.description'})}
            className={cx(styles.row_padding, styles.daterange)}>
            <InputDate name="startAt"
                minDate={moment()}
                dateFormat="LLL"
                showTimeSelect
                timeFormat="HH:mm"
                selected={campaign && campaign.startAt}
                onChange={values => onChangeData(values, 'startAt')}/>
            <InputDate
              name="endAt"
              minDate={moment()}
              dateFormat="LLL"
              showTimeSelect
              timeFormat="HH:mm"
              selected={campaign && campaign.endAt}
              onChange={values => onChangeData(values, 'endAt')}/>
          </InputNested>
        </Panel>
      </div>
    )
  }
}

export default injectIntl(FirstStep);
