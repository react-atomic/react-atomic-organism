import React, {PureComponent} from 'react';

const keys = Object.keys;

class BaseString extends PureComponent {
  state = {};

  resetProps(thisProps, thisState) {
    const {parentWidth, alignCenter, x, y, ...props} = thisProps;
    const {x: stateX, y: stateY} = thisState;
    let thisX = x;
    let thisY = y;
    if (alignCenter) {
      if (stateX) {
        thisX = stateX;
        props.textAnchor = 'middle';
      }
      if (stateY) {
        thisY = stateY;
        props.alignmentBaseline = 'central';
      }
    }
    if (thisX) {
      props.x = thisX;
    }
    if (thisY) {
      props.y = thisY;
    }
    return props;
  }

  getEl() {
    return this.el;
  }

  update(props, prevProps) {
    const {parentWidth: prevParentWidth, parentHeight: prevParentHeight} = prevProps || {};
    const {parentWidth, parentHeight, alignCenter} = props;
    if (alignCenter) {
      const nextState = {};
      if (parentWidth && parentWidth !== prevParentWidth) {
        nextState.x = parentWidth / 2;
      }
      if (parentHeight && parentHeight !== prevParentHeight) {
        nextState.y = parentHeight / 2;
      }
      if (keys(nextState).length) {
        this.setState(nextState);
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.update(this.props, prevProps);
  }

  componentDidMount() {
    this.update(this.props);
  }
}

export default BaseString;
