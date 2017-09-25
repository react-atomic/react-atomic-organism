
const getAlignXY = (domInfo, loc) => {
   let xy;
   const width = domInfo.right - domInfo.left;
   const height = domInfo.bottom - domInfo.top;
   switch (loc) {
        case 'tl':
            xy = [domInfo.left, domInfo.top];
            break;
        case 'tr':
            xy = [domInfo.right, domInfo.top];
            break;
        case 'bl':
            xy = [domInfo.left, domInfo.bottom];
            break;
        case 'br':
            xy = [domInfo.right, domInfo.bottom];
            break;
        case 'tc':
            xy = [
                domInfo.left +  
                Math.floor(width / 2),
                domInfo.top
            ];
            break;
        case 'bc':
            xy = [
                domInfo.left +  
                Math.floor(width / 2),
                domInfo.bottom
            ];
            break;
        case 'lc':
            xy = [
                domInfo.left,
                domInfo.top +
                Math.floor(height / 2)
            ];
            break;
        case 'rc':
            xy = [
                domInfo.right,
                domInfo.top +
                Math.floor(height / 2)
            ];
            break;
        case 'cc':
            xy = [
                domInfo.left +  
                Math.floor(width / 2),
                domInfo.top +
                Math.floor(height / 2)
            ];
            break;
        default: 
            console.error('Not support align type.');
            break;
   }
};

export default getAlignXY;
