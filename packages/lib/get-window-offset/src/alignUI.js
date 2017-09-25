import getAlignXY from './getAlignXY';

const alignUI = (targetInfo, floatElInfo, loc) =>
{
    const xy = getAlignXY(targetInfo, loc); 
   const width = floatElInfo.right - floatElInfo.left;
   const height = floatElInfo.bottom - floatElInfo.top;
    let moveXY;
    switch(loc)
    {
        case 'tl':
            moveXY = [
                xy[0],
                xy[1] - height
            ];
            break;
        case 'tr':
            moveXY = [
                xy[0] - width,
                xy[1] - height
            ];
            break;
        case 'bl':
            moveXY = [
                xy[0],
                xy[1] + height
            ];
            break;
        case 'br':
            break;
    }
};

export default alignUI;
