import getOffset from 'getoffset'; 
import getScrollInfo from 'get-scroll-info'; 
import get from 'get-object-value'

import getAfterMove from './getAfterMove';
import getWindowOffset from './getWindowOffset'; 
import alignWith from './alignWith';
import isFullOnScreen from './isFullOnScreen';
import isSetOverflow from './isSetOverflow';
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

const fixFixedNode = scrollInfo => move =>
[
    move[0] + scrollInfo.left,
    move[1] + scrollInfo.top
]

const fixScrollNode = scrollInfo => move =>
[
    move[0] - scrollInfo.left,
    move[1] - scrollInfo.top
]

const alignUI = (targetEl, floatEl, alignParams) =>
{
    let {toLoc, disableAutoLoc} = get(alignParams, null, {})
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
        const targetFixedNode = isFixed(targetEl);
        targetInfo = getOffset(targetEl, targetFixedNode);
        targetInfo.scrollNode = isSetOverflow(targetEl)
        targetInfo.fixedNode = targetFixedNode;
    }
    
    const floatInfo = getOffset(floatEl);
    let adjustMove;
    const scrollNode = targetInfo.scrollNode
    const fixedNode = targetInfo.fixedNode
    if (fixedNode) {
        if (fixedNode.contains(floatEl)) {
            adjustMove = fixFixedNode(getScrollInfo(fixedNode))
        } else {
            if (winInfo) {
                adjustMove = fixFixedNode(winInfo.scrollInfo)
            } else {
                adjustMove = fixFixedNode(getScrollInfo())
            }
        }
    } else if (scrollNode) {
        adjustMove = fixScrollNode(getScrollInfo(scrollNode))
    }
    let loc;
    let move;
    locs.some( locItem => {
        toLoc = locItem;
        loc = getAlignWithLoc(toLoc);
        move = alignWith(targetInfo, floatInfo, loc);
        if (adjustMove) {
            move = adjustMove(move)
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
