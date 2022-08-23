import { PureComponent } from "react";
import { mixClass, Menu, Item, SemanticUI } from "react-atomic-molecule";
import callfunc from "call-func";

import SelectUI from "../molecules/SelectUI";
import Dropdown from "../organisms/Dropdown";
import defaultLocator from "../../src/defaultLocator";

class Select extends PureComponent {
  static defaultProps = {
    labelLocator: defaultLocator.label,
    valueLocator: defaultLocator.value,
    simple: false,
  };

  state = { value: null };

  handleSelect =
    (item) =>
    (e = {}) => {
      const { labelLocator, valueLocator, onChange, onBeforeChange } =
        this.props;
      const value = valueLocator(item);
      const selected = labelLocator(item);
      e.value = value;
      e.selected = selected;
      e.item = item;
      const isContinue = callfunc(onBeforeChange, [e]);
      if (false !== isContinue) {
        this.setState({ value }, () => callfunc(onChange, [e]));
      }
    };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, defaultValue } = nextProps;
    const { prevValue } = prevState;
    const thisValue = value ?? defaultValue;
    if (thisValue !== prevValue) {
      return {
        value: thisValue,
        prevValue: thisValue,
      };
    }
    return null;
  }

  render() {
    return (
      <SelectUI
        {...this.props}
        dropdownComponent={Dropdown}
        value={this.state.value}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default Select;
