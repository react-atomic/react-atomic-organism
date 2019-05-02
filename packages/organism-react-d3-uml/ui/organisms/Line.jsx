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
    const {host, id} = this.props;
    host.oConn.deleteLine(id);
  };

  handleClick = e => {
    e.preventDefault();
    const {onClick, host, id: lineId} = this.props;
    onClick({
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
    const {props, init, host, onClick, component, ...other} = this.props;
    const {isHover} = this.state;
    return build(component)({
      ...other,
      isHover,
      onClick: this.handleClick,
      onCancelButtonClick: this.handleCancelButtonClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    });
  }
}

export default Line;
