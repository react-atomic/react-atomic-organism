import getStyle from 'get-style';

const isSetOverflow = (node) =>
{
    if (!document.body.contains(node)) {
        console.warn(['Dom not exists in body', node]);
        return false;
    }
    let thisParent = node;
    while(thisParent.nodeName != 'BODY') {
        const overflowX =  getStyle(thisParent, 'overflow-x');
        const overflowY =  getStyle(thisParent, 'overflow-y');
        if ('visible' !== overflowY || 'visible' !== overflowX) {
            return thisParent;
        }
        thisParent = thisParent.parentNode;
    }
    return false;
}

export default isSetOverflow;
