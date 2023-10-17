//@ts-check
import build from "reshow-build";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import get from "get-object-value";

let iframeCount = 0;

/**
 * @typedef {object} IframeContainerProps
 * @property {string} [src]
 * @property {string} [messageKey]
 * @property {string} [loading]
 * @property {string} [allow]
 * @property {Function} [onLoad]
 * @property {React.CSSProperties} [style]
 * @property {any} [ref]
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
    messageKey = "iframeH",
    loading = "lazy",
    component = "iframe",
    ...restProps
  } = props;
  const [iframeH, setIframeH] = useState("auto");
  const thisMessageKey = /**@type any*/ (useRef());

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
  };

  return {
    style: thisStyle,
    restProps: nextRestProps,
    expose,
    component,
  };
};

/**
 * @type React.FC<IframeContainerProps>
 */
const IframeContainer = forwardRef((props, ref) => {
  const { style, restProps, component, expose } = useIframeContainer(props);
  useImperativeHandle(ref, () => expose, []);
  if (component === "iframe") {
    restProps.ref = restProps.refCb || ref;
    delete restProps.refCb;
  }
  return build(component)({ ...restProps, style });
});

export default IframeContainer;

const Styles = {
  iframe: {
    width: "100%",
    border: 0,
  },
};
