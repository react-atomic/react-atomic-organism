import getStyle from 'get-style';

const isFixed = (node) =>
{
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
