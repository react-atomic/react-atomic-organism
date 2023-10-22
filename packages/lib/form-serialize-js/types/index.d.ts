export default formSerialize;
/**
 * @param {HTMLFormElement} formEl
 * @param {string=} arrayMode
 * @returns {{[key: string]: any}}
 */
declare function formSerialize(formEl: HTMLFormElement, arrayMode?: string | undefined): {
    [key: string]: any;
};
