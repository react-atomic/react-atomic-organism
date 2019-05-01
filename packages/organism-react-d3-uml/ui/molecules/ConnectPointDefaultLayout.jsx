import React from 'react';
import {Circle} from 'organism-react-graph';
import BaseLayout from '../molecules/BaseLayout';

class ConnectPointDefaultLayout extends BaseLayout {
  getEl() {
    if (this.el) {
      return this.el;
    }
  }
  render() {
    const {isShow, style, ...props} = this.props;
    let thisStyle = {...Styles.container, ...style};
    if (isShow) {
      thisStyle = {...thisStyle, ...Styles.visible};
    }
    return (
      <Circle 
      {...props}
      refCb={el => this.el = el}
      style={thisStyle}
      fill="#3c5d9b" 
      fillOpacity="0.4"
      r="5" />
    );
  }
}

export default ConnectPointDefaultLayout;

const Styles = {
  container: {
    visibility: 'hidden',
    cursor: 'move',
  },
  visible: {
    visibility: 'visible',
  },
};
