import React, { useState, useCallback } from "react";
import { mixClass, SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";

const Carousel = (props) => {
  const { hoverStyle: propsHoverStyle, className, style, ...others } = props;
  const [hoverStyle, setHoverStyle] = useState({});
  const handler = {
    enter: useCallback(() => {
      if (propsHoverStyle) {
        setHoverStyle(propsHoverStyle);
      }
    }, [propsHoverStyle]),
    leave: () => {
      setHoverStyle({});
    },
  };
  return (
    <SemanticUI
      {...others}
      className={mixClass("carousel", className)}
      style={{
        ...Styles.container,
        ...style,
        ...hoverStyle,
      }}
      onMouseEnter={handler.enter}
      onMouseLeave={handler.leave}
    />
  );
};

export default Carousel;

const Styles = {
  container: {
    display: "inline-block",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    width: "100%",
    textAlign: "center",
  },
};
