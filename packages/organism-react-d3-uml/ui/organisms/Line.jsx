import React, {PureComponent} from 'react';
import {Line as LineGraph, Area, Group} from 'organism-react-graph';

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
    const {onClick} = this.props;
    onClick(this);
  };

  getName() {
    return this.props.name;
  }

  getFromTo() {
    const {from, to} = this.props;
    return {from, to};
  }

  render() {
    const {start, end, from, to, host, onClick, ...props} = this.props;
    const {isHover} = this.state;
    const areaSize = 1;
    let area = null;
    let cancelButton = null;
    let areaStyle = Styles.area;
    let isShowedCancel = false;
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
      area = (
        <Area
          data={[{x: start.x + 15, y: start.y}, {x: end.x - 15, y: end.y}]}
          xLocator={d => d.x}
          y0Locator={d => d.y + areaSize}
          y1Locator={d => d.y - areaSize}
          style={areaStyle}
          onClick={this.handleClick}
        />
      );
    }
    return (
      <Group>
        <LineGraph
          {...props}
          start={start}
          end={end}
          curve={true}
          style={Styles.line}
        />
        <Group
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
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
    strokeLinejoin: 'round',
    stroke: '#000',
    strokeWidth: 15,
    strokeOpacity: 0,
    fill: 'none',
  },
  hover: {
    strokeOpacity: '.1',
  },
};
