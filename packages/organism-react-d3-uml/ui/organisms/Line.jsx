import React, {PureComponent} from 'react';
import {build} from 'react-atomic-molecule';
import {Line as LineGraph, Group} from 'organism-react-graph';

import CancelButton from '../organisms/CancelButton';

class Line extends PureComponent {
  static defaultProps = {
    markerEnd: 'url(#marker-arrow-head)',
  };

  state = {
    isHover: false,
  };

  handleMouseEnter = e => {
    this.setState({
      isHover: true,
    });
  };

  handleMouseLeave = e => {
    this.setState({
      isHover: false,
    });
  };

  handleClickCancelBtn = e => {
    e.preventDefault();
    const {host, name} = this.props;
    host.oConn.deleteLine(name);
  };

  handleClick = e => {
    e.preventDefault();
    const {onClick, host, name: lineName} = this.props;
    onClick({
      ref: this,
      lineName,
      lineData: host.oConn.getLine(lineName),
    });
  };

  getName() {
    return this.props.name;
  }

  getFromTo() {
    const {from, to} = this.props;
    return {from, to};
  }

  render() {
    const {
      props,
      name,
      start,
      center,
      end,
      from,
      to,
      init,
      host,
      onClick,
      ...other
    } = this.props;
    const {isHover} = this.state;
    const areaSize = 1;
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
          onClick={this.handleClickCancelBtn}
          show={isShowedCancel}
        />
      );
      area = compLine({
        style: areaStyle,
        onClick: this.handleClick,
        className: 'area',
      });
    }
    return (
      <Group name={name} onMouseEnter={this.handleMouseEnter}>
        {compLine({
          ...other,
          className: 'line',
          style: Styles.line,
        })}
        <Group onMouseLeave={this.handleMouseLeave}>
          {area}
          {cancelButton}
        </Group>
      </Group>
    );
  }
}

export default Line;

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
