import getScrollInfo from 'get-scroll-info'; 
import getOffset from 'getoffset'; 
import isOnScreen from './isOnScreen';

const getWindowOffset = (dom) =>
{
    let domInfo = getOffset(dom);
    let scrollInfo = getScrollInfo();
    domInfo = isOnScreen(domInfo, scrollInfo);
    let distance = {};
    if (domInfo.isOnScreen) {
        distance.top = Math.abs(domInfo.top - scrollInfo.top);
        distance.right = Math.abs(domInfo.right - scrollInfo.right);
        distance.bottom = Math.abs(domInfo.bottom - scrollInfo.bottom);
        distance.left = Math.abs(domInfo.left - scrollInfo.left);
    }
    let distanceFlip = {
        [distance.top]: 't',
        [distance.right]: 'r',
        [distance.bottom]: 'b',
        [distance.left]: 'l',
    };
    const maxDistance = Math.max(distance.top, distance.right, distance.bottom, distance.left);
    let firstKey = distanceFlip[maxDistance];
    let secondKey;
    let locs = [firstKey+'c'];
    if (firstKey === 't' || firstKey === 'b') {
        distanceFlip = {
            [distance.right]: 'r',
            [distance.left]: 'l'
        }
        secondKey = distanceFlip[Math.max(distance.left, distance.right)];
    } else {
        distanceFlip = {
            [distance.top]: 't',
            [distance.bottom]: 'b',
        }
        secondKey = firstKey;
        firstKey = distanceFlip[Math.max(distance.top, distance.bottom)];
    }
    locs.push(firstKey+secondKey);
    return { domInfo, locs, scrollInfo};
}

export default getWindowOffset;
