import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {mixClass, Field, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';

import Radio from '../organisms/Checkbox';


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
    let current = null;
    if (ref) {
      if (ref.props.disabled) {
        return;
      }
      current = ref;
    }
    this.setState({current}, () => {
      if ('function' === typeof onChange) {
        onChange(e, current.getValue(), current);
      }
    });
  };

  getValue() {
    const current = get(this, ['state', 'current']);
    return current ? current.getValue() : null;
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
      radioFieldStyle,
      radioFieldStyles,
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
    const {current} = this.state;
    const classes = mixClass(fieldClassName, {
      grouped: !inline,
    });
    let thisCheckedCallback = checkedCallback;
    if ('function' !== typeof thisCheckedCallback) {
      thisCheckedCallback = (item, current) => current.getValue() === item.value;
    }
    return (
      <Field inline={inline} fieldClassName={classes} {...others}>
        <Label>{label}</Label>
        {options.map( (item, key) => (
          <Radio
            type="radio"
            fieldStyle={radioFieldStyle}
            fieldStyles={radioFieldStyles}
            name={name}
            key={key}
            {...item.props}
            label={item.label}
            value={item.value}
            afterClick={this.handleClick}
            checked={thisCheckedCallback(item, current)}
          />
        ))}
      </Field>
    );
  }
}

export default RadioGroup;
