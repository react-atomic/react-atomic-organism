import getScrollInfo from "get-scroll-info";
import getOffset from "getoffset";
import isOnScreen from "./isOnScreen";
import isFixed from "./isFixed";
import isSetOverflow from "./isSetOverflow";

const calWindowOffset = (domInfo, scrollInfo) => {
  const distance = {};
  distance.top = domInfo.top - scrollInfo.top;
  distance.right = scrollInfo.right - domInfo.right;
  distance.bottom = scrollInfo.bottom - domInfo.bottom;
  distance.left = domInfo.left - scrollInfo.left;
  let distanceFlip = {
    [distance.top]: "t",
    [distance.right]: "r",
    [distance.bottom]: "b",
    [distance.left]: "l",
  };
  const maxDistance = Math.max(
    distance.top,
    distance.right,
    distance.bottom,
    distance.left
  );
  let firstKey = distanceFlip[maxDistance];
  let secondKey;
  let locs = [firstKey + "c"];
  if (firstKey === "t" || firstKey === "b") {
    distanceFlip = {
      [distance.right]: "r",
      [distance.left]: "l",
    };
    secondKey = distanceFlip[Math.max(distance.left, distance.right)];
  } else {
    distanceFlip = {
      [distance.top]: "t",
      [distance.bottom]: "b",
    };
    secondKey = firstKey;
    firstKey = distanceFlip[Math.max(distance.top, distance.bottom)];
  }
  locs.push(firstKey + secondKey);
  locs.push(secondKey + firstKey);
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
    console.error("getWindowOffset not assign dom");
    console.trace();
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
