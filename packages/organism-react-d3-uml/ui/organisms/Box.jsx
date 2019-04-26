import React, {PureComponent} from 'react';
import {build} from 'react-atomic-molecule';
import {getDistance} from 'organism-react-graph';
import getOffset from 'getoffset';

let boxId = 1;
const keys = Object.keys;

class Box extends PureComponent {
  isConnectPointDrag = false;
  points = [];
  hoverTimer = false;

  state = {
    showConnectPoint: false,
  };

  handleMouseEnter = () => {
    this.setState({showConnectPoint: true});
  };

  handleMouseLeave = () => {
    this.hoverTimer = setTimeout(() => {
      if (!this.isConnectPointDrag) {
        this.setState({showConnectPoint: false});
      }
    }, 1000);
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
  }

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
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = false;
    }
  }

  render() {
    const props = {...this.props, name: this.getName()};
    const {name, text, host, boxGroupId} = props;
    const {showConnectPoint} = this.state;
    const component = build(host.getBoxComponent(name, boxGroupId));
    return component({
      ...this.props,
      ref: el => (this.el = el),
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onPointDragStart: this.handlePointDrag,
      onPointMount: this.addPoint, 
      'data-id': this.id,
      'data-group': boxGroupId,
      id: this.id,
      boxGroupId,
      showConnectPoint,
      text: text || name
    });
  }
}

export default Box;
