export type SelectBaseEvent = {
    value?: string;
    selected?: any;
    item?: any;
};
export type SelectEvent = SelectBaseEvent | (SelectBaseEvent & Event);
export type SelectHandler = {
    select: Function;
};
export type SelectExpose = {
    getValue: Function;
    select: Function;
};
export type SelectData = {
    handler: SelectHandler;
    expose: SelectExpose;
    labelLocator: Function;
    valueLocator: Function;
    restProps?: object;
};
export type SelectProps = {
    value: any;
    defaultValue: any;
    labelLocator: Function;
    valueLocator: Function;
    onChange: Function;
    onBeforeChange: Function;
};
/**
 * @typedef {object} SelectBaseEvent
 * @property {string} [value]
 * @property {Object} [selected]
 * @property {Object} [item]
 */
/**
 * @typedef {SelectBaseEvent | SelectBaseEvent & Event} SelectEvent
 */
/**
 * @typedef {object} SelectHandler
 * @property {Function} select
 */
/**
 * @typedef {object} SelectExpose
 * @property {Function} getValue
 * @property {Function} select
 */
/**
 * @typedef {object} SelectData
 * @property {SelectHandler} handler
 * @property {SelectExpose} expose
 * @property {Function} labelLocator
 * @property {Function} valueLocator
 * @property {object} [restProps]
 */
/**
 * @typedef {object} SelectProps
 * @property {any} value
 * @property {any} defaultValue
 * @property {Function} labelLocator
 * @property {Function} valueLocator
 * @property {Function} onChange
 * @property {Function} onBeforeChange
 */
/**
 * @param {SelectProps} props
 * @returns {SelectData};
 */
export declare const useSelect: (props: SelectProps) => SelectData;
