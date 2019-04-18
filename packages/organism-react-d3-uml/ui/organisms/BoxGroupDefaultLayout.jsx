import React, {Children, cloneElement} from 'react';
import getOffset from 'getoffset';
import get from 'get-object-value';
import {Graph, Group, Rect, Text} from 'organism-react-graph';

import BaseBoxComponent from '../organisms/BaseBoxComponent';
const keys = Object.keys;

const BoxGroupHeader = ({children, x, y, width}) => (
  <Group transform="translate(0, 20)" style={Styles.boxGroupHeader}>
    <Rect x="0" y="-20" rx="5" width={width} height="20" fill="#aaa" />
    <Text y="-5" alignCenter parentWidth={width} fill="#fff">
      {children}
    </Text>
  </Group>
);

class BoxGroupDefaultLayout extends BaseBoxComponent {
  state = {
    rectW: 0,
    rectH: 0,
    boxsPos: {},
  };
  childrenEl = {};

  getEl() {
    return this.rect;
  }

  componentDidMount() {
    const el = this.el;
    const offset = getOffset(el);
    const {w, h} = offset;
    let startY = 20;
    const boxsPos = {};
    keys(this.childrenEl).forEach(cKey => {
      const cEl = this.childrenEl[cKey].getEl();
      const cElOffset = getOffset(cEl);
      startY += cElOffset.h;
      boxsPos[cKey] = {
        y: startY,
        w: cElOffset.w,
        h: cElOffset.h,
      };
    });
    this.setState({
      rectW: w + 10,
      rectH: startY + 5,
      boxsPos,
    });
  }

  render() {
    const {
      svg,
      className,
      onMouseEnter,
      onMouseLeave,
      showConnectPoint,
      name,
      children,
      boxGroupId,
      host,
      data,
      absX,
      absY,
    } = this.props;
    const {rectW, rectH, boxsPos} = this.state;
    const translate = `translate(${absX}px, ${absY}px)`;
    const graphStyle = {...Styles.container};
    const groupStyle = {};
    if (host.insideVector(this.el)) {
      groupStyle.transform = translate;
    } else {
      graphStyle.transform = translate;
    }
    const atom = svg ? 'g' : 'svg';
    return (
      <Graph
        className={className}
        atom={atom}
        style={graphStyle}
        refCb={el => (this.el = el)}>
        <Group style={groupStyle}>
          <Rect
            style={Styles.rect}
            rx="5"
            ry="5"
            width={rectW}
            height={rectH}
            refCb={el => (this.rect = el)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
          <BoxGroupHeader width={rectW}>{name}</BoxGroupHeader>
          {Children.map(children, (c, ck) =>
            cloneElement(c, {
              boxGroupId,
              key: ck,
              pos: translate,
              host,
              x: 5,
              y: get(boxsPos, [ck, 'y'], 0),
              width: get(boxsPos, [ck, 'w'], 0),
              height: get(boxsPos, [ck, 'h'], 0),
              ref: el => (this.childrenEl[ck] = el),
            }),
          )}
        </Group>
      </Graph>
    );
  }
}

export default BoxGroupDefaultLayout;

const Styles = {
  container: {
    width: 100,
    position: 'absolute',
    pointerEvents: 'all',
    overflow: 'visible',
  },
  rect: {
    stroke: '#999',
    fill: '#fff',
  },
  boxGroupHeader: {
    pointerEvents: 'none',
  },
};
