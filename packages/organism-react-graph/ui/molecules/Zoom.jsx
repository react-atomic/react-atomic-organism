import React, {PureComponent} from 'react';
import {d3Zoom} from 'd3-lib';
import callfunc from 'call-func';

import Group from '../molecules/Group';

class Zoom extends PureComponent {
  static defaultProps = {
    withTransform: true,
  };

  state = {
    transform: null,
  };

  oD3Zoom = null;

  getTransform() {
    const {transform} = this.state;
    return transform;
  }

  getD3Zoom = () => this.oD3Zoom;

  componentDidMount() {
    const {onGetEl, onZoom} = this.props;
    setTimeout(() => {
      this.oD3Zoom = d3Zoom({
        el: callfunc(onGetEl),
        scaleExtent: [-1, 8],
        callback: e => {
          const {transform} = e;
          this.setState({transform}, () => callfunc(onZoom, [e]));
        },
      });
    });
  }

  render() {
    const {onGetEl, onZoom, withTransform, ...props} = this.props;
    const {transform} = this.state;
    // disabe state transform, if props has will use props one
    if (withTransform && transform) {
      props.transform = transform+'';
    }
    return <Group name="zoom" {...props} />;
  }
}

export default Zoom;
