import React, {PureComponent} from 'react';
import {Field, Menu, Item, SemanticUI} from 'react-atomic-molecule';
import callfunc from 'call-func';

import Dropdown from '../organisms/Dropdown';

class Select extends PureComponent {
  static defaultProps = {
    labelLocator: d => d.label,
    valueLocator: d => d.value,
    simple: false,
  };

  state = {value: null};

  handleSelect = item => e => {
    const {labelLocator, valueLocator, onChange} = this.props;
    const value = valueLocator(item);
    const selected = labelLocator(item);
    this.setState(
      {
        value,
      },
      () => {
        callfunc(onChange, [value, {selected, item}]);
      },
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value, defaultValue} = nextProps;
    const {prevValue} = prevState;
    let thisValue = value || defaultValue;
    if (thisValue !== prevValue) {
      return {
        value: thisValue,
        prevValue: thisValue,
      };
    }
    return null;
  }

  render() {
    const {
      defaultValue,
      value: propsValue,
      labelLocator,
      valueLocator,
      placeholder,
      options,
      name,
      onChange,
      ...props
    } = this.props;
    const {value} = this.state;
    let thisList = null;
    let thisPlaceholder = null;
    let thisSelected = value;
    if (placeholder) {
      thisPlaceholder = (
        <SemanticUI style={Styles.dropdownPlaceholder}>
          {placeholder}
        </SemanticUI>
      );
    }
    if (null != value) {
      options.some(l => {
        if (value === valueLocator(l)) {
          thisSelected = labelLocator(l);
          return true;
        }
        return false;
      });
    }
    const title = thisSelected || thisPlaceholder;
    if (options) {
      thisList = (
        <Menu>
          {options.map((l, key) => (
            <Item
              onClick={this.handleSelect(l)}
              data-v={valueLocator(l)}
              key={key}>
              {labelLocator(l)}
            </Item>
          ))}
        </Menu>
      );
    }
    return (
      <Dropdown {...props} list={thisList}>
        <input type="hidden" name={name} value={value || ''} />
        {title}
      </Dropdown>
    );
  }
}

const SelectField = props => (
  <Field
    {...props}
    inputComponent={
      <Select
        titleStyle={Styles.dropdownTitle}
        style={Styles.dropdown}
        iconStyle={Styles.dropdownIcon}
      />
    }
  />
);

export default Select;
export {SelectField};

const Styles = {
  dropdown: {
    border: '1px solid rgba(34,36,38,.15)',
    minHeight: 40,
  },
  dropdownTitle: {
    paddingLeft: 10,
  },
  dropdownPlaceholder: {
    color: '#ccc',
  },
  dropdownIcon: {
    fill: '#ccc',
  },
};
