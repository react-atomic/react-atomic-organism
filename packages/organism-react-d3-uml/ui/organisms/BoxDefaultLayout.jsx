import React from 'react';
import {Group, Text, Rect} from 'organism-react-graph';

import BaseBoxComponent from '../organisms/BaseBoxComponent';
import ConnectPoint from '../organisms/ConnectPoint';
import ConnectPointDefaultLayout from '../organisms/ConnectPointDefaultLayout';

class BoxDefaultLayout extends BaseBoxComponent {
  getEl() {
    return this.el;
  }
  render() {
    const {
      box,
      pos,
      name,
      host,
      x,
      y,
      width,
      height,
      boxGroupId,
      showConnectPoint,
      ...props
    } = this.props;
    const cy = -(height / 2 - 5);
    const connectPoints = [
      <ConnectPoint
        box={box}
        show={showConnectPoint}
        pos={pos}
        host={host}
        key="left"
        cy={cy}
        cx={-12}
        component={ConnectPointDefaultLayout}
        onShow={box.setIsConnectPointDrag}
      />,
      <ConnectPoint
        box={box}
        show={showConnectPoint}
        pos={pos}
        host={host}
        key="right"
        cx={width + 12}
        cy={cy}
        component={ConnectPointDefaultLayout}
        onShow={box.setIsConnectPointDrag}
      />,
    ];
    const translate = `translate(${x}, ${y})`;
    return (
      <Group
        refCb={el => this.el = el}
        transform={translate}>
        <Text {...props}>{name}</Text>
        {connectPoints}
      </Group>
    );
  }
}

export default BoxDefaultLayout;
