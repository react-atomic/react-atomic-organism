/**
 * @param {HTMLFormElement} formEl
 * @param {string=} arrayMode
 * @returns {{[key: string]: any}}
 */
declare const formSerialize: (formEl: HTMLFormElement, arrayMode?: string | undefined) => {
    [key: string]: any;
};
export default formSerialize;
