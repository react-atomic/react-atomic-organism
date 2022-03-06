import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  lazyInject,
  mixClass,
  Field,
  SemanticUI,
  Message,
} from "react-atomic-molecule";
import get from "get-object-value";
import callfunc from "call-func";
import { FUNCTION } from "reshow-constant";

import Radio from "../organisms/Checkbox";

class RadioGroup extends PureComponent {
  state = { value: null, error: "" };

  static propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    labelLocator: (d) => d.label,
    valueLocator: (d) => d.value,
    // not an event base so naming it with callback
    checkedCallback: null,
    I18NValueMissing: "There must be a value.",
  };

  isChecked(item, nextValue, current) {
    const { checkedCallback } = this.props;
    if (FUNCTION === typeof checkedCallback) {
      return checkedCallback(item, nextValue, current);
    } else {
      return nextValue === this.altValue(item);
    }
  }

  altValue(item) {
    const { valueLocator, labelLocator } = this.props;
    const value = valueLocator(item);
    return value != null ? value : labelLocator(item);
  }

  checkValidity({ setState }) {
    const { required } = this.props;
    if (required) {
      if (this.getValue() == null) {
        setState("valueMissing");
        return false;
      }
    }
    return true;
  }

  getChecked() {
    const { options } = this.props;
    const { value, current } = this.state;
    let thisChecked;
    (options || []).some((item, key) => {
      const checked = this.isChecked(item, value, current);
      if (checked) {
        thisChecked = item;
        return true;
      } else {
        return false;
      }
    });
    return thisChecked;
  }

  getValue() {
    const thisChecked = this.getChecked();
    if (thisChecked) {
      const thisValue = this.altValue(thisChecked);
      return thisValue;
    }
  }

  handleClick = (e, before, after, ref) => {
    const { onChange } = this.props;
    let current = null;
    if (ref) {
      if (ref.props.disabled) {
        return;
      }
      current = ref;
    }
    const value = current.getValue();
    this.setState({ current, value }, () => {
      callfunc(onChange, [value, current]);
    });
  };

  handleError(e) {
    const customState = e.state?.customState;
    if (customState) {
      if ("valueMissing" === customState) {
        return this.props.I18NValueMissing;
      }
      return customState;
    }
  }

  handleDisplayError(el, error) {
    this.setState({ error: error || "" });
  }

  constructor(props) {
    super(props);
    injects = lazyInject(InjectStyles, injects);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, defaultValue, options } = nextProps;
    const thisValue =
      value ?? (get(prevState, ["value"]) ? null : defaultValue);
    const nextState = {};
    if (options !== prevState.options) {
      nextState.options = options;
    }
    if (thisValue != null && thisValue !== prevState.prePropsValue) {
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
      "data-constraint-id": dataConstraintId,
      ...others
    } = this.props;
    const { current, value, error } = this.state;
    const classes = mixClass(fieldClassName, {
      grouped: !inline,
    });
    const thisRadioProps = radioProps || {};
    thisRadioProps["data-constraint-id"] = dataConstraintId;

    let errorEl;
    if (error) {
      others.messageType = "error";
      errorEl = <Message messageType="error">{error}</Message>;
    }

    /**
     * Do not pass constraint (required) to childeren else will get foucus error
     * such as "An invalid form control with name='xxx' is not focusable"..
     */
    const comp = (
      <Field inline={inline} label={label} fieldClassName={classes} {...others}>
        {(options || []).map((item, key) => (
          <Radio
            type="radio"
            key={key}
            {...thisRadioProps}
            fieldStyle={radioFieldStyle}
            fieldStyles={radioFieldStyles}
            name={name}
            {...item.props}
            label={labelLocator(item)}
            value={this.altValue(item)}
            afterClick={this.handleClick}
            checked={this.isChecked(item, value, current)}
          />
        ))}
      </Field>
    );

    return (
      <SemanticUI className="radio-group">
        {comp}
        {errorEl}
      </SemanticUI>
    );
  }
}

export default RadioGroup;

let injects;
const InjectStyles = {
  inlineRequired: [
    {
      margin: "-.2em 0 0 .2em",
      content: "*",
      color: "#db2828",
    },
    ".required.fields.inline>label:after",
  ],
  cleanInlineRequired: [
    {
      display: "none",
    },
    ".required.fields:not(.grouped)>.field>.checkbox:after",
  ],
  errorStyle: [
    {
      marginBottom: "1em",
    },
    ".radio-group .ui.error.message:last-child",
  ],
};
