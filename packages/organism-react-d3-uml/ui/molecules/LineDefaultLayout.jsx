import React from 'react';
import {Line as LineGraph, Group} from 'organism-react-graph';
import {build} from 'react-atomic-molecule';

import CancelButton from '../molecules/CancelButton';
import BaseLayout from '../molecules/BaseLayout';

class LineDefaultLayout extends BaseLayout {
  static defaultProps = {
    markerEnd: 'url(#marker-arrow-head)',
  };

  getEl() {
    return this.el;
  }

  render() {
    const {
      name,
      start,
      end,
      from,
      to,
      isHover,
      onMouseEnter,
      onMouseLeave,
      onCancelButtonClick,
      onClick,
      ...other
    } = this.props;
    let area = null;
    let cancelButton = null;
    let areaStyle = Styles.area;
    let isShowedCancel = false;
    const compLine = build(<LineGraph start={start} end={end} curve={true} />);
    if (from && to) {
      if (isHover) {
        areaStyle = {...areaStyle, ...Styles.hover};
        isShowedCancel = true;
      }
      cancelButton = (
        <CancelButton
          x={start.x}
          y={start.y}
          onClick={onCancelButtonClick}
          show={isShowedCancel}
        />
      );
      area = compLine({
        onClick,
        style: areaStyle,
        className: 'area',
      });
    }
    return (
      <Group
        name={name}
        onMouseEnter={onMouseEnter}
        refCb={el => (this.el = el)}>
        {compLine({
          ...other,
          className: 'line',
          style: Styles.line,
        })}
        <Group onMouseLeave={onMouseLeave}>
          {area}
          {cancelButton}
        </Group>
      </Group>
    );
  }
}

export default LineDefaultLayout;

const Styles = {
  line: {
    stroke: '#333',
    strokeWidth: 1.5,
    fill: 'none',
  },
  area: {
    strokeLinecap: 'round',
    stroke: '#333',
    strokeWidth: 15,
    strokeOpacity: 0,
    fill: 'none',
  },
  hover: {
    strokeOpacity: '.1',
  },
};
