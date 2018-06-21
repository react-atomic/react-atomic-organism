import getOffset from 'getoffset'; 
import getScrollInfo from 'get-scroll-info'; 

import getAfterMove from './getAfterMove';
import getWindowOffset from './getWindowOffset'; 
import alignWith from './alignWith';
import isFullOnScreen from './isFullOnScreen';
import isFixed from './isFixed';
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

const fixedNode = scrollInfo => move =>
[
    move[0] + scrollInfo.left,
    move[1] + scrollInfo.top
]

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
    if (!locs.length) {
        console.error('Not set any locs', toLoc);
        return;
    }
    if (!targetInfo) {
        targetInfo = getOffset(targetEl);
        targetInfo.isFixed = isFixed(targetEl);
    }
    const floatInfo = getOffset(floatEl);
    let adjustFixed;
    if (targetInfo.isFixed) {
        if (targetInfo.isFixed.contains(floatEl)) {
            adjustFixed = fixedNode(getScrollInfo(targetInfo.isFixed))
        } else {
            if (winInfo) {
                adjustFixed = fixedNode(winInfo.scrollInfo)
            } else {
                adjustFixed = fixedNode(getScrollInfo())
            }
        }
    }
    let loc;
    let move;
    locs.some( locItem => {
        toLoc = locItem;
        loc = getAlignWithLoc(toLoc);
        move = alignWith(targetInfo, floatInfo, loc);
        if (adjustFixed) {
            move = adjustFixed(move)
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
    const result = {
        loc, 
        toLoc,
        move
    };
    //console.log(result);
    return result;
};

export default alignUI;
