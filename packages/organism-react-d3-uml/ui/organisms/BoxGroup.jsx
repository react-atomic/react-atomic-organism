import React, {PureComponent, Children, cloneElement} from 'react';
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
    if (this._mount) {
      this.setState({absX: x, absY: y});
    }
  };

  handleDrag = ({absX, absY}) => this.move(absX, absY);

  handleEdit = e => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    const {onEdit, name} = this.props;
    onEdit(name, this);
  };

  handleDel = e => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    const {onDel, name} = this.props;
    onDel(name);
  };

  getBoxIdByName(name) {
    const boxId = get(this.boxNameInvertMap, [name]);
    return boxId;
  }

  setBoxNameInvertMap(id, name) {
    this.boxNameInvertMap[name] = id;
  }

  addBox(obj) {
    if (obj) {
      this.boxs[obj.getId()] = obj;
    }
  }

  getBox(id) {
    return get(this.boxs, [id]);
  }

  getWH() {
    const el = this.getEl();
    if (el) {
      const offset = getOffset(this.getEl());
      const {width, height} = offset;
      return {width, height};
    } else {
      return {width: 1, height: 1};
    }
  }

  getName() {
    return this.props.name;
  }

  getId() {
    return this.id;
  }

  getEl = () => {
    if (this.el) {
      return this.el.getEl();
    }
  };

  constructor(props) {
    super(props);
    this.id = boxGroupId;
    boxGroupId++;
  }

  componentDidMount() {
    this._mount = true;
    const {name, host} = this.props;
    const {x, y} = host.getLazyMoveByName(name) || {};
    if (x || y) {
      this.move(x, y);
    }
  }

  componentWillUnmount() {
    this._mount = false;
  }

  render() {
    const {
      name,
      text,
      host,
      data,
      onEdit,
      onDel,
      children,
      ...props
    } = this.props;
    const {rectW, rectH, boxsPos, absX, absY} = this.state;
    const component = build(host.getBoxGroupComponent(name));
    const thisChildren = Children.map(children, c =>
      cloneElement(c, {
        boxGroupId: this.id,
        boxGroupAbsX: absX,
        boxGroupAbsY: absY,
      }),
    );
    return (
      <DragAndDrop
        ref={el => (this.el = el)}
        absX={absX}
        absY={absY}
        onDrag={this.handleDrag}
        zoom={host.getTransform}
        onGetEl={this.getEl}
        component={component(
          {
            ...props,
            id: this.id,
            isInsideVector: host.insideVector,
            onEdit: this.handleEdit,
            onDel: this.handleDel,
            className: 'box-group',
            boxGroupAbsX: absX,
            boxGroupAbsY: absY,
            zoomK: host.getZoomK(),
            text: text || name,
          },
          thisChildren,
        )}
      />
    );
  }
}

export default BoxGroup;
