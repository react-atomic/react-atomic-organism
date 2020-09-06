import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import Iframe from "organism-react-iframe";
import get from "get-object-value";
import callfunc from "call-func";

const defaultAssets = {
  "html2canvas.min.js":
    "https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js",
};

const getAsset = (file) => {
  return get(defaultAssets, [file]);
};

const initialContent = (jsArr) => `
<html>
<body>
  <script src="${getAsset("html2canvas.min.js")}"></script>
  ${(jsArr || []).map((js) => `<script src="${js}"></script>`)}
</body>
</html>
`;

const HTMLToCanvasComp = (props, ref) => {
  const {
    children,
    jsArr,
    preview: hasPreview,
    hideHtml,
    autoGenCanvas,
    onCanvas,
  } = props;
  const iframe = useRef();
  const preview = useRef();
  const _timer = useRef();

  useImperativeHandle(ref, () => ({
    getCanvas: (onCanvas) => getCanvas(onCanvas),
  }));

  const handleIframe = (el) => (iframe.current = el);
  const handlePreview = (el) => (preview.current = el);

  const getCanvas = (canvasCallback) => {
    const oIframe = iframe.current;
    const oIframwWindow = oIframe.getWindow();
    const html2canvas = oIframwWindow.html2canvas;
    if (!html2canvas) {
      return;
    }
    html2canvas(oIframe.root, {
      useCORS: true,
    }).then((dCanvas) => {
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
    oPreview = <div ref={handlePreview} className="preivew" />;
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
        ref={handleIframe}
      >
        {children}
      </Iframe>
      {oPreview}
    </>
  );
};

const HTMLToCanvas = forwardRef(HTMLToCanvasComp);

HTMLToCanvas.defaultProps = {
  preview: false,
  hideHtml: false,
};

export default HTMLToCanvas;
