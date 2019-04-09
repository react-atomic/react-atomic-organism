import React, {Children, cloneElement} from 'react';
import getOffset from 'getoffset';
import get from 'get-object-value';
import {Group, Rect, Text} from 'organism-react-graph';

import BaseBoxGroup from '../organisms/BaseBoxGroup';
const keys = Object.keys;

const BoxGroupHeader = ({children, x, y, width}) => (
  <Group transform="translate(0, 20)" style={Styles.boxGroupHeader}>
    <Rect x="0" y="-20" rx="5" width={width} height="20" fill="#aaa" />
    <Text y="-5" alignCenter parentWidth={width} fill="#fff">
      {children}
    </Text>
  </Group>
);

class BoxGroupDefaultLayout extends BaseBoxGroup {
  state = {
    rectW: 0,
    rectH: 0,
    boxsPos: {},
  };
  childrenEl = {};

  getWH() {
    const {rectW: width, rectH: height} = this.state;
    return {width, height};
  }

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
      const cEl = this.childrenEl[cKey];
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
    const {name, children, boxGroupId, host, data, absX, absY} = this.props;
    const {rectW, rectH, boxsPos} = this.state;
    const translate = `translate(${absX}, ${absY})`;
    return (
      <Group transform={translate} refCb={el => (this.el = el)}>
        <Rect style={Styles.rect} rx="5" ry="5" width={rectW} height={rectH} refCb={el => this.rect=el}/>
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
            refCb: el => (this.childrenEl[ck] = el),
          }),
        )}
      </Group>
    );
  }
}

export default BoxGroupDefaultLayout;

const Styles = {
  rect: {
    stroke: '#999',
    fill: '#fff',
  },
  boxGroupHeader: {
    pointerEvents: 'none',
  },
};
