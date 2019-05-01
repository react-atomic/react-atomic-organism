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
    const {host, name} = this.props;
    this.setState(
      {
        isHover: true,
      },
      () => host.oConn.updateLine(name, {hover: true}),
    );
  };

  handleMouseLeave = e => {
    const {host, name} = this.props;
    this.setState(
      {
        isHover: false,
      },
      () => host.oConn.updateLine(name, {hover: false}),
    );
  };

  handleCancelButtonClick = e => {
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
