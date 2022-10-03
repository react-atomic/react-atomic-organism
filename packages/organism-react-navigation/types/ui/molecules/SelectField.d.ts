export default SelectField;
declare function SelectField({ selectComponent, inputProps, ...props }: {
    [x: string]: any;
    selectComponent?: typeof Select;
    inputProps: any;
}): JSX.Element;
import Select from "../organisms/Select";
