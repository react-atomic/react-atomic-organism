import getScrollInfo from "get-scroll-info";
import isOnScreen from "./isOnScreen";
import getDomPositionInfo from "./getDomPositionInfo";
import pos from "./positions";

const T = "T";
const R = "R";
const B = "B";
const L = "L";
const C = "C";

const getRevertLoc = (fromLoc) => {
  let loc;
  switch (fromLoc) {
    case pos.TL:
      loc = pos.TR;
      break;
    case pos.TR:
      loc = pos.TL;
      break;
    case pos.BL:
      loc = pos.BR;
      break;
    case pos.BR:
      loc = pos.BL;
      break;
    default:
      loc = fromLoc;
      break;
  }
  return loc;
};

const calWindowOffset = (domInfo, scrollInfo) => {
  const distance = {
    top: domInfo.top - scrollInfo.top,
    right: scrollInfo.right - domInfo.right,
    bottom: scrollInfo.bottom - domInfo.bottom,
    left: domInfo.left - scrollInfo.left,
  };
  const maxDistance = Math.max(
    distance.top,
    distance.right,
    distance.bottom,
    distance.left
  );
  let distanceFlip = {
    [distance.top]: T,
    [distance.right]: R,
    [distance.bottom]: B,
    [distance.left]: L,
  };
  const firstKey = distanceFlip[maxDistance];
  let secondKey;
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
    secondKey = distanceFlip[Math.max(distance.top, distance.bottom)];
  }
  const locs = [
    getRevertLoc(pos[firstKey + secondKey]),
    pos[firstKey + C],
    pos[secondKey + C],
    getRevertLoc(pos[secondKey + firstKey]),
  ];
  return {
    locs,
    firstKey,
    secondKey,
  };
};

const getWindowOffset = (dom, debug) => {
  if (!dom) {
    console.warn("getWindowOffset not assign dom");
    return false;
  }
  const {
    fixedNode,
    scrollNode,
    domInfo: targetDomInfo,
  } = getDomPositionInfo(dom);

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
  const domInfo = isOnScreen(targetDomInfo, cookScrollInfo);
  if (!domInfo.isOnScreen && false !== debug) {
    // should not break function here
    // not use return here
    console.warn("Dom is not in screen", {
      dom,
      domInfo,
      scrollInfo,
      cookScrollInfo,
    });
  }
  const result = {
    domInfo,
    scrollInfo,
    ...calWindowOffset(domInfo, cookScrollInfo),
  };
  return result;
};

export default getWindowOffset;
