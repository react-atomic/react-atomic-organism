import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";

import get from "get-object-value";
import ratio from "ratio-js";

import HTMLToCanvas from "../organisms/HTMLToCanvas";

const defaultAssets = {
  jspdf: "https://cdn.jsdelivr.net/npm/jspdf@2.1.0/dist/jspdf.umd.min.js",
};
const getAsset = (file) => get(defaultAssets, [file]);

const HTMLToPDF = (props, ref) => {
  const canvas = useRef();
  const handleRefCanvas = (el) => (canvas.current = el);
  const execDownload = (payload) => {
    const {iframe, canvas: dCanvas} = payload;
    const iframeWindow = iframe.getWindow();
    const pdf = iframeWindow.jspdf.jsPDF;
    if (pdf) {
      const doc = new pdf("", "pt", "a4");
      const image = dCanvas.toDataURL("image/jpeg", 1.0);
      // paper size
      // https://web.archive.org/web/20200906132355/https://prawnpdf.org/docs/0.11.1/Prawn/Document/PageGeometry.html
      const { newWH, newWHLoc } = ratio(
        dCanvas.width,
        dCanvas.height,
        595.28,
        841.89
      );
      doc.addImage(image, "JPEG", newWHLoc.x, newWHLoc.y, newWH.w, newWH.h);
      doc.save("test.pdf");
    }
  };

  useImperativeHandle(ref, () => ({
    download: () => {
      canvas?.current?.getCanvas(execDownload);
    },
  }));

  return (
    <HTMLToCanvas
      {...props}
      ref={handleRefCanvas}
      jsArr={[getAsset("jspdf")]}
    />
  );
};

export default forwardRef(HTMLToPDF);
