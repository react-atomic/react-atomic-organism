// @ts-check

import getScrollInfo from "get-scroll-info";
import isOnScreen from "./isOnScreen";
import getDomPositionInfo from "./getDomPositionInfo";
import pos from "./positions";
import { CalWindowOffsetResult, WindowOffsetType, DomInfoType } from "./type";

const T = "T";
const R = "R";
const B = "B";
const L = "L";
const C = "C";

/**
 * @param {string} fromLoc
 * @returns {string}
 */
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

/**
 * @param {DomInfoType} domInfo
 * @param {import("get-scroll-info").ScrollInfoType} scrollInfo
 * @returns {CalWindowOffsetResult}
 */
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

/**
 * @param {HTMLElement} dom
 * @param {boolean} [debug]
 * @returns {WindowOffsetType|undefined}
 */
const getWindowOffset = (dom, debug) => {
  if (!dom) {
    console.warn("getWindowOffset not assign dom");
    return;
  }
  const { fixedNode, overflowNode, domInfo, domOverflowInfo } =
    getDomPositionInfo(dom);

  const scrollInfo = getScrollInfo();
  const cookScrollInfo = { ...scrollInfo };
  if (fixedNode) {
    const fixedScrollInfo = getScrollInfo(/** @type HTMLElement */ (fixedNode));
    cookScrollInfo.top = fixedScrollInfo.top;
    cookScrollInfo.right = scrollInfo.scrollNodeWidth;
    cookScrollInfo.bottom = scrollInfo.scrollNodeHeight;
    cookScrollInfo.left = fixedScrollInfo.left;
  } else if (overflowNode) {
    const overflowNodeScrollInfo = getScrollInfo(overflowNode);
    cookScrollInfo.top += overflowNodeScrollInfo.top;
    /**
     * @type number
     */
    (cookScrollInfo.right) += overflowNodeScrollInfo.left;
    /**
     * @type number
     */
    (cookScrollInfo.bottom) += overflowNodeScrollInfo.top;
    cookScrollInfo.left += overflowNodeScrollInfo.left;
  }
  const domInfoWithScreen = isOnScreen(domInfo, cookScrollInfo);
  const domOverflowInfoWithScreen = isOnScreen(
    domOverflowInfo,
    getScrollInfo(domOverflowInfo.domScroller)
  );
  domInfoWithScreen.isOnScreen =
    domInfoWithScreen.isOnScreen && domOverflowInfoWithScreen.isOnScreen;
  if ((!domInfoWithScreen.isOnScreen && false !== debug) || true === debug) {
    // should not break function here
    // not use return here
    console.warn(
      domInfoWithScreen.isOnScreen
        ? "Dom is in screen"
        : "Dom is not in screen",
      {
        dom,
        domInfo,
        scrollInfo,
        cookScrollInfo,
      }
    );
  }
  const result = {
    domInfo: domInfoWithScreen,
    domOverflowInfo: domOverflowInfoWithScreen,
    scrollInfo,
    ...calWindowOffset(domInfo, cookScrollInfo),
  };
  return result;
};

export default getWindowOffset;
