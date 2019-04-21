import React, {PureComponent} from 'react';

class BaseString extends PureComponent {
  state = {};

  resetProps(thisProps, thisState) {
    const {parentWidth, alignCenter, x, ...props} = thisProps;
    const {x: stateX} = thisState;
    let thisX = x;
    if (alignCenter) {
      props.textAnchor = 'middle';
      thisX = stateX;
    }
    if (thisX) {
      props.x = thisX;
    }
    return props;
  }

  getEl() {
    return this.el;
  }

  update(props, prevProps) {
    const {parentWidth: prevParentWidth} = prevProps || {};
    const {parentWidth, alignCenter} = props;
    if (alignCenter && parentWidth !== prevProps.parentWidth) {
      const {width} = this.getEl().getBBox();
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
