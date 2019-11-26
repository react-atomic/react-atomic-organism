import React, {PureComponent} from 'react';
import {build, Form, Field} from 'react-atomic-molecule';
import callfunc from 'call-func';

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
    const isOK = onValidate
      ? callfunc(onValidate, [el, customState])
      : el.checkValidity();
    if (!isOK) {
      this.handleDisplayError(
        el,
        callfunc(onError, [{el, state: {...el.validity, customState}}]),
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
    const {component, compRef, onValidate, onError, onDisplayError, ...otherProps} = this.props;
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
  static defaultProps = {
    component: Form,
  };

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
    const elements = [...this.form.elements];
    const results = {};
    let hasError = elements.some(el => {
      const id = el.getAttribute('data-constraint-id');
      if (id && !results[id]) {
        const obj = constraintObj[id];
        if (obj) {
          results[id] = obj.checkValidity(el);
        } else {
          results[id] = true;
        }
        if (!results[id]) {
          e.preventDefault();
          return true;
        }
      }
      return false;
    });
    if (!hasError) {
      callfunc(onSubmit, [e]);
    }
  };

  render() {
    const {onSubmit, component, stop, ...otherProps} = this.props;
    return build(component)({
      ...otherProps,
      refCb: this.handleRefCb,
      onSubmit: this.handleSubmit,
    });
  }
}

export {ConstraintField};
export default ConstraintForm;
