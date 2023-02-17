export function useSelect(props: SelectProps): SelectData;
export type SelectEvent = object & Event;
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
