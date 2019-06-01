import React from 'react';
import {Circle} from 'organism-react-graph';
import BaseLayout from '../molecules/BaseLayout';

class ConnectPointDefaultLayout extends BaseLayout {
  getEl() {
    if (this.el) {
      return this.el;
    }
  }

  handleEl = el => {
    const {onGetEl} = this.props;
    if (el) {
      onGetEl(el);
      this.el = el;
    }
  };

  render() {
    const {style, onGetEl, ...props} = this.props;
    const isShow = props['data-is-show'];
    let thisStyle = {...Styles.container, ...style};
    if (isShow) {
      thisStyle = {...thisStyle, ...Styles.visible};
    }

    return (
      <Circle
        style={thisStyle}
        fill="#3c5d9b"
        fillOpacity="0.4"
        r="5"
        {...props}
        refCb={this.handleEl}
      />
    );
  }
}

export default ConnectPointDefaultLayout;

const Styles = {
  container: {
    visibility: 'hidden',
    cursor: 'alias',
  },
  visible: {
    visibility: 'visible',
  },
};
