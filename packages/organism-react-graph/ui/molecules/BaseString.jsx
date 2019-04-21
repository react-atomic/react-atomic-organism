import React, {PureComponent} from 'react';
import get from 'get-object-value';

class BaseString extends PureComponent {
  state = {};

  resetProps(thisProps, thisState) {
    const {parentWidth, alignCenter, x, y, ...props} = thisProps;
    let {x: stateX, y: stateY} = thisState;
    let thisX = x;
    let thisY = y;
    if (alignCenter) {
      thisX = stateX;
    }
    if (thisX) {
      props.x = thisX;
    }
    if (thisY) {
      props.y = thisY;
    }
    return props;
  }

  update(props, prevProps) {
    prevProps = get(prevProps, null, {});
    const el = this.el;
    const {parentWidth, alignCenter} = props;
    if (alignCenter && parentWidth !== prevProps.parentWidth) {
      const {width} = el.getBBox();
      const x = (parentWidth - width) / 2;
      this.setState({x});
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
