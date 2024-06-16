// @ts-check
import {
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  useEffect,
  forwardRef,
} from "react";
import { mixClass, build } from "react-atomic-molecule";
import { useRefUpdate } from "reshow-hooks";
import callfunc from "call-func";
import formSerialize from "form-serialize-js";
import { getSN } from "get-random-id";
import { NEW_OBJ } from "reshow-constant";

/**
 * @typedef {import("reshow-build").Component} Component
 */

/**
 * @typedef {import("reshow-build").RefType} RefType
 */

/**
 * @typedef {Element&object} ValidityElement
 * @property {Function} checkValidity
 * @property {Function} reportValidity
 */

/**
 * @typedef {Element&object} FormElement
 * @property {form} HTMLFormElement
 */

const constraintObj = NEW_OBJ();
const constraintIdKey = "data-constraint-id";

/**
 * @typedef {object} ConstraintFieldProps
 * @property {boolean=} builtInOnly
 * @property {RefType=} compRef
 * @property {Function=} onDisplayError
 * @property {boolean=} hideMessageComponent
 * @property {Function=} onValidate
 * @property {Function=} onError
 * @property {RefType=} ref
 * @property {RefType=} refCb
 * @property {Component=} component
 */

/**
 * @param {ConstraintFieldProps} props
 */
const useConstraintField = (props) => {
  const lastProps = useRefUpdate(props);
  const { builtInOnly, compRef, ...restProps } = lastProps.current;
  const lastComp = /** @type any */ (useRef());
  const lastEl = /** @type any */ (useRef());
  const [state, setState] = useState({});

  const handler = {
    /**
     * @param {FormElement} el
     * @param {string} message
     * @param {string} nativeMessage
     */
    displayError: (el, message, nativeMessage) => {
      const { onDisplayError, hideMessageComponent } = lastProps.current;
      const hideMessage =
        el.form.getAttribute("data-hide-message-component") ||
        hideMessageComponent;
      if ("" !== message) {
        setState({
          "data-message-type": "error",
          "data-message": hideMessage ? null : message,
        });
      } else {
        setState({
          "data-message-type": null,
          "data-message": null,
        });
      }
      if (onDisplayError) {
        callfunc(onDisplayError, [el, message || nativeMessage]);
      } else if (expose.getComponent()?.handleDisplayError) {
        expose.getComponent().handleDisplayError(el, message || nativeMessage);
      } else {
        if (message != null) {
          el.setCustomValidity(message);
        }
        el.reportValidity();
      }
    },
    /**
     * @param {Element} el
     */
    el: (el) => {
      const { refCb } = lastProps.current;
      lastEl.current = el;
      callfunc(refCb, [el]);
    },
    /**
     * @param {any} el
     */
    compRef: (el) => {
      const { compRef } = lastProps.current;
      lastComp.current = el;
      callfunc(compRef, [el]);
    },
  };
  const expose = {
    checkValidity: (/**@type any*/ el) => {
      const { onValidate, onError } = lastProps.current;
      el = el || expose.getEl();
      let customState;
      const setCustomState = (/**@type any*/ s) => (customState = s);
      const checkValidityParams = [
        { el, constraintField: this, setState: setCustomState },
      ];
      const isOK = onValidate
        ? callfunc(onValidate, checkValidityParams)
        : expose.getComponent()?.checkValidity
          ? callfunc(
              expose.getComponent()?.checkValidity,
              checkValidityParams,
              expose.getComponent(),
            )
          : el.checkValidity();
      if (!isOK) {
        const state = { customState };
        for (let k in el.validity) {
          if (el.validity[k]) {
            state[k] = true;
          }
        }
        const onErrorParams = [{ el, state }];
        handler.displayError(
          el,
          onError
            ? callfunc(onError, onErrorParams)
            : expose.getComponent()?.handleError
              ? callfunc(
                  expose.getComponent().handleError,
                  onErrorParams,
                  expose.getComponent(),
                )
              : customState,
          el.validationMessage,
        );
      }
      // ignore isOK is `undefined` or `null` and trust it's true
      const lastIsOK = isOK == null || isOK;

      if (lastIsOK) {
        handler.handleDisplayError(el, "");
      }
      return lastIsOK;
    },
    /**
     * @returns {HTMLElement}
     */
    getEl: () => {
      return lastEl.current;
    },
    getComponent: () => {
      if (builtInOnly) {
        return lastEl.current;
      } else {
        return lastComp.current;
      }
    },
  };

  const thisConstraintId = useMemo(() => {
    const id = getSN("constraint");
    constraintObj[id] = expose;
    return id;
  }, []);
  useEffect(() => {
    return () => {
      delete constraintObj[thisConstraintId];
    };
  }, []);
  const nextCommonProps = {
    ...state,
    ...restProps,
    [constraintIdKey]: thisConstraintId,
  };
  const nextProps = builtInOnly
    ? { ...nextCommonProps, ref: handler.el }
    : { ...nextCommonProps, refCb: handler.el };
  if (!builtInOnly && compRef) {
    nextProps.ref = handler.compRef;
  }
  return { nextProps, expose };
};

const ConstraintField = forwardRef((props, ref) => {
  const { nextProps, expose } = useConstraintField(props);
  const { component, ...restProps } = nextProps;
  useImperativeHandle(ref, () => expose, []);
  return build(component)({
    ...restProps,
  });
});

/**
 * @typedef {object} ConstraintFormProps
 * @property {string=} className
 * @property {boolean=} builtInOnly
 * @property {Component=} component
 * @property {Function=} onSubmit
 * @property {RefType=} refCb
 */

/**
 * @param {ConstraintFormProps} props
 */
const useConstraintForm = (props) => {
  /**
   * @type HTMLFormElement
   */
  const lastEl = /** @type any */ (useRef());
  const lastProps = useRefUpdate(props);
  const { className, builtInOnly, ...restProps } = lastProps.current || {};

  const [hasError, setHasError] = useState(false);
  const classes = mixClass(className, {
    error: hasError,
  });
  const expose = {
    checkValidity: () => {
      const elements = [.../**@type any*/ (expose.getEl().elements)];
      const results = {};
      let errorEl = null;
      const hasError = elements.some((/**@type ValidityElement*/ el) => {
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
    },
    /**
     * @returns {HTMLFormElement}
     */
    getEl: () => {
      return lastEl.current;
    },
    submit: () => {
      expose.getEl()?.dispatchEvent(new Event("submit", { bubbles: true }));
    },
    getSerialize: () => {
      return formSerialize(expose.getEl());
    },
  };
  const handler = {
    /**
     * @typedef {SubmitEvent&object} ConstraintFormSubmitEvent
     * @property {any} instance
     */
    /**
     * @param {ConstraintFormSubmitEvent} e
     */
    submit: (e) => {
      const { onSubmit } = lastProps.current;
      e.preventDefault();
      const { hasError } = expose.checkValidity();
      if (hasError) {
        setHasError(hasError);
      } else {
        e.instance = expose;
        const isContinue = callfunc(onSubmit, [e]);
        if (false !== isContinue) {
          expose.getEl().submit();
        }
      }
    },
    el: (/**@type HTMLFormElement*/ el) => {
      const { refCb } = lastProps.current;
      lastEl.current = el;
      callfunc(refCb, [el]);
    },
  };
  const nextProps = builtInOnly
    ? { ...restProps, ref: handler.el }
    : { ...restProps, refCb: handler.el };

  return { className: classes, handler, expose, nextProps };
};

const ConstraintForm = forwardRef((props, ref) => {
  const { className, handler, expose, nextProps } = useConstraintForm(props);
  const { component = "fieldset", ...restProps } = nextProps;
  useImperativeHandle(ref, () => expose, []);
  return build(component)({
    ...restProps,
    className,
    onSubmit: handler.submit,
  });
});

export { ConstraintField };
export default ConstraintForm;
