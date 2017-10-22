import getAlignXY from './getAlignXY';
import pos from './positions';

const alignWith = (targetInfo, floatElInfo, loc) =>
{
    const xy = getAlignXY(targetInfo, loc); 
    const width = floatElInfo.right - floatElInfo.left;
    const height = floatElInfo.bottom - floatElInfo.top;
    let moveXY;
    switch(loc)
    {
        case pos.TL:
            moveXY = [
                xy[0],
                xy[1] - height
            ];
            break;
        case pos.TR:
            moveXY = [
                xy[0] - width,
                xy[1] - height
            ];
            break;
        case pos.BL:
            moveXY = [
                xy[0],
                xy[1]
            ];
            break;
        case pos.BR:
            moveXY = [
                xy[0] - width,
                xy[1]
            ];
            break;
        case pos.TC:
            moveXY = [
                xy[0] - Math.floor(width / 2),
                xy[1] - height
            ];
            break;
        case pos.RC:
            moveXY = [
                xy[0],
                xy[1] - Math.floor(height / 2)
            ];
            break;
        case pos.BC:
            moveXY = [
                xy[0] - Math.floor(width / 2),
                xy[1]
            ];
            break;
        case pos.LC:
            moveXY = [
                xy[0] - width,
                xy[1] - Math.floor(height / 2)
            ];
            break;
        case pos.CC:
            moveXY = [
                xy[0] - Math.floor(width / 2),
                xy[1] - Math.floor(height / 2)
            ];
            break;
        default: 
            console.error('Not support align type.');
            break;
    }
    return moveXY;
};

export default alignWith;
