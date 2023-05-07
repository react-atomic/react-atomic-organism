// @ts-check

import { mixClass } from "class-lib";
import { useTimer } from "reshow-hooks";
import { doc } from "win-doc";
import { useState, useEffect, useRef } from "react";
import get from "get-object-value";

/**
 * @typedef {object} DropdownHandler
 * @property {React.Ref<any>&import("react").MutableRefObject} thisEl
 * @property {React.Ref<any>&import("react").MutableRefObject} listEl
 * @property {import("react").MutableRefObject} isActive
 * @property {import("react").MouseEventHandler} dropdownClick
 * @property {Function} listClick
 * @property {Function} touchStart
 */

/**
 * @typedef {object} DropdownExpose
 * @property {Function} open
 * @property {Function} close
 * @property {Function} isOpen
 */

/**
 * @typedef {object} DropdownData
 * @property {string} className
 * @property {object} listStyle
 * @property {DropdownHandler} handler
 * @property {DropdownExpose} expose
 * @property {boolean} hideList
 * @property {object} restProps
 */

/**
 * @typedef {object} DropdownProps
 * @property {boolean} [simple]
 * @property {boolean} [alwaysOpen]
 * @property {boolean} [right]
 * @property {boolean} [upward]
 * @property {boolean} [item]
 * @property {string} [className]
 * @property {object} [listStyle]
 */

/**
 * @param {DropdownProps} props
 * @returns {DropdownData}
 */
export const useDropdown = (props) => {
  const {
    simple,
    alwaysOpen,
    right,
    upward,
    item,
    listStyle: propsListStyle,
    className,
    ...restProps
  } = props;
  const [titleTimer] = useTimer();
  const [menuTimer] = useTimer();
  /** @type {React.MutableRefObject<EventListener | unknown>} */
  const handleClose = useRef();
  /** @type {React.MutableRefObject<HTMLElement | unknown>} */
  const thisEl = useRef();
  /** @type {React.MutableRefObject<HTMLElement | unknown>} */
  const listEl = useRef();
  /** @type {React.MutableRefObject<Boolean | unknown>} */
  const isActive = useRef();
  /** @type {React.MutableRefObject<Boolean | unknown>} */
  const isListClick = useRef();
  const [stateListStyle, setStateListStyle] = useState({});
  const [hideList, setHideList] = useState(false);
  useEffect(() => {
    handleClose.current = (/** @type Event */e) => {
      const target = e.target;
      if (/** @type HTMLElement */(thisEl.current).contains(/** @type HTMLElement*/ (target))) {
        return;
      }
      expose.close();
    };
    if (alwaysOpen) {
      expose.open();
    }
    return () => {
      if (!simple) {
        doc().removeEventListener("click", /** @type EventListener*/ (handleClose.current));
      }
    };
  }, []);

  /**
   * @type DropdownExpose
   */
  const expose = {
    open: () => {
      const runTimeListStyle = {};
      if (simple) {
        runTimeListStyle.visibility = "hidden";
        titleTimer(() => {
          runTimeListStyle.visibility = "inherit";
          setStateListStyle({ ...runTimeListStyle });
        }, 300);
      }
      doc().addEventListener("click", /** @type EventListener*/ (handleClose.current));
      runTimeListStyle.display = "block";
      isActive.current = true;
      setStateListStyle(runTimeListStyle);
    },
    /**
     * @param {boolean} [force]
     */
    close: (force) => {
      if (alwaysOpen && !force) {
        return;
      }
      doc().removeEventListener("click", /** @type EventListener*/ (handleClose.current));
      isActive.current = false;
      setStateListStyle({});
    },
    isOpen: () => {
      if (simple) {
        return get(listEl.current, ["style", "display"]) !== "";
      } else {
        return isActive.current;
      }
    },
  };

  /**
   * @type DropdownHandler
   */
  const handler = {
    thisEl,
    listEl,
    isActive,
    dropdownClick: () => {
      if (!isListClick.current) {
        if (!expose.isOpen()) {
          expose.open();
        } else {
          expose.close();
        }
      } else {
        isListClick.current = false;
      }
    },
    listClick: () => {
      if (simple) {
        if (!expose.isOpen()) {
          setTimeout(() => {
            setHideList(true);
            menuTimer(() => setHideList(false), 500);
          });
        }
      } else {
        expose.close();
      }
      isListClick.current = true;
    },
    /**
     * @param {Event} e
     */
    touchStart: (e) => {
      if (!expose.isOpen()) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  const thisClass = mixClass(className, {
    active: isActive.current,
    simple,
    right,
    upward,
    item,
  });

  return {
    restProps,
    className: thisClass,
    listStyle: {
      ...propsListStyle,
      ...stateListStyle,
    },
    handler,
    expose,
    hideList,
  };
};
