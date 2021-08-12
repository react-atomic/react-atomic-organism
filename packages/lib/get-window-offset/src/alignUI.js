import getOffset from "getoffset";
import getScrollInfo from "get-scroll-info";
import get from "get-object-value";

import getDomPositionInfo from "./getDomPositionInfo";
import getAfterMove from "./getAfterMove";
import getWindowOffset from "./getWindowOffset";
import alignWith from "./alignWith";
import isFullOnScreen from "./isFullOnScreen";
import pos from "./positions";
import getPositionString from "./getPositionString";

const getAlignWithLoc = (toLoc) => {
  let loc;
  switch (toLoc) {
    case pos.TR:
      loc = pos.TL;
      break;
    case pos.TL:
      loc = pos.TR;
      break;
    case pos.RB:
      loc = pos.BL;
      break;
    case pos.BL:
      loc = pos.RB;
      break;
    default:
      loc = toLoc;
      break;
  }
  return loc;
};

const fixFixedNode = (scrollInfo) => (move) => [
  move[0] + scrollInfo.left,
  move[1] + scrollInfo.top,
];

const fixScrollNode = (scrollInfo) => (move) => [
  move[0] - scrollInfo.left,
  move[1] - scrollInfo.top,
];

const alignUI = (targetEl, floatEl, alignParams, winInfo) => {
  let { toLoc, disableAutoLoc, positionFixed, exclude } = get(
    alignParams,
    null,
    {}
  );
  if (!targetEl) {
    console.warn("targetEl was empty", { targetEl });
    return false;
  }
  let targetInfo;
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
  if (!targetInfo) {
    if (winInfo) {
      targetInfo = winInfo.domInfo;
    } else {
      targetInfo = getDomPositionInfo(targetEl).domInfo;
    }
  }
  if (!targetInfo) {
    console.warn("[alertUI] can't get target info.", { targetEl, winInfo });
    return false;
  }

  let adjustMove;
  const scrollNode = targetInfo.scrollNode;
  const fixedNode = targetInfo.fixedNode;

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
  } else if (scrollNode) {
    adjustMove = fixScrollNode(getScrollInfo(scrollNode));
  }
  let loc;
  let move;
  const floatInfo = getOffset(floatEl);
  locs.some((locItem) => {
    loc = locItem;
    if ( exclude && -1 !== exclude.indexOf(loc)) {
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
