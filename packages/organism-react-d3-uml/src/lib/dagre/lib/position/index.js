import { KEYS } from "reshow-constant";
import { asNonCompoundGraph, buildLayerMatrix } from "../util";
import { positionX } from "./bk";
import { calMax } from "../../../lodash-lite";

const positionY = (g) => {
  const layering = buildLayerMatrix(g);
  const rankSep = g.graph().ranksep;
  let prevY = 0;
  layering.forEach((layer) => {
    const maxHeight = calMax(layer.map((v) => g.node(v).height));
    layer.forEach((v) => (g.node(v).y = prevY + maxHeight / 2));
    prevY += maxHeight + rankSep;
  });
};

const position = (g) => {
  g = asNonCompoundGraph(g);

  positionY(g);
  const arrPositionX = positionX(g);
  KEYS(arrPositionX).forEach((key) => (g.node(key).x = arrPositionX[key]));
};

export default position;
