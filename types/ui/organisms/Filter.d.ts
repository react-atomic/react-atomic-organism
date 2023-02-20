/**
 * @type React.FC<FilterProps>
 * @returns {React.ReactElement}
 */
export const Filter: React.FC<FilterProps>;
export type FilterEvent = {
    item?: any;
    suggestion?: object;
    inputValue?: string;
    inputName?: string;
};
export type ValueData = {
    value: string;
    prevValue: string;
    selIndex: number;
    event: FilterEvent;
};
export type FilterResultProps = {
    value?: string;
    results?: object;
    filter?: boolean;
    preview?: number;
    bShouldRenderSuggestions?: boolean;
    itemsLocator?: Function;
    itemFilter?: Function;
    valueLocator?: Function;
};
export type FilterProps = {
    component: any;
    ref?: React.Ref<any>;
    disabled?: boolean;
    builtInOnly?: boolean;
    itemClickToClose?: boolean;
    wrapperClickToFocus?: boolean;
    couldCreate?: boolean;
    doNotResetValue?: boolean;
    shouldJsonEncode?: boolean;
    refCb?: React.RefCallback<any>;
    wrapperRefCb?: React.RefCallback<any>;
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
    results?: object;
    itemsLocator?: Function;
    itemLocator?: Function;
    valueLocator?: Function;
    itemFilter?: Function;
};
