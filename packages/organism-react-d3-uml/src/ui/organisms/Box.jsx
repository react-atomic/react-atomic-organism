import React, { Component } from "react";
import { build } from "react-atomic-molecule";
import { getDistance } from "organism-react-graph";

import ConnectPoint from "../organisms/ConnectPoint";

let boxId = 1;
const keys = Object.keys;

class Box extends Component {
  isConnectPointDrag = false;
  points = {};
  hoverTimer = false;

  state = {
    showConnectPoint: false,
  };

  getFromBoxId() {
    const { host } = this.props;
    const point = host.getConnectStartPoint();
    if (point) {
      return point.getBox().getId();
    }
  }

  getBoxGroup() {
    const { host, boxGroupId } = this.props;
    return host.getBoxGroup(boxGroupId);
  }

  getBoxGroupId() {
    return this.props.boxGroupId;
  }

  getName() {
    let { name } = this.props;
    if (name !== 0 && !name) {
      name = this.getId();
    }
    return name;
  }

  getId() {
    return this.id;
  }

  getRef() {
    return this.elRef;
  }

  getEl() {
    const ref = this.getRef();
    if (ref && ref.getEl) {
      return ref.getEl();
    }
  }

  getEdge() {
    const { host } = this.props;
    const el = this.getEl();
    const { right, bottom } =
      el && el.getBoundingClientRect
        ? el.getBoundingClientRect()
        : {
            right: 0,
            bottom: 0,
          };
    return host.applyXY(right, bottom);
  }

  getRecentPoint(center) {
    const distance = [];
    const distanceMap = {};
    keys(this.points).forEach((key) => {
      const p = this.points[key];
      const point = p.getCenter();
      if (point) {
        const pointDistance = getDistance(center, point);
        distance.push(pointDistance);
        distanceMap[pointDistance] = p;
      }
    });
    const min = Math.min(...distance);
    return distanceMap[min];
  }

  getConnectPoint(center, endCenter) {
    const elRef = this.getRef();
    if (elRef && elRef.getConnectPoint) {
      return elRef.getConnectPoint(center, endCenter);
    } else {
      return this.getRecentPoint(center);
    }
  }

  getFromPoint() {
    const elRef = this.getRef();
    if (elRef && elRef.getFromPoint) {
      return elRef.getFromPoint();
    } else {
      return this.getRecentPoint(this.getEdge());
    }
  }

  getToPoint() {
    const elRef = this.getRef();
    if (elRef && elRef.getToPoint) {
      return elRef.getToPoint();
    } else {
      return this.getRecentPoint({ x: 0, y: 0 });
    }
  }

  getPoint(key) {
    return this.points[key];
  }

  addPoint = (obj) => {
    if (obj) {
      this.points[obj.getId()] = obj;
    }
  };

  clearHoverTimer() {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = false;
    }
  }

  handleMouseEnter = () => {
    this.clearHoverTimer();
    this.setState({ showConnectPoint: true });
  };

  handleMouseLeave = () => {
    const fromBoxId = this.getFromBoxId();
    if (fromBoxId && this.getId() !== fromBoxId) {
      this.setState({ showConnectPoint: false });
    } else {
      if (!this.isConnectPointDrag) {
        this.hoverTimer = setTimeout(() => {
          this.setState({ showConnectPoint: false });
        }, 1000);
      }
    }
  };

  handlePointDrag = (bool) => {
    this.isConnectPointDrag = bool;
  };

  handleEl = (el) => {
    if (el) {
      this.elRef = el;
    }
  };

  constructor(props) {
    super(props);
    this.id = boxId;
    boxId++;
  }

  componentDidMount() {
    const { host } = this.props;
    host.addBox(this);
  }

  componentWillUnmount() {
    this.clearHoverTimer();
  }

  render() {
    const {
      host,
      boxGroupAbsX,
      boxGroupAbsY,
      boxGroupId,
      boxGroupName,
      boxComponent,
      text,
      ...props
    } = this.props;
    const name = this.getName();
    const { showConnectPoint } = this.state;
    const connectPointComponent = build(
      <ConnectPoint
        boxId={this.id}
        boxGroupId={boxGroupId}
        boxGroupAbsX={boxGroupAbsX}
        boxGroupAbsY={boxGroupAbsY}
        show={showConnectPoint}
        host={host}
        onDragStart={this.handlePointDrag}
        onMount={this.addPoint}
      />
    );
    const component = build(
      boxComponent ? boxComponent : host.getBoxComponent(name, boxGroupName)
    );
    return component({
      ...props,
      connectPointComponent,
      ref: this.handleEl,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      "data-id": this.id,
      "data-group": boxGroupId,
      text: text || name,
    });
  }
}

export default Box;
