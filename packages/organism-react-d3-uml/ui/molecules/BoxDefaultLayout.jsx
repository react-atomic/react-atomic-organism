import React from 'react';
import {Group, Text, Rect} from 'organism-react-graph';

import BaseLayout from '../molecules/BaseLayout';

class BoxDefaultLayout extends BaseLayout {
  getEl() {
    return this.el;
  }
  render() {
    const {
      connectPointComponent,
      text,
      x,
      y,
      width,
      height,
      ...props
    } = this.props;
    const cy = -(height / 2 - 5);
    const connectPoints = [
      connectPointComponent({
        key: 'left', 
        cy,
        cx: -12,
      }),
      connectPointComponent({
        key: 'right', 
        cy,
        cx: width + 12,
      }),
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
