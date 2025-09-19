export default BasePopup;
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
declare class BasePopup {
    static defaultProps: {
        name: string;
    };
    /**
     * @param {any} _error
     */
    static getDerivedStateFromError(_error: any): {
        hasError: boolean;
    };
    /**
     * @param {BasePopupProps} props
     */
    constructor(props: BasePopupProps);
    /**
     * @type {BasePopupState}
     * @public
     */
    public state: BasePopupState;
    props: BasePopupProps;
    setState: any;
    /**
     * @param {any} error
     * @param {any} info
     */
    componentDidCatch(error: any, info: any): void;
    close(): boolean;
}
