import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Multiselect.css'
import Palette from 'react-palette';
import { Typography, Icon } from 'coupon-components';
import * as palette from 'Styles/palette.css';

const cx = classNames.bind(styles)

class Multiselect extends Component {

  state = {
    itemsSelected: []
  }

  selectOption = (e, key) => {
    const {
      itemsSelected,
    } = this.state

    const isInclude = itemsSelected.includes(key);
    let items = [];

    if (!isInclude) {
      items = [...itemsSelected, key];
    } else {
      const index = itemsSelected.indexOf(key);
      items = [
        ...itemsSelected.slice(0, index),
        ...itemsSelected.slice(index + 1),
      ];
    }
    this.setState({
      itemsSelected: items
    });
    console.log(itemsSelected);

  }

  render () {
    const {
      values,
      size,
      className,
    } = this.props

    const {
      itemsSelected,
    } = this.state

    // console.log(values);

    const Squares = ({ values }) => (
      <div className={cx(styles.squares)}>
        {
          values && values.map((option, index) => {
            if (option) {
              const defaultOptions = {width:size, height:size, cursor:"pointer"};
              const stylesSquare = defaultOptions;
              const isSelected = itemsSelected.includes(option.key);
              let selectColor = isSelected ? palette.whiteColor : palette.darkColor;
              let selectIcon = isSelected ? 'FaCheckCircle' : 'FaCircleThin';
              return (
                <div key={index} className={cx(styles.option)}>
                <div
                  key={index}
                  className={cx(styles.square, isSelected ? styles.squareSelected : '')}
                  style={stylesSquare}
                  onClick={e => this.selectOption(e, option.key)}
                >
                  <div className={styles.status}>
                    {/* <Icon name="male" size={40} color={selectColor}/> */}
                    {option.icon}
                  </div>
                  <Typography.Text >{option.title}</Typography.Text>
                  {/* <Typography.Text small >{option.subtitle}</Typography.Text> */}
                </div>
                <Typography.Text small >{option.subtitle}</Typography.Text>
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
  colors: PropTypes.array,
  size: PropTypes.string,
  className: PropTypes.string,
}

export default Multiselect;
