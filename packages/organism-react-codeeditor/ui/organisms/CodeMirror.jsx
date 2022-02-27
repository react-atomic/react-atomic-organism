import React, { useRef, useEffect, useCallback, useReducer } from "react";
import Iframe from "organism-react-iframe";
import { Unsafe } from "react-atomic-molecule";
import callfunc from "call-func";
import * as models from "../../src/models";

const keys = Object.keys;

const reducer = (state, action) => {
  keys(action).forEach((key) => (state[key] = action[key]));
  return state;
};

const CodeMirror = ({
  codeMirrorVersion = "5.65.2",
  onChange,
  model,
  children,
  ...props
}) => {
  const oModel = models[model] || models.html;
  const [that, dispatch] = useReducer(reducer, {});
  const handleIframeRef = (el) => {
    dispatch({
      dIframe: el,
    });
  };

  const dTextarea = useRef(null);
  const handleCodeMirror = useCallback(() => {
    const codemirror = that.iframeWindow.CodeMirror.fromTextArea(
      dTextarea.current,
      {
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        lineNumbers: true,
        lineWrapping: true,
        ...oModel.options,
      }
    );
    codemirror.setSize(null, "100%");
    codemirror.on("change", () => {
      callfunc(onChange, [
        oModel.setValue({ codemirror, iframeWindow: that.iframeWindow }),
      ]);
    });
    codemirror.autoFormatRange(
      { line: 0, ch: 0 },
      { line: codemirror.lineCount() }
    );
    codemirror.setCursor({ line: 0, ch: 0 });
  }, [dTextarea]);

  const handleLoad = () => {
    const iframeWindow = that.dIframe.contentWindow?.window;
    if (iframeWindow) {
      let timer;
      timer = setInterval(() => {
        if (iframeWindow.isCodeMirrorReady) {
          clearInterval(timer);
          handleCodeMirror();
        }
      }, 10);
      dispatch({
        timer,
        iframeWindow,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (that.timer) {
        clearInterval(that.timer);
      }
    };
  }, []);

  return (
    <Iframe
      inlineCSS="body {padding: 15 0; background: transparent;}"
      className="codemirror"
      style={Styles.fitHeight}
      refCb={handleIframeRef}
      onLoad={handleLoad}
    >
      <Unsafe>
        {`
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@${codeMirrorVersion}/lib/codemirror.min.css" />
          <script src="https://cdn.jsdelivr.net/npm/codemirror@${codeMirrorVersion}/lib/codemirror.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/codemirror-formatting@1.0.0/formatting.min.js"></script>
          ${(oModel.libJS || [])
            .map((js) => '<script src="' + js + '"></script>')
            ?.join("")}
          ${(oModel.codeMirrorJS || [])
            .map(
              (js) =>
                `<script src="https://cdn.jsdelivr.net/npm/codemirror@${codeMirrorVersion}/` +
                js +
                '"></script>'
            )
            ?.join("")}
          <script>window.isCodeMirrorReady=true;</script>
          `}
      </Unsafe>
      <textarea
        ref={dTextarea}
        style={Styles.textarea}
        defaultValue={children}
      />
    </Iframe>
  );
};

export default CodeMirror;

const Styles = {
  textarea: {
    display: "none",
  },
  fitHeight: {
    height: "100%",
  },
};
