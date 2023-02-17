// @ts-check

import { mixClass } from "class-lib";
import { useTimer } from "reshow-hooks";
import { doc } from "win-doc";
import { useState, useEffect, useRef } from "react";
import get from "get-object-value";

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
 * @typedef {object} DropdownData
 * @property {string} className
 * @property {object} listStyle
 * @property {object} handler
 * @property {boolean} hideList
 * @property {object} restProps
 */

/**
 * @param {DropdownProps} props
 * @returns {DropdownData}
 */
export const useDropdown = (props) => {
  const {
    simple = true,
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
  const handleClose = useRef(/** @type EventListener*/ (null));
  const thisEl = useRef(/** @type HTMLElement*/ (null));
  const listEl = useRef(/** @type HTMLElement*/ (null));
  const isActive = useRef(/** @type Boolean*/ (null));
  const isListClick = useRef(/** @type Boolean*/ (null));
  const [stateListStyle, setStateListStyle] = useState({});
  const [hideList, setHideList] = useState(false);
  useEffect(() => {
    handleClose.current = (e) => {
      const target = e.target;
      if (thisEl.current.contains(/** @type HTMLElement*/ (target))) {
        return;
      }
      expose.close();
    };
    if (alwaysOpen) {
      expose.open();
    }
    return () => {
      if (!simple) {
        doc().removeEventListener("click", handleClose.current);
      }
    };
  }, []);

  /**
   * @typedef {object} DropdownExpose
   * @property {Function} open
   * @property {Function} close
   * @property {Function} isOpen
   */

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
      doc().addEventListener("click", handleClose.current);
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
      doc().removeEventListener("click", handleClose.current);
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
   * @typedef {object} DropdownHandler
   * @property {React.Ref<any>} thisEl
   * @property {React.Ref<any>} listEl
   * @property {Function} dropdownClick
   * @property {Function} listClick
   * @property {Function} touchStart
   */

  /**
   * @type DropdownHandler
   */
  const handler = {
    thisEl,
    listEl,
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
    hideList,
  };
};
