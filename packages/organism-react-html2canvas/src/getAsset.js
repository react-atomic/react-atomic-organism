import get from "get-object-value";

const defaultAssets = {
  jspdf: "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "html2canvas.min.js":
    "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
};

const getAsset = (key) => get(defaultAssets, [key]);

export default getAsset;
