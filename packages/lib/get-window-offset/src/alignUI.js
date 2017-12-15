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

const alignUI = (targetEl, floatEl, toLoc, disableAutoLoc) =>
{
    if (!targetEl) {
        console.error('targetEl was empty');
        console.trace();
        return false;
    }
    let targetInfo;
    let winInfo;
    let locs = [];
    if (toLoc) {
        locs.push(toLoc);
    }
    if (!disableAutoLoc) {
        winInfo = getWindowOffset(targetEl);
        if (!winInfo) {
            console.error('get windows offset failed');
        } else {
            targetInfo = winInfo.domInfo;
            locs = locs.concat(winInfo.locs);
        }
    }
    if (!targetInfo) {
        targetInfo = getOffset(targetEl);
    }
    if (!locs.length) {
        console.error('Not set any locs', toLoc);
        return;
    }
    let loc;
    let move;
    const floatInfo = getOffset(floatEl);
    locs.some( locItem => {
        toLoc = locItem;
        loc = getAlignWithLoc(toLoc);
        move = alignWith(targetInfo, floatInfo, loc);
        if (!winInfo) {
            return true;
        } else {
            let movePos = getAfterMove(floatInfo, move);
            let bFullOnScreen = isFullOnScreen(movePos, winInfo.scrollInfo);
            if (bFullOnScreen) {
                return true;
            } else {
                return false;
            }
        }
    });
    const result = {
        loc, 
        toLoc,
        move
    };
    //console.log(result);
    return result;
};

export default alignUI;
