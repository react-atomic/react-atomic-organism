import React from "react";
import { Group, Text, Rect } from "organism-react-graph";

import BaseLayout from "../molecules/BaseLayout";

class BoxDefaultLayout extends BaseLayout {
  getEl() {
    return this.el;
  }

  handleEl = (el) => {
    if (el) {
      this.el = el;
    }
  };

  render() {
    const { connectPointComponent, text, x, y, width, ...props } = this.props;
    const cy = -5;
    const connectPoints = [
      connectPointComponent({
        key: "left",
        cy,
        cx: -12,
      }),
      connectPointComponent({
        key: "right",
        cy,
        cx: width + 2,
      }),
    ];
    const translate = `translate(${x}, ${y})`;
    return (
      <Group transform={translate}>
        <Text {...props} refCb={this.handleEl}>
          {text}
        </Text>
        {connectPoints}
      </Group>
    );
  }
}

export default BoxDefaultLayout;
