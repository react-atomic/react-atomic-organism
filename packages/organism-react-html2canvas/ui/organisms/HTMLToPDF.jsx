import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import ratio from "ratio-js";
import { queryFrom } from "css-query-selector";
import { OBJ_SIZE } from "reshow-constant";

import HTMLToCanvas from "../organisms/HTMLToCanvas";
import getAsset from "../../src/getAsset";

const HTMLToPDF = ({ downloadFileName = "html.pdf", ...props }, ref) => {
  const canvas = useRef();
  const doc = useRef();
  const PDF_WIDTH = 595.28;
  const PDF_HEIGHT = 841.89;
  const execDownload =
    (pageNum) =>
    ({ iframe, canvas: dCanvas }) => {
      if (!doc.current) {
        const iframeWindow = iframe.getWindow();
        const pdf = iframeWindow.jspdf.jsPDF;
        doc.current = new pdf("", "pt", "a4");
      }
      if (doc.current) {
        const image = dCanvas.toDataURL("image/jpeg", 1.0);
        // paper size
        // https://web.archive.org/web/20200906132355/https://prawnpdf.org/docs/0.11.1/Prawn/Document/PageGeometry.html
        const { newWH, newWHLoc } = ratio(
          dCanvas.width,
          dCanvas.height,
          PDF_WIDTH,
          PDF_HEIGHT
        );
        if (pageNum) {
          doc.current.addPage();
        }
        doc.current.addImage(
          image,
          "JPEG",
          newWHLoc.x || 1,
          1,
          newWH.w || 1,
          newWH.h || 1
        );
      }
    };
  const expose = {
    download: async (el) => {
      doc.current = null;
      const multiEl = queryFrom(el).all("[data-pdf-page]");
      const arrEl = OBJ_SIZE(multiEl) ? multiEl : [el];
      for (let i = 0, j = arrEl.length; i < j; i++) {
        await canvas?.current?.getCanvas(execDownload(i), arrEl[i]);
      }
      doc.current.save(downloadFileName);
    },
  };
  useImperativeHandle(ref, () => expose, []);

  return <HTMLToCanvas {...props} ref={canvas} jsArr={[getAsset("jspdf")]} />;
};

export default forwardRef(HTMLToPDF);
