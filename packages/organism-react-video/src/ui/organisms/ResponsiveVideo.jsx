//@ts-check

import * as React from "react";
const { cloneElement } = React;
import { SemanticUI, mixClass } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";
import { useRefUpdate } from "reshow-hooks";

/**
 * @typedef {object} ResponsiveVideoProps
 * @property {string=} className
 * @property {React.CSSProperties=} style
 * @property {boolean=} mask
 * @property {string=} aspectRatio
 * @property {Function=} onClick
 * @property {React.ReactElement?} [children]
 */

/**
 * @param {ResponsiveVideoProps} props
 */
const ResponsiveVideo = ({
  mask = true,
  aspectRatio = "16/9",
  children,
  onClick,
  style,
  className,
}) => {
  const lastRestart = useRefUpdate(onClick);
  const handler = {
    click: () => callfunc(lastRestart.current),
  };
  let thisMask = null;
  if (mask) {
    thisMask = (
      <SemanticUI
        className="play-mask"
        style={Styles.mask}
        onTouchStart={handler.click}
        onClick={handler.click}
      />
    );
  }

  return (
    <SemanticUI
      className={mixClass("rwd-video", className)}
      style={{ ...Styles.container, ...style, aspectRatio }}
    >
      <SemanticUI className="rwd-video-inner" style={Styles.inner}>
        {children &&
          cloneElement(children, {
            style: {
              ...get(children, ["props", "style"]),
              ...Styles.videoContainer,
            },
          })}
      </SemanticUI>
      {thisMask}
    </SemanticUI>
  );
};

export default ResponsiveVideo;

/**
 * @type {{[key: string]: React.CSSProperties}}
 */
const Styles = {
  container: {
    position: "relative",
    overflow: "hidden",
    zIndex: 0,
  },
  inner: {
    position: "absolute",
    top: -2,
    bottom: -2,
    left: -2,
    right: -2,
    zIndex: 0,
  },
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  mask: {
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
  },
};
