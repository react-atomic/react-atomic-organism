import pos from "./positions";

const getAlignTargetXY = (domInfo, loc) => {
  let xy;
  const width = domInfo.right - domInfo.left;
  const height = domInfo.bottom - domInfo.top;
  switch (loc) {
    case pos.TR:
      xy = [domInfo.right, domInfo.top];
      break;
    case pos.TL:
      xy = [domInfo.left, domInfo.top];
      break;
    case pos.TC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.top];
      break;
    case pos.RB:
      xy = [domInfo.right, domInfo.bottom];
      break;
    case pos.RC:
      xy = [domInfo.right, domInfo.top + Math.floor(height / 2)];
      break;
    case pos.BL:
      xy = [domInfo.left, domInfo.bottom];
      break;
    case pos.BC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.bottom];
      break;
    case pos.LC:
      xy = [domInfo.left, domInfo.top + Math.floor(height / 2)];
      break;
    case pos.CC:
      xy = [
        domInfo.left + Math.floor(width / 2),
        domInfo.top + Math.floor(height / 2),
      ];
      break;
    default:
      console.error("Not support align type. [" + loc + "]");
      break;
  }
  return xy;
};

export default getAlignTargetXY;
