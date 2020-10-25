import React, { Children, PureComponent } from "react";
import callfunc from "call-func";
import Change from "../organisms/Change";

class Replace extends PureComponent {
  static defaultProps = {
    interval: 5000,
  };

  state = {
    no: 0,
    childs: {},
  };

  handleNext = () => {
    if (this._time) {
      clearTimeout(this._time);
    }
    const { interval } = this.props;
    this.setState(({ no, childs }) => {
      no++;
      if (no >= childs.length) {
        no = 0;
      }
      return { no };
    });
    this._time = setTimeout(this.handleNext, interval);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { children } = nextProps;

    if (children === prevState.prevChildren) {
      return null;
    }

    const childs = [];
    Children.map(children, (c) => c).forEach(
      (child, key) => (childs[key] = child)
    );
    return {
      childs,
      prevChildren: children,
    };
  }

  componentDidMount() {
    if (this._time) {
      clearTimeout(this._time);
    }
    const { interval } = this.props;
    this._time = setTimeout(this.handleNext, interval);
  }

  componentWillUnmount() {
    clearTimeout(this._time);
    this._time = null;
  }

  render() {
    const { interval, ...props } = this.props;
    const { no, childs } = this.state;
    return <Change {...props}>{childs[no]}</Change>;
  }
}

export default Replace;
