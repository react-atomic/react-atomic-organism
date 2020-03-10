import React, {PureComponent} from 'react';
import {mixClass, build, Form, Field} from 'react-atomic-molecule';
import callfunc from 'call-func';
import formSerialize from 'form-serialize-js';

let constraintId = 0;
const constraintObj = {};
const keys = Object.keys;

class ConstraintField extends PureComponent {
  state = {constraintId: null};

  static defaultProps = {
    component: Field,
  };

  checkValidity(el) {
    const {onValidate, onError} = this.props;
    el = el || this.el;
    let customState;
    const setCustomState = s => (customState = s);
    const isOK = onValidate
      ? callfunc(onValidate, [el, this, setCustomState])
      : el.checkValidity();
    if (!isOK) {
      this.handleDisplayError(
        el,
        onError
          ? callfunc(onError, [{el, state: {...el.validity, customState}}])
          : customState,
        el.validationMessage,
      );
    } else {
      this.handleDisplayError(el, '');
    }
    return isOK;
  }

  handleDisplayError(el, message, nativeMessage) {
    const {onDisplayError} = this.props;
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

  handleCompRef = el => {
    const {compRef} = this.props;
    this.compRef = el;
    callfunc(compRef, [el]);
  };

  handleEl = el => {
    const {refCb} = this.props;
    this.el = el;
    callfunc(refCb, [el]);
  };

  componentDidMount() {
    const id = 'constraint-' + constraintId;
    constraintId++;
    constraintObj[id] = this;
    this.setState({
      constraintId: id,
    });
  }

  componentWillUnmount() {
    delete constraintObj[this.state.constraintId];
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
    const {constraintId} = this.state;
    if (constraintId) {
      otherProps['data-constraint-id'] = constraintId;
    }
    if (compRef) {
      otherProps.ref = this.handleCompRef;
    }
    return build(component)({
      ...otherProps,
      refCb: this.handleEl,
    });
  }
}

class ConstraintForm extends PureComponent {
  state = {error: false};

  static defaultProps = {
    component: Form,
  };

  getEl() {
    return this.form;
  }

  getSerialize() {
    return formSerialize(this.form);
  }

  checkValidity() {
    const elements = [...this.form.elements];
    const results = {};
    let errorEl = null;
    const hasError = elements.some(el => {
      const id = el.getAttribute('data-constraint-id');
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
      }
      return false;
    });
    return {hasError, errorEl};
  }

  handleRefCb = el => {
    const {refCb} = this.props;
    this.form = el;
    callfunc(refCb, [el]);
  };

  handleSubmit = e => {
    const {onSubmit, stop} = this.props;
    if (stop) {
      e.preventDefault();
    }
    const {hasError} = this.checkValidity();
    if (hasError) {
      e.preventDefault();
      this.setState({error: hasError});
    } else {
      e.instance = this;
      callfunc(onSubmit, [e]);
    }
  };

  render() {
    const {className, onSubmit, component, stop, ...otherProps} = this.props;
    const {error} = this.state;
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

export {ConstraintField};
export default ConstraintForm;
