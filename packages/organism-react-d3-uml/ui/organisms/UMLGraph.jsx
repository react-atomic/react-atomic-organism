import React, {PureComponent, cloneElement} from 'react';
import {SemanticUI, build} from 'react-atomic-molecule';
import {Graph, Group, Zoom} from 'organism-react-graph';
import get, {getDefault} from 'get-object-value';
import getOffset, {mouse, getSvgMatrixXY} from 'getoffset';
import callfunc from 'call-func';
import {toInt} from 'to-percent-js';

import ArrowHead from '../molecules/ArrowHead';
import BoxGroup from '../organisms/BoxGroup';
import Box from '../organisms/Box';
import Line from '../organisms/Line';
import BoxGroupDefaultLayout from '../organisms/BoxGroupDefaultLayout';
import BoxDefaultLayout from '../organisms/BoxDefaultLayout';

let lineCounts = 0;
const keys = Object.keys;
let lazeTimer;

class HTMLGraph extends PureComponent {
  render() {
    const props = this.props;
    return <SemanticUI {...props} />;
  }
}

class UMLGraph extends PureComponent {
  state = {
    lines: {},
  };

  static defaultProps = {
    boxGroupsLocator: d => (d || {}).tables,
    boxsLocator: d => (d || {}).cols,
    boxGroupNameLocator: d => (d || {}).name,
    boxNameLocator: d => d,
    connsLocator: d => d,
    connFromBoxGroupLocator: d => d,
    connToBoxGroupLocator: d => d,
    connFromBoxLocator: d => d,
    connToBoxLocator: d => d,
    arrowHeadComponent: ArrowHead,
  };

  lineTimer = null;
  boxGroupNameInvertMap = {};
  boxGroupMap = {};
  boxQueue = {};
  startPoint = null;
  endPoint = null;
  updateQueue = {};
  connects = {};
  lazyMove = {};

  addLine() {
    const name = 'line-' + lineCounts;
    lineCounts++;
    this.setState(({lines}) => {
      lines[name] = {};
      return {lines: {...lines}};
    });
    return name;
  }

  updateLine(name, params) {
    const {lines} = this.state;
    this.updateQueue[name] = {
      ...this.updateQueue[name],
      ...params,
    };
    if (this.lineTimer) {
      clearTimeout(this.lineTimer);
      this.lineTimer = false;
    }
    this.lineTimer = setTimeout(() => {
      this.setState(({lines}) => {
        keys(this.updateQueue).forEach(name => {
          if (get(lines, [name])) {
            lines[name] = {
              ...lines[name],
              ...this.updateQueue[name],
            };
          }
        });
        this.updateQueue = {};
        return {lines: {...lines}};
      });
    });
  }

  deleteLine(name) {
    if (this.lineTimer) {
      clearTimeout(this.lineTimer);
      this.lineTimer = false;
    }
    this.setState(({lines}) => {
      const line = lines[name];
      const from = line.from;
      const to = line.to;
      if (from) {
        from.delLine(name);
      }
      if (to) {
        to.delLine(name);
      }
      if (from && to) {
        const {mergeId, invertMergeId} = this.getConnectIds(from, to);
        delete this.connects[mergeId];
        delete this.connects[invertMergeId];
      }
      delete lines[name];
      return {lines: {...lines}};
    });
  }

  getConnectIds(from, to) {
    const fromBoxId = from.getBox().getId();
    const toBoxId = to.getBox().getId();
    const mergeId = `${fromBoxId}-${toBoxId}`;
    const invertMergeId = `${toBoxId}-${fromBoxId}`;
    return {
      fromBoxId,
      toBoxId,
      mergeId,
      invertMergeId,
    };
  }

  getConnectNames(from, to) {
    const ids = this.getConnectIds(from, to);
    const fromBox = from.getBox();
    const toBox = to.getBox();
    const fromBoxGroup = fromBox.getBoxGroup();
    const toBoxGroup = toBox.getBoxGroup();
    const fromBoxName = fromBox.getName();
    const fromBoxGroupName = fromBoxGroup.getName();
    const toBoxName = toBox.getName();
    const toBoxGroupName = toBoxGroup.getName();
    return {
      ...ids,
      fromBoxName,
      toBoxName,
      fromBoxGroupName,
      toBoxGroupName,
    };
  }

  getConnects() {
    const conns = this.connects;
    const {lines} = this.state;
    const results = [];
    keys(conns).forEach(key => {
      const lineName = conns[key];
      const {from, to} = lines[lineName];
      if (!from || !to) {
        return;
      } else {
        const connData = this.getConnectNames(from, to);
        connData.name = lineName;
        results.push(connData);
      }
    });
    return results;
  }

  addConnected(lineName, from, to) {
    const {fromBoxId, toBoxId, mergeId, invertMergeId} = this.getConnectIds(
      from,
      to,
    );
    const connects = this.connects;
    if (!get(connects, [mergeId]) && !get(connects, [invertMergeId])) {
      connects[mergeId] = lineName;
      from.setLine(lineName, 'from');
      to.setLine(lineName, 'to');
      this.updateLine(lineName, {
        from,
        to,
        start: from.getCenter(),
        end: to.getCenter(),
      });
      return true;
    } else {
      return false;
    }
  }

  getVectorEl() {
    return this.vector;
  }

  setConnectStartPoint(el) {
    this.startPoint = el;
    return this.startPoint;
  }

  getConnectStartPoint() {
    return this.startPoint;
  }

  setConnectEndPoint(el) {
    this.endPoint = el;
  }

  getConnectEndPoint(el) {
    return this.endPoint;
  }

  getBoxGroupIdByName(name) {
    return get(this, ['boxGroupNameInvertMap', name]);
  }

  add(payload) {
    const {onAdd} = this.props;
    callfunc(onAdd, [payload]);
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

  change(name, payload) {
    const {onChange} = this.props;
    callfunc(onChange, [name, payload]);
  }

  del(name) {
    const {onDel} = this.props;
    callfunc(onDel);
  }

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

  insideHtml = el => this.html.contains(el);
  insideVector = el => this.vector.contains(el);

  isOnGraph = el => {
    const umlRect = getOffset(this.zoomEl);
    const elRect = getOffset(el);
    const atTop = elRect.bottom <= umlRect.top;
    const atRight = elRect.left >= umlRect.right;
    const atBottom = elRect.top >= umlRect.bottom;
    const atLeft = elRect.right <= umlRect.left;
    return !(atTop || atRight || atBottom || atLeft);
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
        console.warn('Sync props conns failed', [
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
      const lineName = this.addLine();
      addGroupConn(fromBoxGroupId, toBoxGroupId);
      this.addConnected(
        lineName,
        this.getBox(fromBoxId, fromBoxGroupId).getPoint(1),
        this.getBox(toBoxId, toBoxGroupId).getPoint(0),
      );
      callfunc(onConnAdd, [lineName, conn]);
    });
    return groupConn;
  }

  handleZoom = e => {
    const {transform: oTransform} = e;
    this.setState({oTransform});
  };

  componentDidMount() {
    setTimeout(() => {
      const groupConn = this.syncPropConnects();
      import('../../src/dagre').then(dagreAutoLayout => {
        dagreAutoLayout = getDefault(dagreAutoLayout);
        const newXY = dagreAutoLayout({...this.boxGroupMap}, groupConn);
        get(keys(newXY), null, []).forEach(key => {
          const oBoxGroup = this.getBoxGroup(key);
          oBoxGroup.move(newXY[key].x, newXY[key].y);
        });
      });
    });
  }

  componentWillUnmount() {
    if (this.lineTimer) {
      clearTimeout(this.lineTimer);
      this.lineTimer = false;
    }
  }

  render() {
    const {
      arrowHeadComponent,
      data,
      boxGroupNameLocator,
      boxNameLocator,
      boxsLocator,
      boxGroupsLocator,
      connsLocator,
      connFromBoxGroupLocator,
      connToBoxGroupLocator,
      connFromBoxLocator,
      connToBoxLocator,
      onLinkClick,
      onConnAdd,
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
            {keys(lines).map(key => (
              <Line
                onClick={onLinkClick}
                {...lines[key]}
                name={key}
                key={key}
                host={this}
              />
            ))}
            {build(arrowHeadComponent)()}
          </Zoom>
        </Graph>
        <HTMLGraph
          style={{...Styles.htmlGraph, transform}}
          refCb={el => (this.html = el)}>
          {(boxGroupsLocator(data) || []).map((item, tbKey) => (
            <BoxGroup
              ref={el => this.addBoxGroup(el)}
              host={this}
              data={data}
              name={boxGroupNameLocator(item)}
              key={'box-group-' + tbKey}>
              {boxsLocator(item).map((colItem, colKey) => (
                <Box key={'box-' + colKey} name={boxNameLocator(colItem)} />
              ))}
            </BoxGroup>
          ))}
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
