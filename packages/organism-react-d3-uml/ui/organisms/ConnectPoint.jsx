import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import {DragAndDrop} from 'organism-react-graph';
import getOffset, {mouse, toSvgXY} from 'getoffset';
import get from 'get-object-value';
import callfunc from 'call-func';
import ConnectPointDefaultLayout from '../organisms/ConnectPointDefaultLayout';

let connPointId = 1;
const keys = Object.keys;

class ConnectPoint extends PureComponent {

  static defaultProps = {
    component: ConnectPointDefaultLayout
  };

  state = {
    absX: 0,
    absY: 0,
  };

  start = false;
  dnd = null;
  lines = {};

  getEl = () => callfunc(this.dnd.getEl, null, this.dnd);

  handleDragStart = e => {
    const {start} = e;
    const {onShow, host} = this.props;
    callfunc(onShow, [true]);
    const lineId = host.addLine();
    start.center = this.getCenter();
    start.lineId = lineId;
    this.start = {...start};
    host.setConnectStartPoint(this);
  };

  handleDrag = e => {
    const {absX, absY, sourceEvent} = e;
    this.setState({absX, absY});
    const {host} = this.props;
    const {lineId, center} = this.start;
    let endXY;
    const target = e.destTarget;
    if (target) {
      const targetId = target.getAttribute('data-id');
      const targetGroup = target.getAttribute('data-group');
      if (targetId && targetGroup) {
        const targetBox = host.getBox(targetId, targetGroup);
        const targetPoint = targetBox.getRecentPoint(center);
        endXY = targetPoint.getCenter();
        host.setConnectEndPoint(targetPoint);
      }
    }
    if (!endXY) {
      host.setConnectEndPoint(null);
      const hostEl = host.getEl();
      const end = mouse(sourceEvent, hostEl);
      endXY = host.applyXY(hostEl)(end[0], end[1]);
    }
    host.updateLine(lineId, {start: center, end: endXY});
  };

  handleDragEnd = e => {
    const {onShow, host} = this.props;
    const endPoint = host.getConnectEndPoint(this);
    const {lineId} = this.start;
    let isAddConnected = false;
    if (endPoint) {
      isAddConnected = host.addConnected(lineId, this, endPoint);
    }
    if (!endPoint || !isAddConnected) {
      host.setConnectStartPoint(null);
      host.deleteLine(lineId);
    }

    callfunc(onShow, [false]);
    this.start = false;
  };

  setLine(id, type) {
    this.lines[id] = type;
  }

  delLine(id) {
    delete this.lines[id];
  }

  getVectorCenter(el, host) {
    const bbox = el.getBBox();
    const {left, top, width, height} = el.getBoundingClientRect();
    const x = bbox.x + width / 2;
    const y = bbox.y + height / 2;
    return host.applyXY(el)(x, y);
  }

  getHtmlCenter(el, host) {
    const bbox = el.getBBox();
    const {left, top, width, height} = getOffset(el) || {left:0, top:0, width:0, height:0};
    const x = bbox.x + (width / 2) + left;
    const y = bbox.y + (height / 2) + top;
    const hostEl = host.getEl();
    const sXY = toSvgXY(hostEl)(x, y);
    return host.applyXY(hostEl)(sXY.x, sXY.y);
  }

  getCenter() {
    const {host} = this.props;
    const el = this.getEl();
    if (host.insideVector(el)) {
      return this.getVectorCenter(el, host);
    } else {
      return this.getHtmlCenter(el, host);
    }
  }

  getBox() {
    return this.props.box;
  }

  getId() {
    return this.id;
  }

  isShow() {
    let {show} = this.props;
    if (this.start) {
      show = true;
    }
    const linesLen = keys(this.lines).length;
    if (linesLen) {
      show = true;
    }
    return show;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {pos} = this.props;
    if (pos === prevProps.pos) {
      return;
    }
    const lineKeys = keys(this.lines);
    if (lineKeys.length) {
      const {host} = this.props;
      const center = this.getCenter();
      lineKeys.forEach(lineId => {
        const lineType = this.lines[lineId];
        if ('from' === lineType) {
          host.updateLine(lineId, {start: center});
        } else {
          host.updateLine(lineId, {end: center});
        }
      });
    }
  }

  componentDidMount() {
    this.id = connPointId;
    connPointId++;
    this.getBox().addPoint(this);
  }

  render() {
    const {pos, host, onShow, show, box, component, ...props} = this.props;
    const {absX, absY} = this.state;
    const build = isValidElement(component) ? cloneElement : createElement;
    return (
      <DragAndDrop
        {...props}
        absX={absX}
        absY={absY}
        isShow={this.isShow()}
        onGetEl={this.getEl}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDrag={this.handleDrag}
        component={build(component, {
          ref: el => this.dnd = el
        })}
      />
    );
  }
}

export default ConnectPoint;
