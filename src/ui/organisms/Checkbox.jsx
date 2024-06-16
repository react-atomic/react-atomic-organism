import React, { PureComponent } from "react";
import get from "get-object-value";
import arrayMerge from "array.merge";
import {
  useCSS,
  lazyInject,
  mixClass,
  Field,
  SemanticUI,
} from "react-atomic-molecule";
import callfunc from "call-func";

let checkboxId = 0;

const InputWrapper = ({
  toggle,
  slider,
  type,
  checked,
  disabled,
  ...props
}) => {
  useCSS(["checkbox"], "semantic");
  const classes = mixClass("checkbox", {
    radio: type === "radio",
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
    injects = lazyInject(InjectStyles, injects);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { checked } = nextProps;
    let { id } = nextProps;
    const nextState = {};
    if (checked !== prevState.prePropsChecked) {
      nextState.prePropsChecked = checked;
      nextState.checked = checked;
    }
    if (!id) {
      if (!prevState.id) {
        id = "react-checkbox-" + checkboxId;
        checkboxId++;
      }
    }
    if (id) {
      nextState.id = id;
    }
    return nextState;
  }

  getValue() {
    return get(this, ["props", "value"]);
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
      state: get(this, ["state", "checked"]),
    };
  }

  handleClick = (e) => {
    if ("INPUT" !== e.target.nodeName) {
      e.preventDefault();
    }
    const stateChecked = this.state.checked;
    const { beforeClick, afterClick, disabled, type } = this.props;
    const beforeChecked = stateChecked;
    const afterChecked = disabled
      ? stateChecked
      : type === "radio"
        ? true
        : !stateChecked;
    const callbackParams = [e, beforeChecked, afterChecked, this];
    const isContinue = callfunc(beforeClick, callbackParams);
    if (!disabled && false !== isContinue) {
      this.processChange(afterChecked);
      callfunc(afterClick, callbackParams);
    } else {
      callfunc(afterClick, [e, beforeChecked, beforeChecked, this]);
    }
  };

  processChange(checked) {
    const { onChange } = this.props;
    this.setState({ checked }, () =>
      callfunc(onChange, [
        {
          type: "change",
          target: this.getInput(),
          currentTarget: this.getInput(),
          checked,
        },
        this,
      ]),
    );
  }

  handleChange = (e) => {};

  render() {
    const {
      className,
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
    const { checked: stateChecked, id } = this.state;
    let thisLabel = " ";
    if (label) {
      thisLabel = label;
    }
    const thisValue = "object" === typeof value ? "" : value;
    return (
      <Field
        {...{
          ...props,
          disabled,
          type,
          id,
          refCb: (el) => {
            this.el = el;
            callfunc(refCb, [el]);
          },
          className: mixClass(className, "hidden"),
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
  atom: "input",
  type: "checkbox",
  checked: false,
  disabled: false,
};

export default Checkbox;

let injects;
const InjectStyles = {
  checkbox: [
    {
      margin: 0,
    },
  ],
};
