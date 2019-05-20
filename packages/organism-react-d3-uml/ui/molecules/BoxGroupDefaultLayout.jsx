import React, {Children, cloneElement} from 'react';
import getOffset from 'getoffset';
import get from 'get-object-value';
import {Graph, Group, Rect, Text} from 'organism-react-graph';

import CancelButton from '../molecules/CancelButton';
import BaseLayout from '../molecules/BaseLayout';
const keys = Object.keys;

const BoxGroupHeader = ({children, x, y, width}) => (
  <Group transform="translate(0, 20)" style={Styles.boxGroupHeader}>
    <Rect x="0" y="-20" rx="5" width={width} height="20" fill="#aaa" />
    <Text y="-5" alignCenter parentWidth={width} fill="#fff">
      {children}
    </Text>
  </Group>
);

class BoxGroupDefaultLayout extends BaseLayout {
  state = {
    rectW: 0,
    rectH: 0,
    boxsPos: {},
  };

  childrenEl = {};

  getEl() {
    return this.el;
  }

  update(prevState) {
    let startY = 15;
    const boxsPos = {};
    const arrW = [0];
    const {zoomK} = this.props;
    keys(this.childrenEl).forEach(cKey => {
      const cEl = this.childrenEl[cKey].getEl();
      const {w, h} = getOffset(cEl);
      startY += h / zoomK;
      arrW.push(w);
      boxsPos[cKey] = {
        y: startY,
        w,
        h,
      };
    });
    const maxW = Math.max(...arrW);
    if (maxW > 0 && !prevState.maxW) {
      this.setState({
        maxW,
        rectW: (maxW / zoomK) + 10,
        rectH: startY + 5,
        boxsPos,
      });
    }
  }

  componentDidMount() {
    this.update({});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.update(prevState);
  }

  render() {
    const {
      id,
      className,
      showConnectPoint,
      text,
      children,
      isInsideVector,
      boxGroupAbsX,
      boxGroupAbsY,
      onGetEl,
      onMouseEnter,
      onMouseLeave,
      onDel,
      onEdit,
      zoomK,
    } = this.props;
    const {rectW, rectH, boxsPos} = this.state;
    const graphStyle = {...Styles.container};
    const graphProps = {};
    const groupProps = {};
    let atom;
    let gAtom;
    let translate;
    if (isInsideVector(this.el)) {
      atom = 'g';
      gAtom = 'g';
      graphProps.transform = `translate(${boxGroupAbsX}, ${boxGroupAbsY})`;
    } else {
      atom = 'i';
      gAtom = 'svg';
      graphStyle.transform = `translate(${boxGroupAbsX}px, ${boxGroupAbsY}px)`;
      graphStyle.width = rectW + 10;
      graphStyle.height = rectH + 10;
      groupProps.width = rectW;
      groupProps.height = rectH;
      groupProps.viewBox = `0 0 ${rectW} ${rectH}`;
    }
    const cancelButton = (
      <CancelButton
        x={-10}
        y={-10}
        onClick={e => {
          e.preventDefault();
          onDel(e);
        }}
      />
    );
    if (onEdit) {
      graphStyle.cursor = 'pointer';
    }
    return (
      <Graph
        {...graphProps}
        className={className}
        atom={atom}
        style={graphStyle}
        data-id={id}
        refCb={el => (this.el = onGetEl(el))}>
        <Group atom={gAtom} {...groupProps} style={Styles.group}>
          <Rect
            style={Styles.rect}
            rx="5"
            ry="5"
            width={rectW}
            height={rectH}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onEdit}
          />
          <BoxGroupHeader width={rectW}>{text}</BoxGroupHeader>
          {cancelButton}
          {Children.map(children, (c, ck) =>
            cloneElement(c, {
              zoomK,
              key: ck,
              x: 5,
              y: get(boxsPos, [ck, 'y'], 0),
              width: rectW,
              height: get(boxsPos, [ck, 'h'], 1) / zoomK,
              ref: el => (this.childrenEl[ck] = el),
              onClick: onEdit,
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
    position: 'absolute',
    pointerEvents: 'all',
  },
  group: {
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
