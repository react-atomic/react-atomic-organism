import {mixClass} from 'class-lib';

const setClass = (node, classes) =>
{
    if (node instanceof SVGElement) {
        const thisClass = mixClass(node.getAttribute('class'), classes); 
        node.setAttribute('class', thisClass);
    } else {
        node.className = mixClass(node.className, classes);
    }
}

export default setClass;
