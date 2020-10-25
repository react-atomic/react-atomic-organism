const getAfterMove = (domInfo, moveXY) => {
  const width = domInfo.right - domInfo.left;
  const height = domInfo.bottom - domInfo.top;
  const info = {
    top: moveXY[1],
    right: moveXY[0] + width,
    bottom: moveXY[1] + height,
    left: moveXY[0],
  };
  return info;
};

export default getAfterMove;
