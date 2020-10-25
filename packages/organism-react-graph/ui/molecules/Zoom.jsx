import React, { PureComponent } from "react";
import { d3Select, d3Zoom, toZoomTransform } from "d3-lib";
import callfunc from "call-func";

import Group from "../molecules/Group";

class Zoom extends PureComponent {
  state = {
    transform: null,
  };

  oD3Zoom = null;

  getTransform() {
    const { transform } = this.state;
    return transform;
  }

  setTransform(transform, e) {
    const { onZoom, onGetEl } = this.props;
    if (!e) {
      e = { transform };
      const el = d3Select(callfunc(onGetEl));
      if (this.oD3Zoom && el) {
        this.oD3Zoom.transform(el, transform);
      }
    }
    e.zoom = this;
    this.setState({ transform }, () => callfunc(onZoom, [e]));
  }

  setXYK({ x, y, k }) {
    const { x: x1, y: y1, k: k1 } = this.getXYK();
    x = x ?? x1 ?? 0;
    y = y ?? y1 ?? 0;
    k = k ?? k1 ?? 1;
    return this.setTransform(toZoomTransform({ x, y, k }));
  }

  getXYK() {
    const { transform } = this.state;
    const { x, y, k } = transform || {};
    return { x, y, k };
  }

  getD3Zoom = () => this.oD3Zoom;

  componentDidMount() {
    const { onGetEl } = this.props;
    setTimeout(() => {
      this.oD3Zoom = d3Zoom({
        el: callfunc(onGetEl),
        scaleExtent: [-1, 8],
        callback: (e) => this.setTransform(e.transform, e),
      });
    });
  }

  render() {
    const { onGetEl, onZoom, ...props } = this.props;
    const { transform } = this.state;

    return (
      <Group name="zoom" {...props} transform={transform && transform + ""} />
    );
  }
}

export default Zoom;
