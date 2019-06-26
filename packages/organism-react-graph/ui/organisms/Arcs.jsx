import React, {PureComponent} from 'react';
import {arc} from 'd3-lib';
import get from 'get-object-value';

import Group from '../molecules/Group';
import Path from '../molecules/Path';

class Arcs extends PureComponent {

  render() {
    const {
      innerRadius,
      outerRadius,
      cornerRadius,
      startAngle,
      endAngle,
      angles,
      children,
      groupProps,
      ...props
    } = this.props;


    const angleData = angles ? angles : [{startAngle, endAngle}];

    const data = arc(
      angleData,
      innerRadius,
      outerRadius,
      cornerRadius,
    );

    return (
      <Group className="arcs">
      {data.items.map((item, key) => 
        <Group className="arc" {...groupProps} key={key}>
          <Path {...props} d={item.path} />
          {children}
        </Group>
      )}
      </Group>
    );
  }
}

export default Arcs;
