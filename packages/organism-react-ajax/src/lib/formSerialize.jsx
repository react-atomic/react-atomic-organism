'use strict';

const formSerialize = (formEl) =>
{
    let formParams = {};
    let elements = formEl.elements;
    let el;
    for (let i=0, j=elements.length; i < j; i++ ) { 
        el = elements[i];
        if (el.value) {
            formParams[el.name] = el.value;
        }   
    }
    return formParams;
}
export default formSerialize;
