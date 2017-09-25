import getAlignXY from './getAlignXY';

const alignTo = (targetInfo, floatElInfo, loc) =>
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
                xy[1]
            ];
            break;
        case 'br':
            moveXY = [
                xy[0] - width,
                xy[1]
            ];
            break;
        case 'tc':
            moveXY = [
                xy[0] - Math.floor(width / 2),
                xy[1] - height
            ];
            break;
        case 'bc':
            moveXY = [
                xy[0] - Math.floor(width / 2),
                xy[1]
            ];
            break;
        case 'lc':
            moveXY = [
                xy[0] - width,
                xy[1] - Math.floor(height / 2)
            ];
            break;
        case 'rc':
            moveXY = [
                xy[0],
                xy[1] - Math.floor(height / 2)
            ];
            break;
        default: 
            console.error('Not support align type.');
            break;
    }
    return moveXY;
};

export default alignTo;
