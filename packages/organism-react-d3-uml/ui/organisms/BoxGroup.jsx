import React, {
  PureComponent,
  cloneElement,
  createElement,
  isValidElement,
  Children,
} from 'react';
import {DragAndDrop} from 'organism-react-graph';
import get from 'get-object-value';
import getOffset from 'getoffset';

const keys = Object.keys;
let boxGroupId = 1;

class BoxGroup extends PureComponent {
  state = {
    absX: 0,
    absY: 0,
  };

  boxNameInvertMap = {};
  boxs = {};

  move = ({absX, absY}) => {
    this.setState({absX, absY});
  };

  getBoxIdByName(name) {
    return get(this, ['boxNameInvertMap', name]);
  }

  setBoxNameInvertMap(id, name) {
    this.boxNameInvertMap[name] = id;
  }

  addBox(obj) {
    if (obj) {
      this.boxs[obj.getId()] = obj;
    }
  }

  getWH() {
    const offset = getOffset(this.getEl());
    const {w, h} = offset;
    return {width: w, height: h};
  }

  getBox(id) {
    return get(this.boxs, [id]);
  }

  getName() {
    const {name} = this.props;
    return name;
  }

  getId() {
    return this.id;
  }

  getEl = () => {
    return this.el.getEl();
  };

  constructor(props) {
    super(props);
    this.id = boxGroupId;
    boxGroupId++;
  }

  render() {
    const {name, host} = this.props;
    const {rectW, rectH, boxsPos, absX, absY} = this.state;
    const component = host.getBoxGroupComponent(name);
    const build = isValidElement(component) ? cloneElement : createElement;
    return (
      <DragAndDrop
        absX={absX}
        absY={absY}
        onDrag={this.move}
        zoom={host.getTransform}
        onGetEl={this.getEl}
        component={build(component, {
          ...this.props,
          ref: el => (this.el = el),
          boxGroupId: this.id,
          absX,
          absY,
        })}
      />
    );
  }
}

export default BoxGroup;
