export default SelectField;
declare function SelectField({ selectComponent, inputProps, ...props }: {
    [x: string]: any;
    selectComponent?: React.FC<import("../../hooks/useSelect").SelectProps>;
    inputProps: any;
}): any;
