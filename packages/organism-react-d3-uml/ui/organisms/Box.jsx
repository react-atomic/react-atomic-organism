import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import {getDistance} from 'organism-react-graph';

let boxId = 1;
const keys = Object.keys;

class Box extends PureComponent {
  isConnectPointDrag = false;
  points = [];

  state = {
    showConnectPoint: false,
  };

  handleMouseEnter = () => {
    this.setState({showConnectPoint: true});
  };

  handleMouseLeave = () => {
    setTimeout(() => {
      if (!this.isConnectPointDrag) {
        this.setState({showConnectPoint: false});
      }
    }, 1000);
  };

  setIsConnectPointDrag = bool => {
    this.isConnectPointDrag = bool;
  };

  getRecentPoint(center) {
    const distance = [];
    const distanceMap = {};
    keys(this.points).forEach( key => {
      const p = this.points[key];
      const point = p.getCenter();
      let pointDistance = getDistance(center, point);
      distance.push(pointDistance);
      distanceMap[pointDistance] = {
        xy: point,
        obj: p,
      };
    });
    const min = Math.min(...distance);
    return distanceMap[min];
  }

  getPoint(key) {
    return this.points[key];
  }

  addPoint(obj) {
    if (obj) {
      this.points[obj.getId()] = obj;
    }
  }

  getBoxGroup() {
    const {host, boxGroupId} = this.props;
    return host.getBoxGroup(boxGroupId);
  }

  getName() {
    const {name} = this.props;
    return name;
  }

  getId() {
    return this.id;
  }

  getEl() {
    return this.el.getEl();
  }

  componentDidMount() {
    this.id = boxId;
    boxId++;
    const {host} = this.props;
    host.addBoxQueue(this);
  }

  render() {
    const {
      name,
      host,
      boxGroupId,
    } = this.props;
    const {showConnectPoint} = this.state;
    const component = host.getBoxComponent(name, boxGroupId);
    const build = isValidElement(component) ? cloneElement : createElement;
    return build(component, {
      ...this.props,
      ref: el => this.el = el,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      'data-id': this.id,
      'data-group': boxGroupId,
      showConnectPoint,
      box: this
    });
  }
}

export default Box;
