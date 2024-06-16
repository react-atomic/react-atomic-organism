// @ts-check

import getOffset, { OffsetType } from "getoffset";
import getScrollInfo, { ScrollInfoType } from "get-scroll-info";

import getDomPositionInfo from "./getDomPositionInfo";
import getAfterMove from "./getAfterMove";
import getWindowOffset from "./getWindowOffset";
import alignWith from "./alignWith";
import isFullOnScreen from "./isFullOnScreen";
import getPositionString from "./getPositionString";
import { WindowOffsetType } from "./types";

const fixFixedNode =
  (/** @type ScrollInfoType*/ scrollInfo) => (/**@type number[]*/ move) =>
    [move[0] + scrollInfo.left, move[1] + scrollInfo.top];

const fixScrollNode =
  (/** @type ScrollInfoType*/ scrollInfo) => (/**@type number[]*/ move) =>
    [move[0] - scrollInfo.left, move[1] - scrollInfo.top];

class AlignParamsType {
  /**
   * @type string
   */
  toLoc;
  /**
   * @type boolean
   */
  disableAutoLoc;
  /**
   * @type boolean
   */
  positionFixed;
  /**
   * @type string[]
   */
  exclude;
}

class AlignUIResultType {
  /**
   * @type string|undefined
   */
  loc;
  /**
   * @type [number, number]
   */
  move;
  /**
   * @type string|undefined
   */
  toLoc;
  /**
   * @type string|undefined
   */
  locClassName;
}

/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement} floatEl
 * @param {AlignParamsType} alignParams
 * @param {WindowOffsetType} winInfo
 * @returns {AlignUIResultType|false}
 */
const alignUI = (targetEl, floatEl, alignParams, winInfo) => {
  const { toLoc, disableAutoLoc, positionFixed, exclude } = alignParams || {};
  if (!targetEl) {
    console.warn("targetEl was empty", { targetEl });
    return false;
  }
  let locs = [];
  if (toLoc) {
    locs.push(toLoc);
  }
  if (!disableAutoLoc) {
    winInfo = winInfo || getWindowOffset(targetEl);
    if (!winInfo) {
      console.warn("get windows offset failed", { targetEl });
    } else {
      locs = locs.concat(winInfo.locs);
    }
  }
  if (!locs.length) {
    console.warn("Not set any locs", { toLoc });
    return false;
  }
  const targetInfo = winInfo
    ? winInfo.domInfo
    : getDomPositionInfo(targetEl).domInfo;
  if (!targetInfo) {
    console.warn("[alertUI] can't get target info.", { targetEl, winInfo });
    return false;
  }

  let adjustMove;
  /**
   * @type HTMLElement
   */
  const overflowNode = /**@type HTMLElement*/ (targetInfo.overflowNode);
  /**
   * @type HTMLElement
   */
  const fixedNode = /**@type HTMLElement*/ (targetInfo.fixedNode);

  if (fixedNode) {
    if (fixedNode.contains(floatEl)) {
      adjustMove = fixFixedNode(getScrollInfo(fixedNode));
    } else if (positionFixed) {
      adjustMove = fixScrollNode(getScrollInfo(fixedNode));
    } else {
      if (winInfo) {
        adjustMove = fixFixedNode(winInfo.scrollInfo);
      } else {
        adjustMove = fixFixedNode(getScrollInfo());
      }
    }
  } else if (overflowNode) {
    adjustMove = fixScrollNode(getScrollInfo(overflowNode));
  }
  let loc;
  let move;
  /**
   * @type OffsetType
   */
  const floatInfo = /** @type OffsetType*/ (getOffset(floatEl));
  locs.some((locItem) => {
    /**
     * @type string
     */
    loc = locItem;
    if (exclude && -1 !== exclude.indexOf(loc)) {
      return false;
    }
    move = alignWith(targetInfo, floatInfo, loc);
    if (adjustMove) {
      move = adjustMove(move);
    }
    if (!winInfo) {
      return true;
    } else {
      const movePos = getAfterMove(floatInfo, move);
      const bFullOnScreen = isFullOnScreen(movePos, winInfo.scrollInfo);
      if (bFullOnScreen) {
        return true;
      } else {
        return false;
      }
    }
  });
  if (!move) {
    return false;
  }
  const result = {
    loc,
    move,
    toLoc: toLoc || loc,
    locClassName: getPositionString(loc),
  };
  //   console.log(result, {locs, winInfo});
  return result;
};

export default alignUI;
