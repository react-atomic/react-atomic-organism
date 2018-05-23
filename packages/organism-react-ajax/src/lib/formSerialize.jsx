'use strict';

const formSerialize = formEl =>
{
    const formParams = {};
    const elements = Array.from(formEl.elements);
    elements.forEach( ({name, value}) => {
        if (name) {
            formParams[name] = value;
        }
    });
    return formParams;
}
export default formSerialize;
