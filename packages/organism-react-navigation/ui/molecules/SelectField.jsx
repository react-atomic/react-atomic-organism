import { build, Field } from "react-atomic-molecule";

import Select from "../organisms/Select";

const SelectField = ({ selectComponent = Select, inputProps, ...props }) => (
  <Field
    {...props}
    inputComponent={
      build(selectComponent)({
        inputProps,
        titleStyle: Styles.dropdownTitle,
        style: Styles.dropdown,
        iconStyle: Styles.dropdownIcon
      })
    }
  />
);

export default SelectField;

const Styles = {
  dropdownTitle: {
    paddingLeft: 10,
  },
  dropdown: {
    border: "1px solid rgba(34,36,38,.15)",
    minHeight: 40,
    width: "100%",
  },
  dropdownIcon: {
    fill: "#ccc",
  },
};
