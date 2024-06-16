// @ts-check
import pos from "./positions";
import { OffsetType } from "getoffset";

/**
 * @param {OffsetType} domInfo
 * @param {string} loc
 * @returns {[number, number]}
 */
const getAlignTargetXY = (domInfo, loc) => {
  let xy;
  const width = domInfo.right - domInfo.left;
  const height = domInfo.bottom - domInfo.top;
  switch (loc) {
    case pos.TL:
    case pos.LT:
      xy = [domInfo.left, domInfo.top];
      break;
    case pos.TC:
      xy = [domInfo.left + Math.floor(width / 2), domInfo.top];
      break;
    case pos.TR:
    case pos.RT:
      xy = [domInfo.right, domInfo.top];
      break;
    case pos.RC:
      xy = [domInfo.right, domInfo.top + Math.floor(height / 2)];
      break;
    case pos.RB:
    case pos.BR:
      xy = [domInfo.right, domInfo.bottom];
      break;
    case pos.BL:
    case pos.LB:
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
  return /** @type [number, number]*/ (xy);
};

export default getAlignTargetXY;
