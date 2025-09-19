//@ts-check
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import build, { mergeRef } from "reshow-build";
import get from "get-object-value";

let iframeCount = 0;

/**
 * @typedef {object} IframeContainerExpose
 * @property {Function} postHeight
 * @property {function():HTMLIFrameElement} getEl
 */

/**
 * @typedef {object} IframeContainerProps
 * @property {string} [src]
 * @property {string} [messageKey]
 * @property {"eager"|"lazy"} [loading]
 * @property {string} [allow]
 * @property {Function} [onLoad]
 * @property {React.CSSProperties} [style]
 * @property {any} [refCb]
 * @property {import("reshow-build").Component} [component]
 */

/**
 * @param {IframeContainerProps} props
 */
const useIframeContainer = (props) => {
  const {
    src,
    style,
    refCb,
    messageKey = "iframeH",
    loading = "lazy",
    component = "iframe",
    ...restProps
  } = props;
  const [iframeH, setIframeH] = useState("auto");
  const thisMessageKey = /**@type any*/ (useRef());
  const lastEl = /**@type React.MutableRefObject<HTMLIFrameElement>*/ (
    useRef()
  );

  useEffect(() => {
    thisMessageKey.current = messageKey + "-" + iframeCount;
    iframeCount++;
  }, [messageKey]);

  useEffect(() => {
    const handleMessage = (/**@type MessageEvent*/ e) => {
      let data = e.data;
      if ("string" === typeof data) {
        try {
          data = JSON.parse(get(data, undefined, "{}"));
        } catch (ex) {}
      }
      const { type, h } = data;
      if (-1 !== `|${type}|`.indexOf(`|${thisMessageKey.current}|`)) {
        setIframeH(h + 50);
      }
    };
    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);
  const nextRestProps = /**@type any*/ ({ ...restProps });
  if (src) {
    nextRestProps.src = src;
  }
  if (loading) {
    nextRestProps.loading = loading;
  }

  const thisStyle = {
    ...Styles.iframe,
    height: iframeH,
    minHeight: iframeH,
    ...style,
  };

  /**
   * @type {IframeContainerExpose}
   */
  const expose = {
    postHeight: (/**@type window*/ win) => {
      setTimeout(() => {
        win?.parent?.window.postMessage(
          {
            type: thisMessageKey.current,
            h: win.document.body.offsetHeight,
          },
          "*"
        );
      });
    },
    getEl: () => lastEl.current,
  };

  const handleRefCb = (/**@type HTMLElement*/ el) => {
    return mergeRef(el, [refCb, lastEl]);
  };

  if (component === "iframe") {
    nextRestProps.ref = handleRefCb;
  } else if (refCb) {
    nextRestProps.refCb = handleRefCb;
  }

  return {
    style: thisStyle,
    restProps: nextRestProps,
    expose,
    component,
  };
};

/**
 * @type React.ForwardRefExoticComponent<?, IframeContainerProps>
 */
const IframeContainer = forwardRef((props, ref) => {
  const { style, restProps, component, expose } = useIframeContainer(props);
  useImperativeHandle(ref, () => expose, []);
  return build(component)({ ...restProps, style });
});

export default IframeContainer;

const Styles = {
  iframe: {
    width: "100%",
    border: 0,
  },
};
