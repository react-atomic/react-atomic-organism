import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import get from "get-object-value";
import { SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";

let iframeCount = 0;

const IframeContainer = forwardRef((props, ref) => {
  const { src, style, messageKey, ...others } = props;
  const [iframeH, setIframeH] = useState("auto");
  const thisMessageKey = useRef();
  const thisStyle = useRef();
  useImperativeHandle(ref, () => ({
    postHeight: (win) => {
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
  }));
  useEffect(() => {
    thisMessageKey.current = messageKey + "-" + iframeCount;
    iframeCount++;
    const handleMessage = (e) => {
      let data = e.data;
      if ("string" === typeof data) {
        try {
          data = JSON.parse(get(data, null, "{}"));
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
  if (src) {
    others.src = src;
  }
  thisStyle.current = {
    ...Styles.iframe,
    height: iframeH,
    minHeight: iframeH,
    ...style,
  };
  return <SemanticUI {...others} style={thisStyle.current} atom="iframe" />;
});

IframeContainer.defaultProps = {
  messageKey: "iframeH",
};

export default IframeContainer;

const Styles = {
  iframe: {
    width: "100%",
    border: 0,
  },
};
