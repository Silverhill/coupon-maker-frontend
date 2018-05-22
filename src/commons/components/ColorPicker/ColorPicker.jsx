import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './ColorPicker.css'
import Palette from 'react-palette';

const cx = classNames.bind(styles)

class ColorPicker extends Component {

  state = {
    selected: null,
    current: null
  }

  onMouseLeave = (e, color) => {
    this.toggle(color);
  }

  onMouseOver = (e, color) => {
    this.toggle(color);
  }

  toggle = (color) => {
    if (this.state.current !== color){
      this.setState({
        current: color
      });
      if(this.props.current) this.props.current(color);
    }
  }

  selectColor = (e, color) => {
    const newColor = (color !== this.state.selected) ? color : null;
    this.setState({
      selected: newColor,
    });
    if(this.props.selected) this.props.selected(newColor);
  }

  reset = () => {
    this.setState({
      selected: null,
    });
  }

  render () {
    const {
      values,
      size,
      className,
      withDegrate,
      withPatterns,
      image,
    } = this.props


    const Squares = ({ values }) => (
      <div className={cx(styles.squares)}>
        {
          values && values.map((value, index) => {
            if (value) {
              const defaultOptions = {width:size, height:size, cursor:"pointer"};
              const stylesBackground = withDegrate ? {backgroundImage: "linear-gradient(" + value + ", rgb(10, 5, 7) 85%)"} : {backgroundColor:value};
              const stylesColor = withPatterns ? {backgroundImage: `url(${value})`, backgroundSize: 'contain'} : stylesBackground;
              const stylesSquare = {...defaultOptions, ...stylesColor};
              const currentColor = withDegrate ? "linear-gradient(" + value + ", rgb(10, 5, 7) 85%)" : value;
              return (
                <div
                  key={index}
                  className={cx(styles.square, this.state.selected === value ? styles.squareSelected : '')}
                  style={stylesSquare}
                  onMouseLeave={e => this.onMouseLeave(e, null) }
                  onMouseEnter={e => this.onMouseOver(e, currentColor)}
                  onClick={e => this.selectColor(e, currentColor)}
                />
              )
            }
          })
        }
      </div>
    )

    return (
      <div className={cx(styles.container, className)}>
        {
          image &&
          <Palette image={image}>
            { palette => (
              <Squares
                values={[
                  palette.vibrant,
                  palette.lightVibrant,
                  palette.darkVibrant,
                  palette.muted,
                  palette.lightMuted,
                  palette.darkMute
                ]}
              />
            )}
          </Palette>
        }
        {
          values &&
          <Squares values={values} />
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
