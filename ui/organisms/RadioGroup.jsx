import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Radio from '../organisms/Checkbox';

import {mixClass, Field, SemanticUI} from 'react-atomic-molecule';

const Label = ({children, ...props}) => {
  if (!children) {
    return null;
  } else {
    return (
      <SemanticUI {...props} atom="label">
        {children}
      </SemanticUI>
    );
  }
};

class RadioGroup extends PureComponent {
  state = {value: null};

  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  };

  handleClick = (e, before, after, ref) => {
    const {onChange} = this.props;
    let value = null;
    if (ref) {
      if (ref.props.disabled) {
        return;
      }
      value = ref.getValue();
    }
    this.setState({value}, () => {
      if ('function' === typeof onChange) {
        onChange(e, value);
      }
    });
  };

  getValue() {
    return this.state.value;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value} = nextProps;
    if (value !== prevState.prePropsValue) {
      return {
        value,
        prePropsValue: value,
      };
    } else {
      return null;
    }
  }

  render() {
    const {
      inline,
      fieldClassName,
      label,
      options,
      name,
      value,
      onChange,
      checkedCallback,
      ...others
    } = this.props;
    const {value: stateValue} = this.state;
    const classes = mixClass(fieldClassName, {
      grouped: !inline,
    });
    let thisCheckedCallback = checkedCallback;
    if ('function' !== typeof thisCheckedCallback) {
      thisCheckedCallback = (item, currentValue) => currentValue === item.value;
    }
    return (
      <Field inline={inline} fieldClassName={classes} {...others}>
        <Label>{label}</Label>
        {options.map(item => (
          <Radio
            type="radio"
            name={name}
            {...item.props}
            label={item.label}
            value={item.value}
            key={item.value}
            afterClick={this.handleClick}
            checked={thisCheckedCallback(item, stateValue)}
          />
        ))}
      </Field>
    );
  }
}

export default RadioGroup;
