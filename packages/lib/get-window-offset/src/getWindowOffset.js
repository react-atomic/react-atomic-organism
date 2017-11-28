import getScrollInfo from 'get-scroll-info'; 
import getOffset from 'getoffset'; 
import isOnScreen from './isOnScreen';
import isFixed from './isFixed';

const calWindowOffset = (domInfo, scrollInfo) =>
{
    const distance = {};
    distance.top = domInfo.top - scrollInfo.top;
    distance.right = scrollInfo.right - domInfo.right;
    distance.bottom = scrollInfo.bottom - domInfo.bottom;
    distance.left = domInfo.left - scrollInfo.left;
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
    const tb = firstKey;
    const lr = secondKey;
    return {
        locs,
        tb,
        lr
    };
}

const getWindowOffset = (dom) =>
{
    if (!dom) {
        console.error('getWindowOffset not assign dom');
        console.trace();
        return false;
    }
    const scrollInfo = getScrollInfo();
    const domInfo = isOnScreen(getOffset(dom), scrollInfo);
    domInfo.isFixed = isFixed(dom);
    if (!domInfo.isFixed && !domInfo.isOnScreen) {
        console.warn('Dom is not in screen', { dom, domInfo, scrollInfo });
        return false;
    }
    const cookScrollInfo = {...scrollInfo};
    if (domInfo.isFixed) {
        cookScrollInfo.top = 0;
        cookScrollInfo.right = scrollInfo.scrollNodeWidth;
        cookScrollInfo.bottom = scrollInfo.scrollNodeHeight;
        cookScrollInfo.left = 0;
    }
    return { domInfo, scrollInfo, ...calWindowOffset(domInfo, cookScrollInfo) };
}

export default getWindowOffset;
