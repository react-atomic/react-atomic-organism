import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {mixClass, Field, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';
import callfunc from 'call-func';
import {FUNCTION} from 'reshow-constant';

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

  static defaultProps = {
    labelLocator: d => d.label,
    valueLocator: d => d.value,
    // not an event base so naming it with callback
    checkedCallback: null,
  };

  getChecked(item, nextValue, current) {
    const {checkedCallback, valueLocator} = this.props;
    if (FUNCTION === typeof checkedCallback) {
      return checkedCallback(item, nextValue, current);
    } else {
      return nextValue === valueLocator(item);
    }
  }

  handleClick = (e, before, after, ref) => {
    const {onChange} = this.props;
    let current = null;
    if (ref) {
      if (ref.props.disabled) {
        return;
      }
      current = ref;
    }
    const value = current.getValue();
    this.setState({current, value}, () => {
      callfunc(onChange, [value, current]);
    });
  };

  getValue() {
    const {options, valueLocator} = this.props;
    const {value, current} = this.state;
    let thisValue;
    (options || []).some((item, key) => {
      const checked = this.getChecked(item, value, current);
      if (checked) {
        thisValue = valueLocator(item);
        return true;
      } else {
        return false;
      }
    });
    return thisValue;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value, defaultValue, options} = nextProps;
    const thisValue = value != null ? value : defaultValue;
    const nextState = {};
    if (options !== prevState.options) {
      nextState.options = options;
    }
    if (thisValue !== prevState.prePropsValue) {
      nextState.value = thisValue;
      nextState.prePropsValue = thisValue;
    }
    return nextState;
  }

  render() {
    const {
      radioFieldStyle,
      radioFieldStyles,
      radioProps,
      inline,
      fieldClassName,
      label,
      options,
      name,
      value: propsValue,
      onChange,
      valueLocator,
      labelLocator,
      checkedCallback,
      ...others
    } = this.props;
    const {current, value} = this.state;
    const classes = mixClass(fieldClassName, {
      grouped: !inline,
    });

    return (
      <Field inline={inline} fieldClassName={classes} {...others}>
        <Label>{label}</Label>
        {(options || []).map((item, key) => (
          <Radio
            type="radio"
            key={key}
            {...radioProps}
            fieldStyle={radioFieldStyle}
            fieldStyles={radioFieldStyles}
            name={name}
            {...item.props}
            label={labelLocator(item)}
            value={valueLocator(item)}
            afterClick={this.handleClick}
            checked={this.getChecked(item, value, current)}
          />
        ))}
      </Field>
    );
  }
}

export default RadioGroup;
