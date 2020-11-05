import React from "react";
import { Line as LineGraph, Group } from "organism-react-graph";
import { build } from "react-atomic-molecule";

import CancelButton from "../molecules/CancelButton";
import BaseLayout from "../molecules/BaseLayout";

class LineDefaultLayout extends BaseLayout {
  static defaultProps = {
    markerEnd: "url(#marker-arrow-head)",
  };

  getEl() {
    return this.el;
  }

  getLinePoint(len, maxPercent) {
    const lEl = this.lineEl;
    if (lEl) {
      const totalLen = lEl.getTotalLength();
      const pcntLen = Math.floor((maxPercent * totalLen) / 100);
      const thisLen = len > pcntLen ? pcntLen : len;
      return this.lineEl.getPointAtLength(thisLen);
    }
  }

  handleEl = (el) => {
    this.el = el;
  };

  handleLineEl = (el) => {
    this.lineEl = el;
  };

  render() {
    const {
      id,
      start,
      end,
      from,
      to,
      isHover,
      onMouseEnter,
      onMouseLeave,
      onDeleteButtonClick,
      onClick,
      ...other
    } = this.props;
    let area = null;
    let cancelButton = null;
    let areaStyle = Styles.area;
    let isShowedCancel = false;
    const { x: centerX, y: centerY } = this.getLinePoint(50, 50) || start;
    const compLine = build(<LineGraph start={start} end={end} curve={true} />);
    if (from && to) {
      if (isHover) {
        areaStyle = { ...areaStyle, ...Styles.hover };
        isShowedCancel = true;
      }
      cancelButton = (
        <CancelButton
          x={centerX}
          y={centerY}
          onClick={onDeleteButtonClick}
          show={isShowedCancel}
        />
      );
      area = compLine({
        onClick,
        style: areaStyle,
        className: "area",
      });
    }
    return (
      <Group
        name={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        refCb={this.handleEl}
      >
        {compLine({
          ...other,
          refCb: this.handleLineEl,
          className: "line",
          style: Styles.line,
        })}
        {area}
        {cancelButton}
      </Group>
    );
  }
}

export default LineDefaultLayout;

const Styles = {
  line: {
    stroke: "#bbb",
    strokeWidth: 1.5,
    fill: "none",
  },
  area: {
    strokeLinecap: "round",
    stroke: "#999",
    strokeWidth: 15,
    strokeOpacity: 0,
    fill: "none",
    cursor: "default",
  },
  hover: {
    strokeOpacity: ".1",
  },
};
