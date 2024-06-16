// @ts-check

import getScrollInfo, { ScrollInfoType } from "get-scroll-info";
import isOnScreen from "./isOnScreen";
import getDomPositionInfo from "./getDomPositionInfo";
import pos from "./positions";
import {
  SimplePosType,
  CalWindowOffsetResult,
  WindowOffsetType,
  DomInfoType,
} from "./types";

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
 * @param {HTMLElement} overflowNode
 * @param {ScrollInfoType} overflowScrollInfo
 * @returns {ScrollInfoType=}
 */
const getVisibleArea = (overflowNode, overflowScrollInfo) => {
  if (!overflowNode.parentNode) {
    return;
  }
  const root = /**@type HTMLElement*/ (overflowNode.parentNode);

  const rect = overflowNode.getBoundingClientRect();
  const viewportWidth = root.offsetWidth;
  const viewportHeight = root.offsetHeight;
  const visibleWidth = Math.min(rect.right - rect.left, viewportWidth);
  const visibleHeight = Math.min(rect.bottom - rect.top, viewportHeight);
  overflowScrollInfo.right = overflowScrollInfo.left + visibleWidth;
  overflowScrollInfo.bottom = overflowScrollInfo.top + visibleHeight;
  return overflowScrollInfo;
};

/**
 * @param {DomInfoType} domInfo
 * @param {import("get-scroll-info").ScrollInfoType} scrollInfo
 * @returns {SimplePosType}
 */
const calDistance = (domInfo, scrollInfo) => {
  const distance = {
    top: domInfo.top - scrollInfo.top,
    right: scrollInfo.right - domInfo.right,
    bottom: scrollInfo.bottom - domInfo.bottom,
    left: domInfo.left - scrollInfo.left,
  };
  return distance;
};

/**
 * @param {SimplePosType} distance
 * @returns {CalWindowOffsetResult}
 */
const calWindowOffset = (distance) => {
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
 * @param {boolean?} [debug]
 * @param {number} [margin]
 * @returns {WindowOffsetType|undefined}
 */
const getWindowOffset = (dom, debug, margin) => {
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
  }
  const domInfoWithScreen = isOnScreen(domInfo, cookScrollInfo, margin);
  const distance = calDistance(domInfo, cookScrollInfo);
  /**
   * @type WindowOffsetType
   */
  const result = {
    domInfo: domInfoWithScreen,
    domOverflowInfo: null,
    scrollInfo,
    distance,
    ...calWindowOffset(distance),
  };
  let domOverflowInfoWithScreen;
  let overflowDistance;
  if (overflowNode) {
    const domOverflowScrollInfo = getScrollInfo(domOverflowInfo.domScroller);
    domOverflowInfoWithScreen = isOnScreen(
      domOverflowInfo,
      domOverflowScrollInfo,
      margin
    );
    domInfoWithScreen.isOnScreen =
      domInfoWithScreen.isOnScreen && domOverflowInfoWithScreen.isOnScreen;
    overflowDistance = calDistance(
      domOverflowInfo,
      getVisibleArea(overflowNode, domOverflowScrollInfo) ||
        domOverflowScrollInfo
    );
    const overflowNodeWindowOffset = calWindowOffset(overflowDistance);
    result.domOverflowInfo = domOverflowInfoWithScreen;
    result.locs = overflowNodeWindowOffset.locs;
    result.firstKey = overflowNodeWindowOffset.firstKey;
    result.secondKey = overflowNodeWindowOffset.secondKey;
    result.distance = overflowDistance;
  }
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
        overflowNode,
        domOverflowInfo,
        domInfoWithScreen,
        domOverflowInfoWithScreen,
        result,
        distance,
        overflowDistance,
      }
    );
  }
  return result;
};

export default getWindowOffset;
