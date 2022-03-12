import React, { PureComponent } from "react";
import { build, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";

import { i13nDispatch } from "../../src/index";

class I13nClick extends PureComponent {
  static defaultProps = {
    component: SemanticUI,
  };

  handleClick = (e) => {
    const { onClick, I13N } = this.props;
    callfunc(onClick, [e]);
    i13nDispatch({
      type: "action",
      params: { I13N },
    });
  };

  render() {
    const { component, onClick, I13N, ...others } = this.props;
    others.onClick = this.handleClick;

    return build(component)(others);
  }
}

export default I13nClick;
