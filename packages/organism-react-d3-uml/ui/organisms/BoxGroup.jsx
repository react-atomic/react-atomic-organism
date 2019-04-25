import React, {
  PureComponent,
  Children,
} from 'react';
import {build} from 'react-atomic-molecule';
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

  move = (x, y) => {
    this.setState({absX: x, absY: y});
  };

  handleDrag = ({absX, absY}) => this.move(absX, absY);

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

  componentDidMount() {
    const {name, host} = this.props;
    const {x, y} = host.getLazyMoveByName(name) || {};
    if (x || y) {
      this.move(x, y);
    }
  }

  render() {
    const {name, host} = this.props;
    const {rectW, rectH, boxsPos, absX, absY} = this.state;
    const component = build(host.getBoxGroupComponent(name));
    return (
      <DragAndDrop
        absX={absX}
        absY={absY}
        onDrag={this.handleDrag}
        zoom={host.getTransform}
        onGetEl={this.getEl}
        component={component({
          ...this.props,
          className: 'box-group',
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
