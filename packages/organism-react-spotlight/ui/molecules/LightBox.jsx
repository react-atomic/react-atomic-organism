import React from "react";
import { mixClass, reactStyle, SemanticUI } from "react-atomic-molecule";
import { PopupFloatEl } from "organism-react-popup";
import getOffset from "getoffset";
import { isFixed } from "get-window-offset";
import arrayMerge from "array.merge";

class LightBox extends PopupFloatEl {
  static defaultProps = {
    padding: 5,
  };

  calPos = () => {
    const { targetEl, padding } = this.props;
    const pos = getOffset(targetEl, isFixed(targetEl));
    const width = pos.right - pos.left + padding * 2;
    const height = pos.bottom - pos.top + padding * 2;
    const top = pos.top - padding;
    const left = pos.left - padding;
    return {
      top,
      left,
      width,
      height,
    };
  };

  renderOverlay(props) {
    const { wh, styles, style, className, ...others } = props;
    const thisStyles = arrayMerge(
      reactStyle(
        {
          ...Styles.container,
          ...style,
        },
        null,
        false
      ),
      styles
    );
    const classes = mixClass(props.name, className, "react-spotlight-box");
    return <SemanticUI {...others} className={classes} styles={thisStyles} />;
  }
}
LightBox.displayName = "LightBox";

const Styles = {
  container: {
    borderRadius: 4,
    position: "absolute",
    boxShadow: ["0 2px 15px rgba(0,0,0,.4)"],
    zIndex: 99998,
    backgroundColor: "rgba(255,255,255,.9)",
  },
};

export default LightBox;
