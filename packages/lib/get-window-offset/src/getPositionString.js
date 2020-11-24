import get from "get-object-value";

const position = {
  tr: "top right",
  tl: "top left",
  tc: "top center",
  rb: "right bottom",
  rc: "right center",
  bl: "bottom left",
  bc: "bottom center",
  lc: "left center",
  cc: "center center-center",
};

const getPositionString = (loc) => get(position, [loc]);

export default getPositionString;
