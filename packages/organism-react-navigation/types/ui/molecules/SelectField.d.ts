export default SelectField;
declare function SelectField({ selectComponent, inputProps, ...props }: {
    [x: string]: any;
    selectComponent?: import("react").FC<import("../../hooks/useSelect").SelectProps>;
    inputProps: any;
}): import("react/jsx-runtime").JSX.Element;
