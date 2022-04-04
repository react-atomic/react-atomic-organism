import React, { PureComponent } from "react";
import { Field } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";

class OnEnterInput extends PureComponent {
  static defaultProps = {
    atom: "input",
  };

  handleEnter = (e) => {
    const { onEnter } = this.props;
    const keyCode = get(e, ["keyCode"]);
    const key = get(e, ["key"]);
    switch (keyCode || key) {
      case "Enter":
      case 13:
        e.component = this;
        e.preventDefault();
        callfunc(onEnter, [e]);
        break;
    }
  };

  render() {
    const { onEnter, ...otherProps } = this.props;
    return <Field onKeyDown={this.handleEnter} {...otherProps} />;
  }
}

export default OnEnterInput;
