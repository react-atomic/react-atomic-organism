import React from "react";
import { SemanticUI } from "react-atomic-molecule";
import { PopupFloatEl } from "organism-react-popup";
import { alignUI, getPositionString } from "get-window-offset";

import Icon from "ricon/Pulse";

const GROUP_KEY = "react-onboarding";
class Beacon extends PopupFloatEl {
  static defaultProps = {
    className: GROUP_KEY + "-beacon",
    group: GROUP_KEY,
    name: GROUP_KEY + "-beacon",
  };

  calPos = () => {
    const { targetEl } = this.props;
    const floatEl = this.getFloatEl();
    const info = alignUI(targetEl, this.floatEl, "cc", true);
    const { move } = info;
    const result = {
      top: move[1],
      left: move[0],
    };
    return result;
  };

  renderOverlay(props) {
    const { targetEl, style, ...others } = props;
    let thisStyle = {
      ...style,
      ...Styles.container,
    };

    return (
      <SemanticUI {...others} style={thisStyle}>
        <Icon animation="breath" />
      </SemanticUI>
    );
  }
}

export default Beacon;

const Styles = {
  container: {
    pointerEvents: "none",
    position: "absolute",
    display: "block",
    zIndex: 99999,
  },
};
