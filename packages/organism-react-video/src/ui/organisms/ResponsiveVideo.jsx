//@ts-check

import * as React from "react";
const { cloneElement } = React;
import { SemanticUI } from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";
import { useRefUpdate } from "reshow-hooks";

/**
 * @typedef {object} ResponsiveVideoProps
 * @property {boolean=} mask
 * @property {boolean=} showControllBar
 * @property {number=} corp
 * @property {Function=} restart
 * @property {React.ReactElement?} [children]
 */

/**
 * @param {ResponsiveVideoProps} props
 */
const ResponsiveVideo = ({
  mask = true,
  showControllBar = false,
  corp,
  children,
  restart,
}) => {
  corp = corp ?? 23;
  const lastRestart = useRefUpdate(restart);
  const handler = {
    touch: () => callfunc(lastRestart.current),
  };
  let thisMask = null;
  if (mask) {
    thisMask = (
      <SemanticUI
        className="play-mask"
        style={Styles.mask}
        onTouchStart={handler.touch}
        onTouchEnd={handler.touch}
        onClick={handler.touch}
      />
    );
  }

  const showControllBarStyle = {};
  if (showControllBar) {
    showControllBarStyle["marginBottom"] = -corp + "vw";
  } else {
    showControllBarStyle["marginBottom"] = -(corp * 2) + "vw";
  }

  return (
    <SemanticUI className="rwd-video" style={Styles.container}>
      <SemanticUI
        className="rwd-video-inner"
        style={{ ...Styles.inner, ...showControllBarStyle }}
      >
        {children &&
          cloneElement(children, {
            style: {
              ...get(children, ["props", "style"]),
              ...Styles.videoContainer,
              margin: `-${corp}vw 0`,
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
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    padding: "0 0 100%",
    height: 0,
    overflow: "hidden",
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
