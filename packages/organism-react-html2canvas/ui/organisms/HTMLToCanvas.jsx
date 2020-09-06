import React, { useRef, useState } from "react";
import Iframe from "organism-react-iframe";
import get from "get-object-value";
import ratio from "ratio-js";

const defaultAssets = {
  "html2canvas.min.js":
    "https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js",
  jspdf: "https://cdn.jsdelivr.net/npm/jspdf@2.1.0/dist/jspdf.umd.min.js",
};

const getAsset = (file) => {
  return get(defaultAssets, [file]);
};

const initialContent = () => `
<html>
<body>
<script src="${getAsset("jspdf")}"></script>
<script src="${getAsset("html2canvas.min.js")}"></script>
</body>
</html>
`;

const HTMLToCanvas = (props) => {
  const { children } = props;
  const [canvas, setCanvas] = useState();

  const iframe = useRef();
  const preview = useRef();

  const handleIframe = (el) => (iframe.current = el);
  const handlePreview = (el) => (preview.current = el);

  const handleOnLoad = () => {
    const oIframe = iframe.current;
    setTimeout(() => {
      const oIframwWindow = oIframe.getWindow();
      const html2canvas = oIframwWindow.html2canvas;
      const jsPDF = oIframwWindow.jspdf.jsPDF;
      console.log({jsPDF});
      html2canvas(oIframe.root).then((dCanvas) => {
        preview.current.appendChild(dCanvas);
        const doc = new jsPDF('', 'pt', 'a4');
        const image = dCanvas.toDataURL('image/jpeg', 1.0);
        // paper size
        // https://web.archive.org/web/20200906132355/https://prawnpdf.org/docs/0.11.1/Prawn/Document/PageGeometry.html
        const {newWH, newWHLoc} = ratio(dCanvas.width, dCanvas.height, 595.28, 841.89);
        doc.addImage(image, 'JPEG', newWHLoc.x, newWHLoc.y, newWH.w, newWH.h);
        doc.save('test.pdf');
      });
    }, 1000);
  };

  return (
    <>
      <Iframe
        autoHeight
        initialContent={initialContent()}
        onLoad={handleOnLoad}
        ref={handleIframe}
      >
        {children}
      </Iframe>
      <div ref={handlePreview} className="preivew" />
    </>
  );
};

export default HTMLToCanvas;
