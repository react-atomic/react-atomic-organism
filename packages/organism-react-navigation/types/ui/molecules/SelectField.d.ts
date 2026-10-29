declare const SelectField: ({ selectComponent, inputProps, ...props }: {
    [x: string]: any;
    inputProps: any;
    selectComponent?: import("react").FC<import("../../hooks/useSelect").SelectProps>;
}) => import("react").JSX.Element;
export default SelectField;
