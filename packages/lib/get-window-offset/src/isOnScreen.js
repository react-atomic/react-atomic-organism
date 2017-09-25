
const isOnScreen = (domInfo, scrollInfo, margin = 0) =>
{
    domInfo.atTop = domInfo.bottom <= scrollInfo.top + margin;
    domInfo.atRight = domInfo.left >= scrollInfo.right - margin;
    domInfo.atBottom = domInfo.top >= scrollInfo.bottom - margin;
    domInfo.atLeft = domInfo.right <= scrollInfo.left + margin;
    domInfo.isOnScreen = !(
        domInfo.atTop
        || domInfo.atRight
        || domInfo.atBottom
        || domInfo.atLeft
    );
    return domInfo;
}

export default isOnScreen;
