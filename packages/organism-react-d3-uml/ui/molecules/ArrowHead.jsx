import React from 'react'
import Path from 'ricon/Path'

const ArrowHead = props =>
<defs>
  <marker {...props}>
    <Path d="M 0 0 L 10 5 L 0 10 z" style={Styles.path} />
  </marker>
</defs>

ArrowHead.defaultProps = {
  id: 'marker-arrow-head',
  viewBox: '0 0 10 10',
  refX: 9,
  refY: 5,
  markerUnits: 'strokeWidth',
  markerWidth: 8,
  markerHeight: 6,
  orient: 'auto'
}

export default ArrowHead

const Styles = {
  path: {
    strokeWidth: 1,
    strokeDasharray: '1, 0'
  }
}
