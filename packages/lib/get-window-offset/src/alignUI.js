import getOffset from 'getoffset'; 

import getAfterMove from './getAfterMove';
import getWindowOffset from './getWindowOffset'; 
import alignWith from './alignWith';
import isFullOnScreen from './isFullOnScreen';
import pos from './positions';

const getAlignWithLoc = (toLoc) =>
{
    let loc;
    switch (toLoc) {
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
            loc = toLoc;
            break;
    }
    return loc;
}

const alignUI = (targetEl, floatEl, toLoc) =>
{
    let targetInfo;
    let winInfo;
    if (!toLoc) {
        winInfo = getWindowOffset(targetEl);
        targetInfo = winInfo.domInfo;
        toLoc = winInfo.locs[0];
    } else {
        targetInfo = getOffset(targetEl);
    }
    let floatInfo = getOffset(floatEl);
    let loc = getAlignWithLoc(toLoc);
    let moveXY = alignWith(targetInfo, floatInfo, loc);
    if (winInfo && winInfo.locs) {
        let movePos = getAfterMove(floatInfo, moveXY);
        let bFullOnScreen = isFullOnScreen(movePos, winInfo.scrollInfo);
        if (!bFullOnScreen) {
            toLoc = winInfo.locs[1];
            loc = getAlignWithLoc( toLoc );
            moveXY = alignWith(targetInfo, floatInfo, loc);
        }
    }
    // console.log('loc', loc, 'toLoc', toLoc, 'move',  moveXY);
    return moveXY;
};

export default alignUI;
