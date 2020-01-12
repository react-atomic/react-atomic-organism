import getStyle from 'get-style';
import setClass from './setClass';

const cleanZIndex = (
  node,
  classCleanZIndex = 'react-spotlight-clean-zindex',
  classShowEl = '',
) => {
  let thisParent = node.parentNode;
  if (!thisParent) {
    return;
  }
  let isFindFixedParent;
  while (thisParent && thisParent.nodeName != 'BODY') {
    const zIndex = getStyle(thisParent, 'z-index');
    if (zIndex && 'auto' !== zIndex) {
      const position = getStyle(thisParent, 'position');
      if ('fixed' !== position || !classShowEl) {
        setClass(thisParent, [classCleanZIndex]);
      } else if ('fixed' === position) {
        if (!isFindFixedParent) {
          isFindFixedParent = true;
          setClass(thisParent, [classShowEl]);
        }
      }
    }
    thisParent = thisParent.parentNode;
  }
};

export default cleanZIndex;
