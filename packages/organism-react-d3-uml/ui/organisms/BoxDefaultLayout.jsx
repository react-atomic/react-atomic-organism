import React from 'react';
import {Group, Text, Rect} from 'organism-react-graph';

import BaseBoxComponent from '../organisms/BaseBoxComponent';
import ConnectPoint from '../organisms/ConnectPoint';

class BoxDefaultLayout extends BaseBoxComponent {
  getEl() {
    return this.el;
  }
  render() {
    const {
      id,
      boxGroupId,
      boxGroupAbsX,
      boxGroupAbsY,
      text,
      host,
      x,
      y,
      width,
      height,
      onPointDragStart,
      onPointMount,
      showConnectPoint,
      ...props
    } = this.props;
    const cy = -(height / 2 - 5);
    const connectPoints = [
      <ConnectPoint
        boxId={id}
        boxGroupId={boxGroupId}
        boxGroupAbsX={boxGroupAbsX}
        boxGroupAbsY={boxGroupAbsY}
        show={showConnectPoint}
        host={host}
        key="left"
        cy={cy}
        cx={-12}
        onDragStart={onPointDragStart}
        onMount={onPointMount}
      />,
      <ConnectPoint
        boxId={id}
        boxGroupId={boxGroupId}
        boxGroupAbsX={boxGroupAbsX}
        boxGroupAbsY={boxGroupAbsY}
        show={showConnectPoint}
        host={host}
        key="right"
        cx={width + 12}
        cy={cy}
        onDragStart={onPointDragStart}
        onMount={onPointMount}
      />,
    ];
    const translate = `translate(${x}, ${y})`;
    return (
      <Group
        refCb={el => this.el = el}
        transform={translate}>
        <Text {...props}>{text}</Text>
        {connectPoints}
      </Group>
    );
  }
}

export default BoxDefaultLayout;
