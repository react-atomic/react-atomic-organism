import React, {PureComponent} from 'react';
import {build} from 'react-atomic-molecule';

import LineDefaultLayout from '../molecules/LineDefaultLayout';

class Line extends PureComponent {
  static defaultProps = {
    component: LineDefaultLayout,
  };

  state = {
    isHover: false,
  };

  handleMouseEnter = e => {
    const {host, id} = this.props;
    if (!host.getConnectStartPoint()) {
      this.setState(
        {
          isHover: true,
        },
        () => host.oConn.updateLine(id, {hover: true}),
      );
    }
  };

  handleMouseLeave = e => {
    const {host, id} = this.props;
    if (!host.getConnectStartPoint()) {
      this.setState(
        {
          isHover: false,
        },
        () => host.oConn.updateLine(id, {hover: false}),
      );
    }
  };

  handleCancelButtonClick = e => {
    e.preventDefault();
    const {host, id: lineId} = this.props;
    host.handleLineDel({
      ref: this,
      lineId,
      lineData: host.oConn.getLine(lineId),
    });
  };

  handleClick = e => {
    e.preventDefault();
    const {host, id: lineId} = this.props;
    host.handleLineEdit({
      ref: this,
      lineId,
      lineData: host.oConn.getLine(lineId),
    });
  };

  getId() {
    return this.props.id;
  }

  getFromTo() {
    const {from, to} = this.props;
    return {from, to};
  }

  render() {
    const {start, props, init, host, component, ...other} = this.props;
    const {isHover} = this.state;
    if (!start) {
      return null;
    }
    return build(component)({
      ...other,
      start,
      isHover,
      onClick: this.handleClick,
      onCancelButtonClick: this.handleCancelButtonClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    });
  }
}

export default Line;
