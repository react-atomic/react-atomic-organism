import * as React from "react";
declare const PureComponent: typeof React.PureComponent;
export type BasePopupProps = {
    /**
     * - Name of the popup
     */
    name?: string;
    /**
     * - Error handler function
     */
    onError?: Function;
};
export type BasePopupState = {
    /**
     * - Whether component has error
     */
    hasError: boolean;
};
/**
 * @typedef {Object} BasePopupProps
 * @property {string} [name] - Name of the popup
 * @property {function} [onError] - Error handler function
 */
/**
 * @typedef {Object} BasePopupState
 * @property {boolean} hasError - Whether component has error
 */
/**
 * @augments {PureComponent<BasePopupProps, BasePopupState>}
 */
declare class BasePopup extends PureComponent<BasePopupProps, BasePopupState> {
    props: BasePopupProps;
    /**
     * @type {BasePopupState}
     * @public
     */
    state: BasePopupState;
    static defaultProps: {
        name: string;
    };
    /**
     * @param {BasePopupProps} props
     */
    constructor(props: BasePopupProps);
    /**
     * @param {any} _error
     */
    static getDerivedStateFromError(_error: any): {
        hasError: boolean;
    };
    /**
     * @param {any} error
     * @param {any} info
     */
    componentDidCatch(error: any, info: any): void;
    close(): boolean;
}
export default BasePopup;
