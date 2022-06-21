import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import ratio from "ratio-js";

import HTMLToCanvas from "../organisms/HTMLToCanvas";
import getAsset from "../../src/getAsset";

const HTMLToPDF = (props, ref) => {
  const canvas = useRef();
  const execDownload = (payload) => {
    const { iframe, canvas: dCanvas } = payload;
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
      doc.addImage(
        image,
        "JPEG",
        newWHLoc.x || 0,
        0,
        newWH.w || 1,
        newWH.h || 1
      );
      doc.save("test.pdf");
    }
  };
  const expose = {
    download: (el) => {
      canvas?.current?.getCanvas(execDownload, el);
    },
  };
  useImperativeHandle(ref, () => expose, []);

  return <HTMLToCanvas {...props} ref={canvas} jsArr={[getAsset("jspdf")]} />;
};

export default forwardRef(HTMLToPDF);
