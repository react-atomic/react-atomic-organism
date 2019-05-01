import React, {PureComponent, cloneElement} from 'react';
import {SemanticUI, build} from 'react-atomic-molecule';
import {Graph, Group, Zoom} from 'organism-react-graph';
import get, {getDefault} from 'get-object-value';
import getOffset, {mouse, getSvgMatrixXY} from 'getoffset';
import callfunc from 'call-func';
import {toInt} from 'to-percent-js';
import {UNDEFINED} from 'reshow-constant';

import ArrowHead from '../molecules/ArrowHead';
import BoxGroup from '../organisms/BoxGroup';
import Box from '../organisms/Box';
import Line from '../organisms/Line';
import BoxGroupDefaultLayout from '../organisms/BoxGroupDefaultLayout';
import BoxDefaultLayout from '../organisms/BoxDefaultLayout';
import ConnectController from '../../src/ConnectController';

const keys = Object.keys;

class HTMLGraph extends PureComponent {
  render() {
    const props = this.props;
    return <SemanticUI {...props} />;
  }
}

class UMLGraph extends PureComponent {
  static defaultProps = {
    boxGroupsLocator: d => (d || {}).tables || [],
    boxsLocator: d => (d || {}).cols || [],
    uniqueBoxGroupNameLocator: d => d,
    boxNameLocator: d => d,
    connsLocator: d => d,
    connFromBoxGroupLocator: d => d,
    connToBoxGroupLocator: d => d,
    connFromBoxLocator: d => d,
    connToBoxLocator: d => d,
    arrowHeadComponent: ArrowHead,
  };

  state = {
    lines: {},
  };

  boxGroupNameInvertMap = {};
  boxGroupMap = {};
  boxQueue = {};
  startPoint = null;
  endPoint = null;
  lazyMove = {};
  oConn;

  getVectorEl() {
    return this.vector;
  }

  getConnectStartPoint() {
    return this.startPoint;
  }

  setConnectStartPoint(el) {
    this.startPoint = el;
    return this.startPoint;
  }

  getConnectEndPoint() {
    return this.endPoint;
  }

  setConnectEndPoint(el) {
    this.endPoint = el;
  }

  getBoxGroupIdByName(name) {
    return get(this, ['boxGroupNameInvertMap', name]);
  }

  addLazyMoveWithMouseEvent(boxGroupName, e) {
    const mouseXY = mouse(e, this.getVectorEl());
    const {x, y} = this.applyXY(mouseXY[0], mouseXY[1]);
    this.addLazyMove(boxGroupName, x, y);
  }

  addLazyMove(boxGroupName, x, y) {
    this.lazyMove[boxGroupName] = {x, y};
  }

  getLazyMoveByName(boxGroupName) {
    const xy = {...this.lazyMove[boxGroupName]};
    if (xy) {
      delete this.lazyMove[boxGroupName];
      return xy;
    }
  }

  add(payload) {
    const {onAdd} = this.props;
    callfunc(onAdd, [payload]);
  }

  edit = (name, payload) => {
    const {onEdit} = this.props;
    callfunc(onEdit, [name, payload]);
  };

  del = name => {
    const {onDel} = this.props;
    callfunc(onDel, [name]);
  };

  addBoxGroup(obj) {
    if (!obj) {
      return;
    }
    const id = obj.getId();
    const name = obj.getName();
    this.boxGroupNameInvertMap[name] = id;
    this.boxGroupMap[id] = obj;
    keys(get(this.boxQueue, null, {})).forEach(key => {
      const boxObj = this.boxQueue[key];
      const isAdd = this.addBox(boxObj);
      if (isAdd) {
        delete this.boxQueue[key];
      }
    });
  }

  addBoxQueue(obj) {
    if (!obj) {
      return;
    }
    const id = obj.getId();
    this.boxQueue[id] = obj;
  }

  addBox(obj) {
    if (!obj) {
      return;
    }
    const group = obj.getBoxGroup();
    if (!group) {
      return;
    }
    group.addBox(obj);
    group.setBoxNameInvertMap(obj.getId(), obj.getName());
    return true;
  }

  insideHtml = el => this.html && this.html.contains(el);
  insideVector = el => this.vector && this.vector.contains(el);

  isOnGraph = el => {
    const umlRect = getOffset(this.zoomEl);
    if (el) {
      const elRect = getOffset(el);
      const atTop = elRect.bottom <= umlRect.top;
      const atRight = elRect.left >= umlRect.right;
      const atBottom = elRect.top >= umlRect.bottom;
      const atLeft = elRect.right <= umlRect.left;
      return !(atTop || atRight || atBottom || atLeft);
    } else {
      return false;
    }
  };

  getBox(id, groupId) {
    const group = get(this.boxGroupMap, [groupId]);
    if (group) {
      return group.getBox(id);
    }
  }

  getBoxGroup(id) {
    return get(this.boxGroupMap, [id]);
  }

  getBoxComponent(name, groupId) {
    const {onGetBoxComponent} = this.props;
    const component = callfunc(onGetBoxComponent, [name, groupId]);
    return component || BoxDefaultLayout;
  }

  getBoxGroupComponent(name) {
    const {onGetBoxGroupComponent} = this.props;
    const component = callfunc(onGetBoxGroupComponent, [name]);
    return component || BoxGroupDefaultLayout;
  }

  getTransform = () => {
    const t = this.zoom.getTransform();
    return t;
  };

  applyXY = (pX, pY) => {
    const dom = this.getVectorEl();
    const zoom = this.getTransform();
    const {x, y} = getSvgMatrixXY(dom, zoom)(pX, pY);
    return {x, y};
  };

  syncPropConnects() {
    this.oConn = new ConnectController({host: this});
    const {
      data,
      connsLocator,
      connFromBoxGroupLocator,
      connToBoxGroupLocator,
      connFromBoxLocator,
      connToBoxLocator,
      boxGroupsLocator,
      onConnAdd,
    } = this.props;

    const conns = connsLocator(data);
    if (!conns || !conns.length) {
      return;
    }
    const groupConn = {};
    const addGroupConn = (from, to) => {
      const a = [from, to].sort();
      groupConn[a[0] + '-' + a[1]] = [from, to];
    };
    conns.forEach(conn => {
      const fromBoxGroupName = connFromBoxGroupLocator(conn);
      const fromBoxName = connFromBoxLocator(conn);
      const toBoxGroupName = connToBoxGroupLocator(conn);
      const toBoxName = connToBoxLocator(conn);
      if (!fromBoxGroupName || !fromBoxName || !toBoxGroupName || !toBoxName) {
        console.error('Sync props conns failed', [
          fromBoxGroupName,
          fromBoxName,
          toBoxGroupName,
          toBoxName,
          conn,
        ]);
        return;
      }
      const fromBoxGroupId = this.getBoxGroupIdByName(fromBoxGroupName);
      const toBoxGroupId = this.getBoxGroupIdByName(toBoxGroupName);
      const fromBoxId = this.getBoxGroup(fromBoxGroupId).getBoxIdByName(
        fromBoxName,
      );
      const toBoxId = this.getBoxGroup(toBoxGroupId).getBoxIdByName(toBoxName);
      const lineName = this.oConn.addLine(conn);
      addGroupConn(fromBoxGroupId, toBoxGroupId);
      const fromBox = this.getBox(fromBoxId, fromBoxGroupId);
      const toBox = this.getBox(toBoxId, toBoxGroupId);
      if (fromBox && toBox) {
        this.oConn.addConnected(
          lineName,
          fromBox.getRecentPoint(fromBox.getEdge()),
          toBox.getRecentPoint({x: 0, y: 0}),
          true,
        );
      }
    });
    return groupConn;
  }

  handleZoom = e => {
    const {transform: oTransform} = e;
    this.setState({oTransform});
  };

  handleLineEdit = payload => {
    const {onLineEdit} = this.props;
    callfunc(onLineEdit, [payload]);
  };

  handleLineDel = payload => {
    const {onLineDel} = this.props;
    callfunc(onLineDel, [payload]);
  };

  handleConnAdd = payload => {
    const {onConnAdd} = this.props;
    const from = get(payload, ['from']).getBoxGroupName();
    const to = get(payload, ['to']).getBoxGroupName();
    if (from && to) {
      payload.fromTo = {from, to};
    }
    callfunc(onConnAdd, [payload]);
  };

  handleConnWillAdd = payload => {
    const {onConnWillAdd} = this.props;
    let isContinue = true;
    if (onConnWillAdd) {
      const result = callfunc(onConnWillAdd, [payload]);
      if (UNDEFINED === typeof result) {
        console.error('onConnWillAdd should not return undefined.');
      } else {
        isContinue = result;
      }
    }
    return isContinue;
  };

  componentDidMount() {
    setTimeout(() => {
      import('../../src/dagre').then(dagreAutoLayout => {
        dagreAutoLayout = getDefault(dagreAutoLayout);
        const conns = this.syncPropConnects();
        const newXY = dagreAutoLayout({...this.boxGroupMap}, conns);
        get(keys(newXY), null, []).forEach(key => {
          const oBoxGroup = this.getBoxGroup(key);
          oBoxGroup.move(newXY[key].x, newXY[key].y);
        });
      });
    });
  }

  componentWillUnmount() {
    this.oConn.clearTimeout();
  }

  render() {
    const {
      arrowHeadComponent,
      data,
      uniqueBoxGroupNameLocator,
      boxNameLocator,
      boxsLocator,
      boxGroupsLocator,
      connsLocator,
      connFromBoxGroupLocator,
      connToBoxGroupLocator,
      connFromBoxLocator,
      connToBoxLocator,
      onAdd,
      onEdit,
      onDel,
      onConnAdd,
      onConnWillAdd,
      onLineEdit,
      onLineDel,
      onGetBoxGroupComponent,
      onGetBoxComponent,
      ...props
    } = this.props;
    const {lines, oTransform} = this.state;
    const {k, x, y} = oTransform || {};
    const transform = `translate(${toInt(x)}px, ${toInt(y)}px) scale(${k})`;
    return (
      <SemanticUI style={Styles.container} refCb={el => (this.zoomEl = el)}>
        <Graph refCb={el => (this.vector = el)} {...props} style={Styles.svg}>
          <Zoom
            onGetEl={() => this.zoomEl}
            ref={el => (this.zoom = el)}
            onZoom={this.handleZoom}>
            {build(arrowHeadComponent)()}
            {(() => {
              const arrLineEl = [];
              let hoverLineEl;
              keys(lines).forEach(key => {
                const {hover, ...lineProps} = lines[key];
                const lineEl = (
                  <Line
                    onClick={this.handleLineEdit}
                    {...lineProps}
                    name={key}
                    key={key}
                    host={this}
                  />
                );
                if (hover) {
                  hoverLineEl = lineEl;
                } else {
                  arrLineEl.push(lineEl);
                }
              });
              if (hoverLineEl) {
                arrLineEl.push(hoverLineEl);
              }
              return arrLineEl;
            })()}
          </Zoom>
        </Graph>
        <HTMLGraph
          style={{...Styles.htmlGraph, transform}}
          refCb={el => (this.html = el)}>
          {(boxGroupsLocator(data) || []).map(item => {
            const bgName = uniqueBoxGroupNameLocator(item);
            return !bgName.name ? null : (
              <BoxGroup
                ref={el => this.addBoxGroup(el)}
                host={this}
                data={data}
                key={'box-group-' + bgName.name}
                onEdit={this.edit}
                onDel={this.del}
                {...bgName}>
                {boxsLocator(item).map((colItem, colKey) => (
                  <Box key={'box-' + colKey} {...boxNameLocator(colItem)} />
                ))}
              </BoxGroup>
            );
          })}
        </HTMLGraph>
      </SemanticUI>
    );
  }
}

export default UMLGraph;

const Styles = {
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
  },
  htmlGraph: {
    pointerEvents: 'none',
    transformOrigin: '0 0',
    width: '100%',
    height: '100%',
  },
};
