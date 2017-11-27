import getStyle from 'get-style';

const isFixed = (node) =>
{
    if (!document.body.contains(node)) {
        console.warn(['Dom not exists in body', node]);
        return false;
    }
    let thisParent = node;
    while(thisParent.nodeName != 'BODY') {
        const position =  getStyle(thisParent, 'position');
        if ('fixed' === position) {
            return true;
        }
        thisParent = thisParent.parentNode;
    }
    return false;
}

export default isFixed;
