import React from 'react';
import {Circle} from 'organism-react-graph';
import BaseBoxComponent from '../organisms/BaseBoxComponent';

class ConnectPointDefaultLayout extends BaseBoxComponent {
  getEl() {
    return this.el;
  }
  render() {
    const {isShow, style, ...props} = this.props;
    let thisStyle = {...Styles.container, ...style};
    if (isShow) {
      thisStyle = {...Styles.visible};
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
  },
  visible: {
    visibility: 'visible',
  },
};
