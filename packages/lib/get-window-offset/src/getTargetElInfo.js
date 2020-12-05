import getOffset from "getoffset";
import isFixed from "./isFixed";
import isSetOverflow from "./isSetOverflow";

const getTargetElInfo = (dom) => {
  const fixedNode = isFixed(dom);
  const scrollNode = isSetOverflow(dom);
  const domInfo = getOffset(dom, fixedNode);
  domInfo.scrollNode = scrollNode;
  domInfo.fixedNode = fixedNode;
  return {
    domInfo,
    fixedNode,
    scrollNode,
  };
};

export default getTargetElInfo;
