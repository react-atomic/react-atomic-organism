import getDomPositionInfo from "./getDomPositionInfo";

const calDomCenter = (left, top, width, height) => {
  console.log({left, top, width, height});
  const xy = [
    left + Math.floor(width / 2),
    top + Math.floor(height / 2),
  ];
  return xy;
};

const getDomCenter = (dom) => {
  const {left, top, width, height} = getDomPositionInfo(dom)?.domInfo || {};
  const domCenter = calDomCenter(left, top, width, height);
  return domCenter;
};

export default getDomCenter;
