import getDomCenter from "./getDomCenter";
import getDomPositionInfo from "./getDomPositionInfo";

const getNearLocation = (center, floatInfo) => {
  const loc = {
    center: false,
    centerCenter: false,
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  if (floatInfo.x > center.x) {
    loc.right = true;
  } else if (floatInfo.x < center.x) {
    loc.left = true;
  } else {
    loc.center = true;
  }
  if (floatInfo.y > center.y) {
    loc.bottom = true;
  } else if (floatInfo.y < center.y) {
    loc.top = true;
  } else {
    loc.center = true;
  }
  if (loc.center) {
    if (!loc.top && !loc.bottom && !loc.left && !loc.right) {
      loc.centerCenter = true;
    }
  }
  return loc;
};

const nearWhere = (targetEl, floatElOrFloatXY) => {
  const tarCenter = getDomCenter(targetEl);
  let floatXY;
  if (floatElOrFloatXY.nodeName) {
    const floatElInfo = getDomPositionInfo(floatElOrFloatXY)?.domInfo || {
      top: 0,
      left: 0,
    };
    floatXY = { x: floatElInfo.left, y: floatElInfo.top };
  }
  if (null == floatXY) {
    floatXY = floatElOrFloatXY;
  }
  return getNearLocation({ x: tarCenter[0], y: tarCenter[1] }, floatXY);
};

export default nearWhere;
export { getNearLocation };
