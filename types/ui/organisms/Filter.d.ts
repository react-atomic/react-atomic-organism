export type FilterExpose = {
    submit: Function;
    disabled: Function;
    close: Function;
    open: Function;
    getValue: Function;
    getSelIndex: Function;
    getIsOpen: Function;
    blur: Function;
    focus: Function;
    setValue: Function;
};
export type FilterEvent = {
    item?: any;
    suggestion?: object;
    inputValue?: string;
    inputName?: string;
};
export type ValueData = {
    value?: string;
    prevValue?: string;
    selIndex: number;
    event: FilterEvent;
};
export type FilterResultProps = {
    value?: string;
    results?: object | boolean;
    filter?: boolean;
    preview?: number;
    bShouldRenderSuggestions?: boolean;
    itemsLocator?: Function;
    itemFilter?: Function;
    valueLocator?: Function;
};
export type FilterHandlerArgs = {
    propsResults?: any;
    propsPreview?: number | boolean;
    itemsLocator: Function;
    itemFilter: Function;
    propsFilter?: any;
    value?: any;
};
export type FilterProps = {
    component: any;
    ref?: import("react").Ref<any>;
    disabled?: boolean;
    builtInOnly?: boolean;
    itemClickToClose?: boolean;
    wrapperClickToFocus?: boolean;
    couldCreate?: boolean;
    doNotResetValue?: boolean;
    shouldJsonEncode?: boolean;
    refCb?: import("react").RefCallback<any>;
    wrapperRefCb?: import("react").RefCallback<any>;
    className?: string;
    name?: string;
    shouldRenderSuggestions?: Function | boolean;
    onChange?: EventListener;
    onFocus?: EventListener;
    onBlur?: EventListener;
    onKeyDown?: EventListener;
    onItemClick?: EventListener;
    onWrapperClick?: EventListener;
    onSubmit?: EventListener | boolean;
    filter?: boolean;
    preview?: number;
    results?: object | boolean;
    itemsLocator?: Function;
    itemLocator?: Function;
    valueLocator?: Function;
    itemFilter?: Function;
};
/**
 * @type {import("react").ForwardRefExoticComponent<FilterProps>}
 * @returns {import("react").ReactElement}
 */
export declare const Filter: import("react").ForwardRefExoticComponent<FilterProps>;
