import React, {PureComponent} from 'react';
import {build} from 'react-atomic-molecule';
import {getDistance} from 'organism-react-graph';
import getOffset from 'getoffset';

import ConnectPoint from '../organisms/ConnectPoint';

let boxId = 1;
const keys = Object.keys;

class Box extends PureComponent {
  isConnectPointDrag = false;
  points = [];
  hoverTimer = false;

  state = {
    showConnectPoint: false,
  };

  getConnectFromBoxId() {
    const {host} = this.props;
    const point = host.getConnectStartPoint();
    if (point) {
      return point.getBox().getId();
    }
  }

  handleMouseEnter = () => {
    this.clearHoverTimer();
    this.setState({showConnectPoint: true});
  };

  handleMouseLeave = () => {
    const formBoxId = this.getConnectFromBoxId();
    if (formBoxId && this.getId() !== formBoxId) {
      this.setState({showConnectPoint: false});
    } else {
      if (!this.isConnectPointDrag) {
        this.hoverTimer = setTimeout(() => {
          this.setState({showConnectPoint: false});
        }, 1000);
      }
    }
  };

  handlePointDrag = bool => {
    this.isConnectPointDrag = bool;
  };

  getRecentPoint(center) {
    const distance = [];
    const distanceMap = {};
    keys(this.points).forEach(key => {
      const p = this.points[key];
      const point = p.getCenter();
      let pointDistance = getDistance(center, point);
      distance.push(pointDistance);
      distanceMap[pointDistance] = p;
    });
    const min = Math.min(...distance);
    return distanceMap[min];
  }

  getPoint(key) {
    return this.points[key];
  }

  addPoint = obj => {
    if (obj) {
      this.points[obj.getId()] = obj;
    }
  };

  getBoxGroup() {
    const {host, boxGroupId} = this.props;
    return host.getBoxGroup(boxGroupId);
  }

  getName() {
    let {name} = this.props;
    if (name !== 0 && !name) {
      name = this.getId();
    }
    return name;
  }

  getId() {
    return this.id;
  }

  getEl() {
    return this.el.getEl();
  }

  getEdge() {
    const {host} = this.props;
    const el = this.getEl();
    const offset = getOffset(el);
    return host.applyXY(offset.right, offset.bottom);
  }

  clearHoverTimer() {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = false;
    }
  }

  constructor(props) {
    super(props);
    this.id = boxId;
    boxId++;
  }

  componentDidMount() {
    const {host} = this.props;
    host.addBoxQueue(this);
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
      text,
      ...props
    } = this.props;
    const name = this.getName();
    const {showConnectPoint} = this.state;
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
      />,
    );
    const component = build(host.getBoxComponent(name, boxGroupId));
    return component({
      ...props,
      connectPointComponent,
      ref: el => (this.el = el),
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      'data-id': this.id,
      'data-group': boxGroupId,
      text: text || name,
    });
  }
}

export default Box;
