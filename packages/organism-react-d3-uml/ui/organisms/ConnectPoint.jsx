import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
} from 'react';
import {DragAndDrop} from 'organism-react-graph';
import getOffset, {mouse} from 'getoffset';
import get from 'get-object-value';
import callfunc from 'call-func';

let connPointId = 1;
const keys = Object.keys;

class ConnectPoint extends PureComponent {
  state = {
    absX: 0,
    absY: 0,
  };

  start = false;
  dnd = null;
  lines = {};

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
        endXY = targetPoint.xy;
        host.setConnectEndPoint(targetPoint.obj);
      }
    }
    if (!endXY) {
      host.setConnectEndPoint(null);
      const el = host.getEl();
      const end = mouse(sourceEvent, el);
      const {x: endX, y: endY} = host.applyXY(el)(end[0], end[1]);
      endXY = {x: endX, y: endY};
    }
    host.updateLine(lineId, {start: center, end: endXY});
  };

  handleGetEl = () => {
    if (this.dnd) {
      return this.dnd.getEl();
    }
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

  getCenter() {
    const {host} = this.props;
    const el = this.handleGetEl();
    const bbox = el.getBBox();
    const region = el.getBoundingClientRect();
    const {left, top, width, height} = region;
    const x = bbox.x + width / 2;
    const y = bbox.y + height / 2;
    return host.applyXY(el)(x, y);
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
        onGetEl={this.handleGetEl}
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

