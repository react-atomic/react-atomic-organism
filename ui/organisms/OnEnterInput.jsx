import React, { PureComponent } from "react";
import { Field } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc, { getEventKey } from "call-func";

class OnEnterInput extends PureComponent {
  static defaultProps = {
    atom: "input",
  };

  handleEnter = (e) => {
    const { onEnter } = this.props;
    switch (getEventKey(e)) {
      case 13:
      case "Enter":
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
