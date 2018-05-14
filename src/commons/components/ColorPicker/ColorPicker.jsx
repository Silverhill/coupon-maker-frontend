import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './ColorPicker.css'

const cx = classNames.bind(styles)

class ColorPicker extends Component {

  state = {
    selected: null,
    current: null
  }

  onMouseOut = (e, color) => {
    this.toggle(color);
  }

  onMouseOver = (e, color) => {
    this.toggle(color);
  }

  toggle = (color) => {
    this.setState(prevState => ({
      current: color,
    }));
    if(this.props.currentColor) this.props.currentColor(color);
  }

  selectColor = (e, color) => {
    this.setState({
      selected: color,
    });
    if(this.props.selectedColor) this.props.selectedColor(color);
  }

  render () {
    const {
      colors,
      size,
      className,
      withDegrate,
      withPatterns,
    } = this.props

    return (
      <div className={cx(styles.container, className)}>
        {
          colors && colors.map((value, index) => {
            if (value) {
              const defaultOptions = {width:size, height:size, cursor:"pointer"};
              const stylesBackground = withDegrate ? {backgroundImage: "linear-gradient(" + value + ", rgb(10, 5, 7) 85%)"} : {backgroundColor:value};
              const stylesColor = withPatterns ? {backgroundImage: `url(${value})`, backgroundSize: 'contain'} : stylesBackground;
              const stylesSquare = {...defaultOptions, ...stylesColor};
              const currentColor = withDegrate ? "linear-gradient(" + value + ", rgb(10, 5, 7) 85%)" : value;
              return (
                <div
                  key={index}
                  className={styles.square}
                  style={stylesSquare}
                  onMouseOut={e => this.onMouseOut(e, "") }
                  onMouseOver={e => this.onMouseOver(e, currentColor)}
                  onClick={e => this.selectColor(e, currentColor)}
                >
                {this.state.selected === value ? '✔' : ''}
                </div>
              )
            }
          })
        }
      </div>
    )
  }
}

ColorPicker.propTypes = {
  colors: PropTypes.array,
  size: PropTypes.string,
  className: PropTypes.string,
}

export default ColorPicker;
