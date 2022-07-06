import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import Iframe from "organism-react-iframe";
import callfunc from "call-func";
import getAsset from "../../src/getAsset";

/**
 * https://html2canvas.hertzen.com/configuration
 */
const DEFAULT_OPTIONS = {
  allowTaint: true,
  useCORS: true,
  logging: false,
};

const initialContent = (jsArr) => `<!DOCTYPE html>
<html>
<body>
  <script src="${getAsset("html2canvas.min.js")}"></script>
  ${(jsArr || []).map((js) => `<script src="${js}"></script>`)}
</body>
</html>
`;

const HTMLToCanvas = forwardRef((props, ref) => {
  const {
    preview: hasPreview = false,
    hideHtml = false,
    children,
    jsArr,
    autoGenCanvas,
    onCanvas,
  } = props;
  const iframe = useRef();
  const preview = useRef();
  const _timer = useRef();

  const getCanvas = (canvasCallback, htmlEl, options = DEFAULT_OPTIONS) => {
    const oIframe = iframe.current;
    const oIframwWindow = oIframe?.getWindow();
    const html2canvas = oIframwWindow?.html2canvas;
    if (!html2canvas) {
      return;
    }

    return html2canvas(htmlEl || oIframe.getRoot(), options).then((dCanvas) => {
      callfunc(canvasCallback, [
        {
          iframe: oIframe,
          canvas: dCanvas,
        },
      ]);
      if (hasPreview && preview.current) {
        preview.current.innerHTML = "";
        preview.current.appendChild(dCanvas);
      }
    });
  };

  const expose = { getCanvas };
  useImperativeHandle(ref, () => expose, []);

  const handleLoad = () => {
    if (autoGenCanvas) {
      if (_timer.current) {
        clearTimeout(_timer.current);
      }
      _timer.current = setTimeout(() => getCanvas(onCanvas), 1000);
    }
  };

  let oPreview;
  if (hasPreview) {
    oPreview = <div ref={preview} className="preivew" />;
  }

  let iframeStyle = {};
  if (hideHtml) {
    iframeStyle = {
      position: "absolute",
      top: -99999,
      left: -99999,
      opacity: 0,
    };
  }

  return (
    <>
      <Iframe
        autoHeight
        style={iframeStyle}
        initialContent={initialContent(jsArr)}
        onLoad={handleLoad}
        ref={iframe}
      >
        {children}
      </Iframe>
      {oPreview}
    </>
  );
});

HTMLToCanvas.displayName = "HTMLToCanvas";

export default HTMLToCanvas;
