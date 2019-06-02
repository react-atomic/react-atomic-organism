import React, {memo} from 'react';
import Path from 'ricon/Path';

const keys = Object.keys;

const ArrowHead = ({multi, id, ...others}) => (
  <defs>
    {keys(multi).map(key => {
      const {d, ...props} = {...others, ...multi[key]};
      id = id + key;
      return (
        <marker id={id} key={id} {...props}>
          <Path d={d} style={Styles.path} />
        </marker>
      );
    })}
  </defs>
);

ArrowHead.defaultProps = {
  multi: {'': {}},
  id: 'marker-arrow-head',
  viewBox: '0 0 10 10',
  d: 'M 0 0 L 10 5 L 0 10 z',
  refX: 9,
  refY: 5,
  markerUnits: 'strokeWidth',
  markerWidth: 8,
  markerHeight: 6,
  orient: 'auto',
  fill: '#bbb'
};

export default memo(ArrowHead);

const Styles = {
  path: {
    strokeWidth: 1,
    strokeDasharray: '1, 0',
  },
};
