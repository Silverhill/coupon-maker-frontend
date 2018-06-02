import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Multiselect.css'
import { Typography } from 'coupon-components';

const cx = classNames.bind(styles)

class Multiselect extends Component {

  state = {
    itemsSelected: []
  }

  componentWillMount() {
    const { defaultSelectedOptions } = this.props;
    if(defaultSelectedOptions) this.setState({ itemsSelected: defaultSelectedOptions });
  }

  selectOption = (e, option) => {
    const {
      itemsSelected,
    } = this.state

    const {
      selectedOptions,
    } = this.props

    const isInclude = itemsSelected.includes(option);
    let items = [];

    if (!isInclude) {
      items = [...itemsSelected, option];
    } else {
      const index = itemsSelected.indexOf(option);
      items = [
        ...itemsSelected.slice(0, index),
        ...itemsSelected.slice(index + 1),
      ];
    }
    this.setState({
      itemsSelected: items
    });

    if (selectedOptions) selectedOptions(items);
  }

  render () {
    const {
      values,
      size,
      className,
      defaultSelectedOptions,
    } = this.props

    const {
      itemsSelected,
    } = this.state

    const Squares = ({ values }) => (
      <div className={cx(styles.squares)}>
        {
          values && values.map((option, index) => {
            if (option) {
              const defaultOptions = {width:size, height:size, cursor:"pointer"};
              const stylesSquare = defaultOptions;
              const isSelected = itemsSelected.includes(option) || defaultSelectedOptions && defaultSelectedOptions.includes(option);
              return (
                <div key={index} className={cx(styles.option)}>
                <div
                  key={index}
                  className={cx(styles.square, isSelected ? styles.squareSelected : '')}
                  style={stylesSquare}
                  onClick={e => this.selectOption(e, option)}
                >
                  <div className={styles.status}>
                    {option.icon}
                  </div>
                  <Typography.Text >{option.title}</Typography.Text>
                </div>
                <Typography.Text small style={{marginTop:'5px'}}>{option.subtitle}</Typography.Text>
                </div>

              )
            }
          })
        }
      </div>
    )

    return (
      <div className={cx(styles.container, className)}>
        {
          values &&
          <Squares values={values} />
        }
      </div>
    )
  }
}

Multiselect.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  selectedOptions: PropTypes.func,
  defaultSelectedOptions: PropTypes.array,
}

export default Multiselect;
