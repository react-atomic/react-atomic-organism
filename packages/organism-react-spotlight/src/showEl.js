import getStyle from 'get-style';

import setClass from './setClass';

const addSvgClass = (node, classes) =>
{
    setClass(node, classes);
    let thisParent = node.parentNode;
    if (!thisParent) {
        return;
    }
    while(thisParent.nodeName != 'BODY') {
        // svg always in lower case
        if (thisParent.nodeName.toLowerCase() === 'svg') {
            setClass(thisParent, classes);
            break;
        }
        thisParent = thisParent.parentNode;
        if (!thisParent) {
          break;
        }
    }
}

const showEl = (node, classShowEl='react-spotlight-show-el', classRelative='react-spotlight-relative') =>
{
    const position = getStyle(node, 'position');
    const classes = [classShowEl];
    if ('static' === position) {
        classes.push(classRelative);
    }
    addSvgClass(node, classes);
    if (node && node instanceof SVGElement) {
        addSvgClass(node, classes);
    } else {
        setClass(node, classes);
    }
}

export default showEl;
