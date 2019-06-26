import React, {PureComponent} from 'react';
import {arc} from 'd3-lib';
import get from 'get-object-value';

import Group from '../molecules/Group';
import Path from '../molecules/Path';

class Arc extends PureComponent {
  render() {
    const {
      innerRadius,
      outerRadius,
      cornerRadius,
      startAngle,
      endAngle,
      children,
      groupProps,
      ...props
    } = this.props;

    const angleData = [{startAngle, endAngle}];
    const data = arc(angleData, innerRadius, outerRadius, cornerRadius);
    const d = get(data, ['items', 0, 'path']);

    return (
      <Group className="arc" {...groupProps}>
        <Path {...props} d={d} />
        {children}
      </Group>
    );
  }
}

export default Arc;
