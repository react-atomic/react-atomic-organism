import React, {PureComponent} from 'react';
import get from 'get-object-value';
import arrayMerge from 'array.merge';
import {lazyInject, mixClass, Field, SemanticUI} from 'react-atomic-molecule';

let checkboxId = 0;

const InputWrapper = ({toggle, slider, type, checked, disabled, ...props}) => {
  const classes = mixClass('checkbox', {
    radio: type === 'radio',
    toggle,
    slider,
    checked,
    disabled,
  });
  return <SemanticUI {...props} className={classes} />;
};

class Checkbox extends PureComponent {
  state = {};
  constructor(props) {
    super(props);
    injects = lazyInject(injects, InjectStyles);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {checked} = nextProps;
    let {id} = nextProps;
    const nextState = {};
    if (checked !== prevState.prePropsChecked) {
      nextState.prePropsChecked = checked;
      nextState.checked = checked;
    }
    if (!id) {
      if (!prevState.id) {
        id = 'react-checkbox-' + checkboxId;
        checkboxId++;
      }
    }
    if (id) {
      nextState.id = id;
    }
    return nextState;
  }

  getValue() {
    return get(this, ['props', 'value']);
  }

  getName() {
    return this.getInput().name;
  }

  getInput() {
    return this.el;
  }

  getChecked() {
    return {
      input: this.getInput().checked,
      state: get(this, ['state', 'checked']),
    };
  }

  handleClick = e => {
    if ('INPUT' !== e.target.nodeName) {
      e.preventDefault();
    }
    const {beforeClick, afterClick, disabled, type} = this.props;
    const beforeChecked = this.state.checked;
    let afterChecked = type === 'radio' ? true : !this.state.checked;
    if ('function' === typeof beforeClick) {
      beforeClick(e, beforeChecked, afterChecked, this);
    }
    if (!disabled) {
      this.processChange(afterChecked);
    }
    if ('function' === typeof afterClick) {
      afterClick(e, beforeChecked, afterChecked, this);
    }
  };

  processChange(checked) {
    const {onChange} = this.props;
    this.setState({checked}, () => {
      if ('function' === typeof onChange) {
        onChange({
          type: 'change',
          target: this.getInput(),
          currentTarget: this.getInput(),
        }, this);
      }
    });
  }

  handleChange = e => { };

  render() {
    const {
      value,
      disabled,
      refCb,
      toggle,
      label,
      slider,
      type,
      fieldStyles,
      beforeClick,
      afterClick,
      ...props
    } = this.props;
    const {checked: stateChecked, id} = this.state;
    let thisLabel = ' ';
    if (label) {
      thisLabel = label;
    }
    const thisValue = 'object' === typeof value ? '' : value;
    return (
      <Field
        {...{
          ...props,
          disabled,
          type,
          id,
          refCb: el => {
            this.el = el;
            if ('function' === typeof refCb) {
              refCb(el);
            }
          },
          label: thisLabel,
          checked: stateChecked,
          onChange: this.handleChange,
          fieldStyles: arrayMerge(injects.checkbox, fieldStyles),
          value: thisValue,
          inputWrapper: (
            <InputWrapper
              {...{
                toggle,
                slider,
                type,
                disabled,
                onClick: this.handleClick,
                checked: stateChecked,
              }}
            />
          ),
        }}
      />
    );
  }
}

Checkbox.defaultProps = {
  atom: 'input',
  type: 'checkbox',
  checked: false,
  disabled: false,
};

export default Checkbox;

let injects;
const InjectStyles = {
  checkbox: [
    {
      margin: 0,
      overflow: 'hidden',
    },
  ],
};
