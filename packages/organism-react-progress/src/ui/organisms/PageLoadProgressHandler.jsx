//@ts-check

import * as React from "react";
const { forwardRef, useEffect, useMemo, useImperativeHandle } = React;
import { mergeDefaultValue, Progress } from "react-atomic-molecule";
import Return from "reshow-return";
import { DisplayPopupEl } from "organism-react-popup";

import useProgress from "../../useProgress";

const displayName = "PageLoadProgress";

/**
 * @typedef {object} StoreProps
 * @property {import("reshow-flux-base").StoreObject} store
 */

/**
 * @typedef {object} PageLoadProgressProps
 * @property {string} [name=null]
 * @property {boolean} [isFloat=null]
 * @property {boolean} [ajax=null]
 * @property {number} [delay=null]
 * @property {number} [zIndex=null]
 * @property {Object} [barProps=null]
 * @property {Object} [ref=null]
 * @property {string} [isRunningKey]
 */

/**
 * @type React.FC<PageLoadProgressProps>
 */
const PageLoadProgress = forwardRef((props, ref) => {
  const {
    name = displayName,
    zIndex = 1,
    isFloat = true,
    ajax = false,
    isRunningKey = "isRunning",
    barProps = {},
    delay,
  } = props || {};

  const isRunning = props[isRunningKey];
  const { expose, opacity, percent } = useProgress(delay);
  useImperativeHandle(ref, () => expose, []);

  useEffect(() => {
    if (ajax && null != isRunning) {
      if (isRunning) {
        expose.start(90);
      } else {
        expose.complete();
      }
    }
  }, [isRunning]);

  return useMemo(() => {
    const bar = (
      <Progress
        style={{
          ...Styles.progress,
          opacity,
          zIndex,
        }}
        barProps={mergeDefaultValue(barProps, { style: Styles.bar })}
        percent={percent}
        name={name}
      />
    );
    if (isFloat) {
      return <DisplayPopupEl>{bar}</DisplayPopupEl>;
    } else {
      return bar;
    }
  }, [opacity, percent]);
});

PageLoadProgress.displayName = displayName;

/**
 * @type React.FC<PageLoadProgressProps&StoreProps>
 */
const PageLoadProgressHandler = forwardRef(
  ({ store, isRunningKey = "isRunning", ...props }, ref) => (
    <Return store={store} initStates={[isRunningKey]}>
      <PageLoadProgress {...props} ref={ref} />
    </Return>
  )
);

PageLoadProgressHandler.displayName = "PageLoadProgressHandler";

export default PageLoadProgressHandler;

const Styles = {
  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    transition: ["opacity 500ms linear"],
  },
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: 2,
    display: "inline-block",
    background: "#0969da",
    transition: ["width 500ms ease"],
    boxShadow: ["0 0 10px rgba(119,182,255,0.7)"],
  },
};
