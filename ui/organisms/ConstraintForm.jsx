import React, { PureComponent } from "react";
import { mixClass, build, Form, Field } from "react-atomic-molecule";
import callfunc from "call-func";
import formSerialize from "form-serialize-js";

let constraintId = 0;
const constraintObj = {};
const keys = Object.keys;
const constraintIdKey = "data-constraint-id";

class ConstraintField extends PureComponent {
  static defaultProps = {
    component: Field,
  };

  checkValidity(el) {
    const { onValidate, onError } = this.props;
    el = el || this.el;
    let customState;
    const setCustomState = (s) => (customState = s);
    const checkValidityParams = [
      { el, constraintField: this, setState: setCustomState },
    ];
    const isOK = onValidate
      ? callfunc(onValidate, checkValidityParams)
      : this.compRef && this.compRef.checkValidity
      ? callfunc(this.compRef.checkValidity, checkValidityParams, this.compRef)
      : el.checkValidity();
    if (!isOK) {
      const state = { customState };
      for (let k in el.validity) {
        if (el.validity[k]) {
          state[k] = true;
        }
      }
      const onErrorParams = [{ el, state }];
      this.handleDisplayError(
        el,
        onError
          ? callfunc(onError, onErrorParams)
          : this.compRef && this.compRef.handleError
          ? callfunc(this.compRef.handleError, onErrorParams, this.compRef)
          : customState,
        el.validationMessage
      );
    } else {
      this.handleDisplayError(el, "");
    }

    // ignore isOK is undefined or null and think it's true
    return isOK == null || isOK;
  }

  handleDisplayError(el, message, nativeMessage) {
    const { onDisplayError } = this.props;
    if (onDisplayError) {
      callfunc(onDisplayError, [el, message || nativeMessage]);
    } else if (this.compRef && this.compRef.handleDisplayError) {
      this.compRef.handleDisplayError(el, message || nativeMessage);
    } else {
      if (message != null) {
        el.setCustomValidity(message);
      } else {
        el.reportValidity();
      }
    }
  }

  handleCompRef = (el) => {
    const { compRef } = this.props;
    this.compRef = el;
    callfunc(compRef, [el]);
  };

  handleEl = (el) => {
    const { refCb } = this.props;
    if (el) {
      const thisConstraintId = this.getConstraintId();
      el.setAttribute(constraintIdKey, thisConstraintId);
    }
    this.el = el;
    callfunc(refCb, [el]);
  };

  getConstraintId() {
    if (!this.constraintId) {
      const id = "constraint-" + constraintId;
      constraintId++;
      constraintObj[id] = this;
      this.constraintId = id;
    }
    return this.constraintId;
  }

  componentWillUnmount() {
    if (this.constraintId) {
      delete constraintObj[this.constraintId];
    }
  }

  render() {
    const {
      component,
      compRef,
      onValidate,
      onError,
      onDisplayError,
      ...otherProps
    } = this.props;
    otherProps[constraintIdKey] = this.getConstraintId();
    if (compRef) {
      // could pass compRef to true to force enable handleRef
      // this is for avoid pass ref to function component
      otherProps.ref = this.handleCompRef;
    }
    return build(component)({
      ...otherProps,
      refCb: this.handleEl,
    });
  }
}

class ConstraintForm extends PureComponent {
  state = { error: false };

  static defaultProps = {
    component: Form,
  };

  checkValidity() {
    const elements = [...this.form.elements];
    const results = {};
    let errorEl = null;
    const hasError = elements.some((el) => {
      const id = el.getAttribute(constraintIdKey);
      if (id && !results[id]) {
        const obj = constraintObj[id];
        if (obj) {
          results[id] = obj.checkValidity(el);
        } else {
          results[id] = true;
        }
        if (!results[id]) {
          errorEl = el;
          return true;
        }
      } else {
        if (el.checkValidity) {
          el.checkValidity();
          if (!el.validity.valid) {
            errorEl = el;
            el.reportValidity();
            return true;
          }
        }
      }
      return false;
    });
    return { hasError, errorEl, results };
  }

  submit() {
    this.getEl()?.dispatchEvent(new Event("submit"));
  }

  getEl() {
    return this.form;
  }

  getSerialize() {
    return formSerialize(this.form);
  }

  handleRefCb = (el) => {
    const { refCb } = this.props;
    this.form = el;
    callfunc(refCb, [el]);
  };

  handleSubmit = (e) => {
    const { onSubmit, stop } = this.props;
    if (stop) {
      e.preventDefault();
    }
    const { hasError } = this.checkValidity();
    if (hasError) {
      e.preventDefault();
      this.setState({ error: hasError });
    } else {
      e.instance = this;
      callfunc(onSubmit, [e]);
    }
  };

  render() {
    const { className, onSubmit, component, stop, ...otherProps } = this.props;
    const { error } = this.state;
    const classes = mixClass(className, {
      error,
    });

    return build(component)({
      ...otherProps,
      className: classes,
      refCb: this.handleRefCb,
      onSubmit: this.handleSubmit,
    });
  }
}

export { ConstraintField };
export default ConstraintForm;
