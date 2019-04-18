import React, {PureComponent} from 'react';
import {d3Zoom} from 'd3-lib';
import callfunc from 'call-func';

import Group from '../organisms/Group';

class Zoom extends PureComponent {
  static defaultProps = {
    withTransform: true
  };

  state = {
    transform: '',
  };

  componentDidMount() {
    const {onGetEl, onZoom} = this.props;
    setTimeout(() => {
      d3Zoom({
        el: callfunc(onGetEl),
        scaleExtent: [-1, 8],
        callback: transform => {
          this.setState({transform});
          callfunc(onZoom, [transform]); 
        },
      });
    });
  }

  getTransform() {
    const {transform} = this.state;
    return transform;
  }

  render() {
    const {onGetEl, onZoom, withTransform, ...props} = this.props;
    const {transform} = this.state;
    // disabe state transform, if props has will use props one
    if (withTransform) {
      const thisTransform = transform + '';
      props.transform = thisTransform;
    }
    return <Group name="zoom" {...props} />;
  }
}

export default Zoom;
