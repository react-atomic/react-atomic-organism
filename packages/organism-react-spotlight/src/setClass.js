
const setClass = (node, classes) =>
{
    if (node instanceof SVGElement) {
        const className = node.getAttribute('class') || ''; 
        node.setAttribute('class', className + ' ' + classes.join(' '));
    } else {
        node.className += ' '+classes.join(' ');
    }
}

export default setClass;
