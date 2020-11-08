import React, { PureComponent } from "react";
import { d3Select, d3Zoom, toZoomTransform } from "d3-lib";
import callfunc from "call-func";

import Group from "../molecules/Group";

class Zoom extends PureComponent {
  static defaultProps = {
    scaleExtent: [-1, 8],
  };

  state = {
    transform: null,
  };

  getTransform() {
    const { transform } = this.state;
    return transform;
  }

  setTransform(transform, e) {
    const { onZoom, onGetEl } = this.props;
    if (!e) {
      e = { transform };
      const objD3Zoom = this.getD3Zoom();
      const el = d3Select(callfunc(onGetEl));
      if (objD3Zoom && el) {
        objD3Zoom.transform(el, transform);
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

  componentDidMount() {
    const { onGetEl, scaleExtent } = this.props;
    let objD3Zoom;
    let enableZooming = true;
    setTimeout(() => {
      const el = callfunc(onGetEl);
      objD3Zoom = d3Zoom({
        el,
        scaleExtent,
        callback: (e) => {
          if (enableZooming) {
            this.setTransform(e.transform, e);
          } else {
            if (this.state.transform && e.transform !== this.state.transform) {
              objD3Zoom.transform(d3Select(el), this.state.transform);
            }
          }
        },
      });
    });
    this.getD3Zoom = () => objD3Zoom;
    this.enable = () => enableZooming = true;
    this.disable = () => enableZooming = false;
    this.getEnable = () => enableZooming;
  }

  render() {
    const { onGetEl, onZoom, scaleExtent, ...props } = this.props;
    const { transform } = this.state;

    return (
      <Group name="zoom" {...props} transform={transform && transform + ""} />
    );
  }
}

export default Zoom;
