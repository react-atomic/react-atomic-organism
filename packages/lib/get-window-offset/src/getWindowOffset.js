import getOffset from 'getoffset'; 
import getScrollInfo from 'get-scroll-info'; 
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
        [distance.top]: 'top',
        [distance.right]: 'right',
        [distance.bottom]: 'bottom',
        [distance.left]: 'left',
    };
    const maxDistance = Math.max(distance.top, distance.right, distance.bottom, distance.left);
    const maxKey = distanceFlip[maxDistance];
    if (maxKey === 'top' || maxKey === 'bottom') {

    } else {

    }
    
    
    console.log(maxKey);
}

export default getWindowOffset;
