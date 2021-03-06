import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import styles from './InputDate.css';
import 'react-datepicker/dist/react-datepicker.css';
const cx = classNames.bind(styles);

class InputDate extends Component {
  state = {
    startDate: null
  }

  componentWillMount() {
    const { date } = this.props;
    let currentDate = date ? date : moment();
    this.handleChange(currentDate);
  }

  handleChange = (moment) => {
    let { dateUpdated, reduxFormInput } = this.props;
    let date = moment.valueOf();

    //callback of the parent Component
    if (dateUpdated && !reduxFormInput) dateUpdated(date);

    //callback of reduxForm
    if (reduxFormInput && !dateUpdated){
      let {input:{onChange, onBlur}} = this.props;
      onChange(date);
      onBlur(date);
    }

    this.setState({ startDate: moment });
  }


  render () {
    const { className, ...rest } = this.props;
    const { startDate } = this.state;
    return (
      <div className={cx(className, styles.container)}>
        <DatePicker
            selected={startDate}
            onChange={this.handleChange}
            {...rest}/>
      </div>
    )
  }
}

InputDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number,
  dateUpdated: PropTypes.func
}

export default InputDate
