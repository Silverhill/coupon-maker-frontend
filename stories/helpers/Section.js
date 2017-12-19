import React, { Component } from 'react'
import styles from './styles.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class Section extends Component {
  render () {
    const ComponentMargin = React.Children.toArray(this.props.children)
      .map((child, i) => {
        if (React.isValidElement(child)) {
          const ChildrenComponent = child.type
          return (
            <div style={{marginBottom: 10}}>
              <ChildrenComponent key={`section-${i}`} {...child.props} />
            </div>
          )
        }
      })

    const customStyles = {
      dark: this.props.dark
    }

    return (
      <div className={cx(styles.section, customStyles)} style={this.props.style}>
        {ComponentMargin}
      </div>
    )
  }
}

export default Section;
