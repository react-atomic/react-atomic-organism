/**
 * @type React.FC<FilterProps>
 * @returns {React.ReactElement}
 */
export const Filter: React.FC<FilterProps>;
export type FilterEvent = {
    item: any;
    suggestion: object;
    inputValue: string;
};
export type CreateData = {
    value: string;
    originalValue: string;
};
export type FilterProps = {
    component: any;
    disabled?: boolean;
    itemClickToClose?: boolean;
    wrapperClickToFocus?: boolean;
    couldCreate?: boolean;
    refCb?: CallableFunction;
    wrapperRefCb?: CallableFunction;
    className?: string;
    name?: string;
    shouldRenderSuggestions?: CallableFunction;
    onChange?: CallableFunction;
    onFocus?: CallableFunction;
    onBlur?: CallableFunction;
    onKeyDown?: CallableFunction;
    onItemClick?: CallableFunction;
    onWrapperClick?: CallableFunction;
    onSubmit?: CallableFunction | boolean;
    filter?: boolean;
    preview?: number;
    results?: object;
    itemsLocator?: Function;
    itemLocator?: Function;
    valueLocator?: Function;
    itemFilter?: Function;
};
export type FilterResultProps = {
    value?: string;
    results?: object;
    filter?: boolean;
    preview?: number;
    bShouldRenderSuggestions?: boolean;
    itemsLocator?: CallableFunction;
    itemFilter?: CallableFunction;
    valueLocator?: CallableFunction;
};
