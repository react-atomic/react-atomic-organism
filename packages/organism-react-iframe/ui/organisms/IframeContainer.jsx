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

const useIframeContainer = (props) => {
  const {
    src,
    style,
    messageKey = "iframeH",
    loading = "lazy",
    ...others
  } = props;
  const [iframeH, setIframeH] = useState("auto");
  const thisMessageKey = useRef();

  useEffect(() => {
    thisMessageKey.current = messageKey + "-" + iframeCount;
    iframeCount++;
  }, [messageKey]);

  useEffect(() => {
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
  if (loading) {
    others.loading = loading;
  }

  const thisStyle = {
    ...Styles.iframe,
    height: iframeH,
    minHeight: iframeH,
    ...style,
  };

  const expose = {
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
  };

  return {
    style: thisStyle,
    others,
    expose,
  };
};

const IframeContainer = forwardRef((props, ref) => {
  const { style, others, expose } = useIframeContainer(props);
  useImperativeHandle(ref, () => expose, []);
  return <SemanticUI {...others} style={style} atom="iframe" />;
});

export default IframeContainer;

const Styles = {
  iframe: {
    width: "100%",
    border: 0,
  },
};
