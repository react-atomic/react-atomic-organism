import get from "get-object-value";

const position = {
  tl: "top left",
  tc: "top center",
  tr: "top right",
  rt: "right center",
  rc: "right center",
  rb: "right center",
  bl: "bottom left",
  bc: "bottom center",
  br: "bottom right",
  lt: "left center",
  lc: "left center",
  lb: "left center",
};

const getPositionString = (loc) => get(position, [loc]);

export default getPositionString;
