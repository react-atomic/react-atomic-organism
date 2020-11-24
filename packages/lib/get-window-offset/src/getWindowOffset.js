import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import isOnScreen from "./isOnScreen";
import isFixed from "./isFixed";
import isSetOverflow from "./isSetOverflow";
import pos from "./positions";

const T = "T";
const R = "R";
const B = "B";
const L = "L";
const C = "C";

const calWindowOffset = (domInfo, scrollInfo) => {
  const distance = {};
  distance.top = domInfo.top - scrollInfo.top;
  distance.right = scrollInfo.right - domInfo.right;
  distance.bottom = scrollInfo.bottom - domInfo.bottom;
  distance.left = domInfo.left - scrollInfo.left;
  let distanceFlip = {
    [distance.top]: T,
    [distance.right]: R,
    [distance.bottom]: B,
    [distance.left]: L,
  };
  const maxDistance = Math.max(
    distance.top,
    distance.right,
    distance.bottom,
    distance.left
  );
  let firstKey = distanceFlip[maxDistance];
  let secondKey;
  let locs = [pos[firstKey + C]];
  if (firstKey === T || firstKey === B) {
    distanceFlip = {
      [distance.right]: R,
      [distance.left]: L,
    };
    secondKey = distanceFlip[Math.max(distance.left, distance.right)];
  } else {
    distanceFlip = {
      [distance.top]: T,
      [distance.bottom]: B,
    };
    secondKey = firstKey;
    firstKey = distanceFlip[Math.max(distance.top, distance.bottom)];
  }
  locs.push(pos[firstKey + secondKey]);
  locs.push(pos[secondKey + C]);
  const tb = firstKey;
  const lr = secondKey;
  return {
    locs,
    tb,
    lr,
  };
};

const getWindowOffset = (dom) => {
  if (!dom) {
    console.warn("getWindowOffset not assign dom");
    return false;
  }
  const fixedNode = isFixed(dom);
  const scrollNode = isSetOverflow(dom);
  const scrollInfo = getScrollInfo();
  const cookScrollInfo = { ...scrollInfo };
  if (fixedNode) {
    const fixedScrollInfo = getScrollInfo(fixedNode);
    cookScrollInfo.top = fixedScrollInfo.top;
    cookScrollInfo.right = scrollInfo.scrollNodeWidth;
    cookScrollInfo.bottom = scrollInfo.scrollNodeHeight;
    cookScrollInfo.left = fixedScrollInfo.left;
  } else if (scrollNode) {
    const scrollNodeScrollInfo = getScrollInfo(scrollNode);
    cookScrollInfo.top += scrollNodeScrollInfo.top;
    cookScrollInfo.right += scrollNodeScrollInfo.left;
    cookScrollInfo.bottom += scrollNodeScrollInfo.top;
    cookScrollInfo.left += scrollNodeScrollInfo.left;
  }
  const domInfo = isOnScreen(getOffset(dom, fixedNode), cookScrollInfo);
  domInfo.fixedNode = fixedNode;
  domInfo.scrollNode = scrollNode;
  if (!domInfo.isOnScreen) {
    console.warn("Dom is not in screen", {
      dom,
      domInfo,
      scrollInfo,
      cookScrollInfo,
    });
    return false;
  }
  const result = {
    domInfo,
    scrollInfo,
    ...calWindowOffset(domInfo, cookScrollInfo),
  };
  return result;
};

export default getWindowOffset;
