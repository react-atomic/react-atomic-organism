// @ts-check

import { useState, useEffect, useRef } from "react";
import callfunc from "call-func";
import defaultLocator from "../defaultLocator";

/**
 * @typedef {object} SelectBaseEvent
 * @property {string} [value]
 * @property {Object} [selected]
 * @property {Object} [item]
 */

/**
 * @typedef {SelectBaseEvent | SelectBaseEvent & Event} SelectEvent
 */

/**
 * @typedef {object} SelectHandler
 * @property {Function} select
 */

/**
 * @typedef {object} SelectExpose
 * @property {Function} getValue
 * @property {Function} select
 */

/**
 * @typedef {object} SelectData
 * @property {SelectHandler} handler
 * @property {SelectExpose} expose
 * @property {Function} labelLocator
 * @property {Function} valueLocator
 * @property {object} [restProps]
 */

/**
 * @typedef {object} SelectProps
 * @property {any} value
 * @property {any} defaultValue
 * @property {Function} labelLocator
 * @property {Function} valueLocator
 * @property {Function} onChange
 * @property {Function} onBeforeChange
 */

/**
 * @param {SelectProps} props
 * @returns {SelectData};
 */
export const useSelect = (props) => {
  const {
    value: propsValue,
    defaultValue,
    labelLocator = defaultLocator.label,
    valueLocator = defaultLocator.value,
    onChange,
    onBeforeChange,
    ...restProps
  } = props;
  const thisValue = propsValue ?? defaultValue;
  const lastEvent = useRef(/** @type SelectEvent*/ (null));
  const lastValue = useRef(null);
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(thisValue);
  }, [thisValue]);
  useEffect(() => {
    lastValue.current = value;
    if (lastEvent.current != null) {
      callfunc(onChange, [lastEvent.current]);
    }
  }, [value]);

  /**
   * @type SelectHandler
   */
  const handler = {
    select:
      (/** @type any*/ item) =>
      (/** @type SelectEvent*/ e = {}) => {
        const value = valueLocator(item);
        const selected = labelLocator(item);
        e.value = value;
        e.selected = selected;
        e.item = item;
        lastEvent.current = e;
        const isContinue = callfunc(onBeforeChange, [e]);
        if (false !== isContinue) {
          setValue(value);
        }
      },
  };

  /**
   * @type SelectExpose
   */
  const expose = {
    getValue: () => lastValue.current,
    select: handler.select,
  };
  return { handler, expose, labelLocator, valueLocator, restProps };
};
