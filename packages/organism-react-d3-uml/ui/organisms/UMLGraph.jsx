import React, { Component } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import { Graph, Group, Zoom } from "organism-react-graph";
import get, { getDefault } from "get-object-value";
import set from "set-object-value";
import getOffset, { mouse, getSvgMatrixXY } from "getoffset";
import callfunc from "call-func";
import { toInt } from "to-percent-js";
import { UNDEFINED } from "reshow-constant";

import ArrowHead from "../molecules/ArrowHead";
import BoxGroupDefaultLayout from "../molecules/BoxGroupDefaultLayout";
import BoxDefaultLayout from "../molecules/BoxDefaultLayout";
import BoxGroup from "../organisms/BoxGroup";
import Box from "../organisms/Box";
import Line from "../organisms/Line";
import ConnectController from "../../src/ConnectController";

const keys = Object.keys;

const HTMLGraph = (props) => <SemanticUI {...props} className="html-graph" />;

class UMLGraph extends Component {
  static defaultProps = {
    boxGroupsLocator: (d) => (d || {}).tables || [],
    boxGroupXLocator: () => {},
    boxGroupYLocator: () => {},
    boxsLocator: (d) => (d || {}).cols || [],
    uniqueBoxGroupNameLocator: (d) => d,
    boxNameLocator: (d) => ({ name: d }),
    connsLocator: (d) => d,
    connFromBoxGroupLocator: (d) => d,
    connToBoxGroupLocator: (d) => d,
    connFromBoxLocator: (d) => d,
    connToBoxLocator: (d) => d,
    arrowHeadComponent: ArrowHead,
    autoArrange: true,
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

  addLazyMoveWithMouseEvent(boxGroupName, e, dnd) {
    const vectorEl = this.getVectorEl();
    if (vectorEl) {
      let { 0: mouseX, 1: mouseY } = mouse(e, vectorEl);
      if (dnd) {
        const zoomK = this.getZoomK();
        const { fromX, fromY } = get(dnd, ["start"], {});
        if (fromX && fromY) {
          mouseX -= fromX * zoomK;
          mouseY -= fromY * zoomK;
        }
      }
      const { x, y } = this.applyXY(mouseX, mouseY);
      this.addLazyMove(boxGroupName, x, y);
      return { x, y };
    }
  }

  addLazyMove(boxGroupName, x, y) {
    this.lazyMove[boxGroupName] = { x, y };
  }

  add(payload) {
    const { onAdd } = this.props;
    callfunc(onAdd, [payload]);
  }

  addBoxGroup(obj) {
    if (!obj) {
      return;
    }
    const id = obj.getId();
    const name = obj.getName();
    this.boxGroupNameInvertMap[name] = id;
    this.boxGroupMap[id] = obj;
    keys(get(this.boxQueue[id], null, {})).forEach((boxName) => {
      const boxObj = this.boxQueue[id][boxName];
      const isAdd = this.addBox(boxObj);
    });
  }

  addBoxQueue(obj) {
    if (!obj) {
      return;
    }
    const name = obj.getName();
    const boxGroupId = obj.getBoxGroupId();
    set(this.boxQueue, [boxGroupId, name], obj);
  }

  addBox(obj) {
    if (!obj) {
      return;
    }
    const group = obj.getBoxGroup();
    if (!group) {
      this.addBoxQueue(obj);
      return;
    }
    group.addBox(obj);
    const groupId = group.getId();
    const boxName = obj.getName();
    const boxId = obj.getId();
    group.setBoxNameInvertMap(boxId, boxName);
    if (get(this.boxQueue, [groupId, boxName])) {
      delete this.boxQueue[groupId][boxName];
    }
    return true;
  }

  getLazyMoveByName(boxGroupName) {
    const xy = { ...this.lazyMove[boxGroupName] };
    if (xy) {
      delete this.lazyMove[boxGroupName];
      return xy;
    }
  }

  getLines() {
    return this.state.lines;
  }

  getBox(id, groupId) {
    const group = get(this.boxGroupMap, [groupId]);
    if (group) {
      return group.getBox(id);
    }
  }

  getBoxGroup(id) {
    return get(this.boxGroupMap, [id]);
  }

  getBoxGroupByName(name) {
    const id = this.getBoxGroupIdByName(name);
    if (id) {
      return this.getBoxGroup(id);
    }
  }

  getBoxGroupIdByName(name) {
    return get(this, ["boxGroupNameInvertMap", name]);
  }

  getBoxComponent(name, groupName) {
    const { onGetBoxComponent } = this.props;
    const component = callfunc(onGetBoxComponent, [name, groupName]);
    return component || BoxDefaultLayout;
  }

  getBoxGroupComponent(name) {
    const { onGetBoxGroupComponent } = this.props;
    const component = callfunc(onGetBoxGroupComponent, [name]);
    return component || BoxGroupDefaultLayout;
  }

  getVectorEl() {
    return this.vector;
  }

  getConnectStartPoint() {
    return this.startPoint;
  }

  getConnectEndPoint() {
    return this.endPoint;
  }

  getTransform = () => {
    if (this.zoom) {
      const t = this.zoom.getTransform();
      return t;
    }
  };

  getZoomK = () => {
    const { k } = this.getTransform() || {};
    return k || 1;
  };

  setConnectStartPoint(el) {
    this.startPoint = el;
    return this.startPoint;
  }

  setConnectEndPoint(el) {
    this.endPoint = el;
  }

  edit = (name, payload) => {
    const { onEdit } = this.props;
    callfunc(onEdit, [name, payload]);
  };

  del = (name) => {
    const { onDel } = this.props;
    callfunc(onDel, [name]);
  };

  insideHtml = (el) => this.html && this.html.contains(el);
  insideVector = (el) => this.vector && this.vector.contains(el);

  isOnGraph = (el) => {
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

  applyXY = (pX, pY, dom) => {
    if (!dom) {
      dom = this.getVectorEl();
    }
    const zoom = this.getTransform();
    const { x, y } = getSvgMatrixXY(dom, zoom)(pX, pY);
    return { x, y };
  };

  arrange() {
    const conns = this.oConn?.getUniqueFromTo();
    this.handleAutoArrange(conns);
  }

  syncPropConnects() {
    const oConn = this.oConn;
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
    conns.forEach((conn) => {
      const fromBoxGroupName = connFromBoxGroupLocator(conn);
      const fromBoxName = connFromBoxLocator(conn);
      const toBoxGroupName = connToBoxGroupLocator(conn);
      const toBoxName = connToBoxLocator(conn);
      if (!fromBoxGroupName || !fromBoxName || !toBoxGroupName || !toBoxName) {
        console.error("Sync props conns failed", [
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
      const lineId = oConn.addLine(conn); //add line will trigger box render need put before getBoxIdByName
      const fromBoxId = this.getBoxGroup(fromBoxGroupId).getBoxIdByName(
        fromBoxName
      );
      const toBoxId = this.getBoxGroup(toBoxGroupId).getBoxIdByName(toBoxName);
      const fromBox = this.getBox(fromBoxId, fromBoxGroupId);
      const toBox = this.getBox(toBoxId, toBoxGroupId);
      if (fromBox && toBox) {
        oConn.addConnected(
          lineId,
          fromBox.getFromPoint(),
          toBox.getToPoint(),
          true
        );
      }
    });
    oConn.setState();
    return oConn.getUniqueFromTo();
  }

  handleBoxGroupDragEnd = (e) => {
    const { onDragEnd } = this.props;
    callfunc(onDragEnd, [e]);
  };

  handleZoomRef = (o) => {
    if (o) {
      this.zoom = o;
    }
  };

  handleZoom = (e) => {
    const { onZoom } = this.props;
    const { transform: oTransform } = e;
    this.setState({ oTransform }, () => callfunc(onZoom, [e]));
  };

  handleLineEdit = (payload) => {
    callfunc(this.props.onLineEdit, [payload]);
  };

  handleLineDel = (payload) => {
    const isContinue = callfunc(this.props.onLineDel, [payload]);
    if (isContinue !== false) {
      this.oConn.deleteLine(payload.lineId);
    }
  };

  handleConnAdd = (payload) => {
    const { onConnAdd } = this.props;
    const from = get(payload, ["from"]).getBoxGroupName();
    const to = get(payload, ["to"]).getBoxGroupName();
    if (from && to) {
      payload.fromTo = { from, to };
    }
    callfunc(onConnAdd, [payload]);
  };

  handleConnWillAdd = (payload) => {
    const { onConnWillAdd } = this.props;
    let isContinue = true;
    if (onConnWillAdd) {
      const result = callfunc(onConnWillAdd, [payload]);
      if (UNDEFINED === typeof result) {
        console.error("onConnWillAdd should not return undefined.");
      } else {
        isContinue = result;
      }
    }
    return isContinue;
  };

  handleAutoArrange = (conns) => {
    import("../../src/dagre").then((dagreAutoLayout) => {
      dagreAutoLayout = getDefault(dagreAutoLayout);
      const newXY = dagreAutoLayout({ ...this.boxGroupMap }, conns);
      get(keys(newXY), null, []).forEach((key) => {
        const oBoxGroup = this.getBoxGroup(key);
        oBoxGroup.move(newXY[key].x, newXY[key].y);
      });
      callfunc(this.props.onLoad, [this]);
    });
  };

  componentDidMount() {
    const { autoArrange } = this.props;
    this.oConn = new ConnectController({ host: this });
    setTimeout(() => {
      const conns = this.syncPropConnects();
      if (autoArrange) {
        this.handleAutoArrange(conns);
      } else {
        callfunc(this.props.onLoad, [this]);
      }
    });
  }

  componentWillUnmount() {
    this.oConn?.clearTimeout();
  }

  render() {
    const {
      autoArrange,
      arrowHeadComponent,
      data,
      uniqueBoxGroupNameLocator,
      boxNameLocator,
      boxsLocator,
      boxGroupsLocator,
      boxGroupXLocator,
      boxGroupYLocator,
      connsLocator,
      connFromBoxGroupLocator,
      connToBoxGroupLocator,
      connFromBoxLocator,
      connToBoxLocator,
      onAdd,
      onEdit,
      onDel,
      onDragEnd,
      onConnAdd,
      onConnWillAdd,
      onLineEdit,
      onLineDel,
      onLoad,
      onGetBoxGroupComponent,
      onGetBoxComponent,
      onZoom,
      ...props
    } = this.props;
    const { lines, oTransform } = this.state;
    const { k, x, y } = oTransform || {};
    const transform = `translate(${toInt(x)}px, ${toInt(y)}px) scale(${k})`;
    return (
      <SemanticUI
        className="d3-uml"
        style={Styles.container}
        refCb={(el) => (this.zoomEl = el)}
      >
        <Graph refCb={(el) => (this.vector = el)} {...props} style={Styles.svg}>
          <Zoom
            onGetEl={() => this.zoomEl}
            ref={this.handleZoomRef}
            onZoom={this.handleZoom}
          >
            {build(arrowHeadComponent)()}
            {(() => {
              const arrLineEl = [];
              let hoverLineEl;
              keys(lines).forEach((key) => {
                const { hover, ...lineProps } = lines[key];
                const lineEl = (
                  <Line {...lineProps} id={key} key={key} host={this} />
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
          style={{ ...Styles.htmlGraph, transform }}
          refCb={(el) => (this.html = el)}
        >
          {(boxGroupsLocator(data) || []).map((item) => {
            const bgName = uniqueBoxGroupNameLocator(item);
            return !bgName.name ? null : (
              <BoxGroup
                ref={(el) => this.addBoxGroup(el)}
                host={this}
                key={"box-group-" + bgName.name}
                onEdit={this.edit}
                onDel={this.del}
                onDragEnd={this.handleBoxGroupDragEnd}
                x={boxGroupXLocator(item)}
                y={boxGroupYLocator(item)}
                {...bgName}
              >
                {boxsLocator(item).map((colItem, colKey) => (
                  <Box
                    host={this}
                    key={"box-" + colKey}
                    boxGroupName={bgName.name}
                    {...boxNameLocator(colItem)}
                  />
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
    overflow: "hidden",
    width: "100%",
    height: "100%",
    minHeight: 100,
    position: "relative",
  },
  svg: {
    cursor: "grabbing",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  htmlGraph: {
    pointerEvents: "none",
    transformOrigin: "0 0",
    width: "100%",
    height: "100%",
  },
};
