//@ts-check
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import build, { mergeRef } from "reshow-build";
import get from "get-object-value";
import { mixClass } from "class-lib";
import callfunc, { getEventKey } from "call-func";
import { UNDEFINED } from "reshow-constant";
import { doc } from "win-doc";
import { useTimer } from "reshow-hooks";

/**
 * @typedef {object} FilterEvent
 * @property {any} [item]
 * @property {object} [suggestion]
 * @property {string} [inputValue]
 * @property {string} [inputName]
 */

/**
 * @typedef {object} ValueData
 * @property {string} value
 * @property {string} prevValue
 * @property {number} selIndex
 * @property {FilterEvent} event
 */

/**
 * @type {ValueData}
 */
const defaultValueData = {
  value: "",
  prevValue: "",
  selIndex: 0,
  event: {},
};

/**
 * @param {any[]} arr
 * @param {string} currentValue
 * @param {function} itemLocator
 * @returns {any[]}
 */
const defaultItemFilter = (arr, currentValue, itemLocator) => {
  /**
   * @param {string} d
   * @param {string} value
   * @returns {boolean}
   */
  const doFilter = (d, value) =>
    value &&
    d &&
    -1 !== (d + "").toLowerCase().indexOf((value + "").toLowerCase());
  return arr.filter((d) => doFilter(itemLocator(d), currentValue));
};

/**
 * @param {any} d
 * @returns {any}
 */
const defaultItemLocator = (d) => d || "";

/**
 * @param {any} d
 * @returns {any}
 */
const defaultItemsLocator = (d) => d ?? [];

/**
 * @typedef {object} FilterResultProps
 * @property {string} [value]
 * @property {object} [results]
 * @property {boolean} [filter]
 * @property {number} [preview]
 * @property {boolean} [bShouldRenderSuggestions]
 * @property {CallableFunction} [itemsLocator]
 * @property {CallableFunction} [itemFilter]
 * @property {CallableFunction} [valueLocator]
 */
/**
 * @param {FilterResultProps} props
 */
const useFilterResult = (props) => {
  const lastResults = useRef([]);
  const {
    bShouldRenderSuggestions,
    value,
    itemsLocator = defaultItemsLocator,
    itemFilter = defaultItemFilter,
    valueLocator,
    preview: propsPreview,
    filter: propsFilter,
    results: propsResults,
  } = props || {};

  /**
   * @typedef {object} FilterResultHandler
   * @property {function} preview
   * @property {function} results
   */

  /**
   * @type {FilterResultHandler}
   */
  const handler = {
    preview: ({
      propsResults,
      propsPreview,
      itemsLocator,
      itemFilter,
      value,
    }) => {
      let arr = itemsLocator(propsResults);
      if (!arr || !arr.length) {
        return [];
      }
      if (!value && propsPreview) {
        const previewNum = "number" !== typeof propsPreview ? 5 : propsPreview;
        arr = arr.slice(0, previewNum);
      } else {
        arr = itemFilter(arr, value, valueLocator);
      }
      return arr;
    },
    /**
     * @returns {object}
     */
    results: ({
      itemsLocator,
      itemFilter,
      propsPreview,
      propsResults,
      propsFilter,
      value,
    }) => {
      let results = null;
      results = propsFilter
        ? handler.preview({
            propsPreview,
            propsResults,
            value,
            itemsLocator,
            itemFilter,
          })
        : propsResults;
      return results;
    },
  };
  lastResults.current = bShouldRenderSuggestions
    ? handler.results({
        itemsLocator,
        itemFilter,
        propsPreview,
        propsResults,
        propsFilter,
        value,
      })
    : null;
  return lastResults;
};

/**
 * @typedef {object} FilterProps
 * @property {any} component
 * @property {React.Ref<any>} [ref]
 * @property {boolean} [disabled]
 * @property {boolean} [itemClickToClose]
 * @property {boolean} [wrapperClickToFocus]
 * @property {boolean} [couldCreate]
 * @property {CallableFunction} [refCb]
 * @property {CallableFunction} [wrapperRefCb]
 * @property {string} [className]
 * @property {string} [name]
 * @property {CallableFunction} [shouldRenderSuggestions]
 * @property {CallableFunction} [onChange]
 * @property {CallableFunction} [onFocus]
 * @property {CallableFunction} [onBlur]
 * @property {CallableFunction} [onKeyDown]
 * @property {CallableFunction} [onItemClick]
 * @property {CallableFunction} [onWrapperClick]
 * @property {CallableFunction|boolean} [onSubmit]
 *
 * @property {boolean} [filter]
 * @property {number} [preview]
 * @property {object} [results]
 * @property {function} [itemsLocator]
 * @property {function} [itemLocator]
 * @property {function} [valueLocator]
 * @property {function} [itemFilter]
 */

/**
 * @param {FilterProps} props
 */
const useFilter = (props) => {
  const lastProps = useRef(props);
  const {
    component,
    name,
    onChange,
    onKeyDown,
    onItemClick,
    onWrapperClick,
    onSubmit,
    onFocus,
    onBlur,
    refCb,
    wrapperRefCb,
    className,
    itemLocator,
    itemsLocator,
    itemFilter,
    valueLocator,
    couldCreate,
    shouldRenderSuggestions,
    itemClickToClose,
    wrapperClickToFocus,
    disabled: propsDisabled,
    preview: propsPreview,
    filter: propsFilter,
    results: propsResults,
    ...otherProps
  } = lastProps.current;

  const [runResetValue, stopResetValue] = useTimer();
  const [runClose, stopRunClose] = useTimer();
  const [runSubmit, stopRunSubmit] = useTimer();
  const [runCouldCreate, stopRunCouldCreate] = useTimer();
  const [stateIsOpen, setStateIsOpen] = useState(false);
  const [stateDisabled, setStateDisabled] = useState(false);
  const [stateValueData, setStateValueData] = useState(defaultValueData);
  const lastState = useRef({
    isOpen: false,
    disabled: false,
    ...defaultValueData,
  });
  const lastOriginalValue = useRef("");
  const thisInput = useRef();
  const thisInputWrapper = useRef();
  useEffect(() => {
    if (lastState.current.disabled !== propsDisabled) {
      expose.disabled(propsDisabled);
    }
  }, [propsDisabled]);
  useEffect(() => {
    expose.close();
    lastState.current.disabled = stateDisabled;
    expose.blur();
  }, [stateDisabled]);
  useEffect(() => {
    lastState.current.isOpen = stateIsOpen;
  }, [stateIsOpen]);
  useEffect(() => {
    lastState.current = {
      ...lastState.current,
      ...stateValueData,
    };
    const { onChange, name } = lastProps.current;
    const { event } = stateValueData;
    event.inputName = name;
    event.inputValue = expose.getValue();
    event.suggestion = this;
    callfunc(onChange, [event]);
  }, [stateValueData]);
  useEffect(() => {
    expose.close();
  }, []);

  /**
   * @typedef {object} FilterHandler
   * @property {function} valueLocator
   * @property {function} change
   * @property {function} clearTimer
   * @property {function} blur
   * @property {function} focus
   * @property {function} resetValue
   * @property {function} couldCreate
   * @property {function} wrapperClick
   * @property {function} itemClick
   * @property {function} keyDown
   * @property {function} refCb
   * @property {function} wrapperRefCb
   * @property {EventListener} close
   */

  /**
   * @type {FilterHandler}
   */
  const handler = {
    /**
     * @param {any} rawItem
     */
    valueLocator: (rawItem) => {
      const { valueLocator, itemLocator = defaultItemLocator } =
        lastProps.current;
      let itemValue = itemLocator(rawItem);
      if (valueLocator) {
        itemValue = callfunc(valueLocator, [itemValue]);
      }
      return itemValue;
    },

    /**
     * @param {Event} e
     */
    change: (e) => {
      const { isOpen } = lastState.current;
      const value = get(e, ["target", "value"], "");
      expose.setValue(value, e);
      if (!isOpen) {
        expose.open();
      }
    },

    clearTimer: () => {
      stopRunClose();
      stopRunSubmit();
      stopRunCouldCreate();
      stopResetValue();
    },

    /**
     * @param {Event} e
     */
    blur: (e) => {
      handler.clearTimer();
      runCouldCreate(() => {
        const isOpen = lastState.current.isOpen;
        const onBlur = lastProps.current.onBlur;
        if (!isOpen) {
          const next = handler.couldCreate();
          if (!next.value) {
            handler.resetValue(next.originalValue, e);
          }
          callfunc(onBlur, [e]);
        }
      }, 200);
    },

    /**
     * @param {Event} e
     */
    focus: (e) => {
      const { onFocus, couldCreate } = lastProps.current;
      expose.open(e);
      expose.focus();
      if (!couldCreate && lastOriginalValue.current) {
        expose.setValue(lastOriginalValue.current, e);
        lastOriginalValue.current = null;
      }
      callfunc(onFocus, [e]);
    },

    /**
     * @param {string} value
     * @param {Event} e
     */
    resetValue: (value, e) => {
      lastOriginalValue.current = value;
      runResetValue(() => {
        expose.setValue("", e, false);
      });
    },

    couldCreate: () => {
      const { couldCreate, results, itemsLocator } = lastProps.current;
      const { value: originalValue } = lastState.current;
      let value = originalValue;
      if (!couldCreate) {
        const arr = itemsLocator(results);
        if (arr && arr.length) {
          const isIn = arr.some((/** @type {any}*/ a) => {
            if (handler.valueLocator(a) === value) {
              return true;
            } else {
              return false;
            }
          });
          if (!isIn) {
            value = "";
          }
        } else {
          value = "";
        }
      }
      return {
        value,
        originalValue,
      };
    },

    /**
     * @param {Event} e
     */
    wrapperClick: (e) => {
      const { wrapperClickToFocus, onWrapperClick } = lastProps.current;
      wrapperClickToFocus && expose.focus();
      callfunc(onWrapperClick, [e]);
    },

    /**
     * @param {Event&FilterEvent} e
     * @param {any} item
     */
    itemClick: (e, item) => {
      const { itemClickToClose, onItemClick } = lastProps.current;
      if (item) {
        e.item = item;
      }
      e.suggestion = expose;
      const isContinue = callfunc(onItemClick, [e]);
      if (itemClickToClose && false !== isContinue) {
        expose.setValue(handler.valueLocator(e.item));
        expose.submit(e);
      }
    },

    /**
     * @param {Event&FilterEvent} e
     */
    keyDown: (e) => {
      const { onKeyDown } = lastProps.current;
      const isContinue = callfunc(onKeyDown, [e]);
      if (false === isContinue) {
        return isContinue;
      }
      setStateValueData((prev) => {
        let selIndex = prev.selIndex;
        switch (getEventKey(e)) {
          case 38:
          case "ArrowUp":
            selIndex--;
            if (selIndex < 0) {
              selIndex = 0;
            }
            break;
          case 40:
          case "ArrowDown":
            selIndex++;
            if (
              !lastResults ||
              !lastResults.current.length ||
              lastResults.current.length <= selIndex
            ) {
              selIndex = 0;
            }
            break;
          case 27:
          case "Escape":
            if (lastState.current.prevValue || lastState.current.value) {
              e.preventDefault();
              e.stopPropagation();
              setTimeout(() => expose.setValue(""));
            }
            break;
          case 39:
          case "ArrowRight":
          case 13:
          case "Enter":
            e.preventDefault();
            if (lastResults.current && lastResults.current.length) {
              setTimeout(() => {
                handler.itemClick(e, get(lastResults.current, [selIndex]));
              });
            } else {
              expose.submit(e);
            }
        }
        return { ...prev, selIndex };
      });
    },

    /**
     * @param {HTMLInputElement} el
     */
    refCb: (el) =>
      mergeRef(el, [
        /**
         * @param {HTMLInputElement} el
         */
        (el) => {
          /** @type {HTMLInputElement} */ (thisInput.current) = el;
        },
        refCb,
      ]),

    /**
     * @param {HTMLElement} el
     */
    wrapperRefCb: (el) =>
      mergeRef(el, [
        /**
         * @param {HTMLElement} el
         */
        (el) => {
          /** @type {HTMLElement} */ (thisInputWrapper.current) = el;
        },
        refCb,
      ]),

    /**
     * @param {Event} e
     */
    close: (e) => {
      const target = /** @type {HTMLElement} */ (e.target);
      const wrapper = /** @type {HTMLElement} */ (thisInputWrapper.current);
      if (wrapper.contains(target)) {
        return;
      }
      expose.close();
    },
  };

  /**
   * @typedef {object} FilterExpose
   * @property {function} submit
   * @property {function} disabled
   * @property {function} close
   * @property {function} open
   * @property {function} getValue
   * @property {function} getSelIndex
   * @property {function} getIsOpen
   * @property {function} blur
   * @property {function} focus
   * @property {function} setValue
   */

  /**
   * @type {FilterExpose}
   */
  const expose = {
    /**
     * @param {Event & FilterEvent} e
     */
    submit: (e) => {
      const { onSubmit } = lastProps.current;
      if (false !== onSubmit) {
        expose.blur();
        stopRunClose();
        runClose(() => expose.close());
        stopRunSubmit();
        runSubmit(() => {
          e.inputValue = expose.getValue();
          callfunc(onSubmit, [e]);
        }, 300);
      }
    },
    /**
     * @param {boolean} bool
     */
    disabled: (bool) => {
      if (UNDEFINED === typeof bool) {
        bool = true;
      }
      if (bool !== lastState.current.disabled) {
        setStateDisabled(bool);
      }
    },
    close: () => {
      doc()?.removeEventListener("click", handler.close);
      setStateIsOpen(false);
    },
    /**
     * @param {Event} [e]
     */
    open: (e) => {
      const { isOpen, disabled } = lastState.current;
      if (isOpen || disabled) {
        return;
      }
      doc()?.addEventListener("click", handler.close);
      expose.setValue(undefined, e, true);
    },
    getValue: () => lastState.current.value,
    getSelIndex: () => lastState.current.selIndex,
    getIsOpen: () => lastState.current.isOpen,
    blur: () => {
      /** @type {HTMLElement}*/ (thisInput.current)?.blur();
    },
    focus: () => {
      /** @type {HTMLElement}*/ (thisInput.current)?.focus();
    },
    /**
     * @param {string} [value]
     * @param {object} [e]
     * @param {boolean} [isOpen]
     */
    setValue: (value, e, isOpen) => {
      const input = /** @type {HTMLInputElement} */ (thisInput.current);
      if (!e) {
        e = { target: input, currentTarget: input };
      }
      const nextState = {
        value,
        selIndex: 0,
        prevValue: value && input.value,
        event: e,
      };
      if (UNDEFINED === typeof value) {
        nextState.value = input.value;
      }
      setStateValueData(nextState);
      if (isOpen || false === isOpen) {
        setStateIsOpen(isOpen);
      }
    },
  };

  const classes = mixClass(className, get(component, ["props", "className"]), {
    propsDisabled,
  });

  const bShouldRenderSuggestions = !shouldRenderSuggestions
    ? stateIsOpen
    : callfunc(shouldRenderSuggestions, [expose]);

  const lastResults = useFilterResult({
    value: stateValueData.value,
    results: propsResults,
    filter: propsFilter,
    preview: propsPreview,
    bShouldRenderSuggestions,
    itemsLocator,
    itemFilter,
    valueLocator: handler.valueLocator,
  });

  return {
    handler,
    expose,
    component,
    name,
    otherProps,
    isOpen: stateIsOpen,
    nextProps: {
      value: lastState.current.value,
      "data-name": name,
      "data-value": lastState.current.value,
      className: classes,
      onChange: handler.change,
      onFocus: handler.focus,
      onBlur: handler.blur,
      refCb: handler.refCb,
      wrapperRefCb: handler.wrapperRefCb,
      onWrapperClick: handler.wrapperClick,
      onItemClick: handler.itemClick,
      onKeyDown: handler.keyDown,
      results: lastResults.current,
      itemLocator,
      itemsLocator,
    },
  };
};

/**
 * @type React.FC<FilterProps>
 * @returns {React.ReactElement}
 */
export const Filter = forwardRef((props, ref) => {
  const { expose, component, name, isOpen, nextProps, otherProps } =
    useFilter(props);
  useImperativeHandle(ref, () => expose, []);
  return build(component)({
    ...otherProps,
    ...nextProps,
    name: isOpen ? null : name, // disalbe autofill
  });
});

Filter.displayName = "Filter";
