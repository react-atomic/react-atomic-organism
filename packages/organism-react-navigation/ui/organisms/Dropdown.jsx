import { useState, useEffect, useRef, useCallback } from "react";

import get from "get-object-value";

import { mixClass } from "react-atomic-molecule";
import { useTimer } from "reshow-hooks";
import { doc } from "win-doc";

import DropdownUI from "../molecules/DropdownUI";

const useDropdown = (props) => {
  const {
    simple = true,
    alwaysOpen,
    right,
    upward,
    item,
    list,
    listStyle: propsListStyle,
    className,
    ...restProps
  } = props;
  const [titleTimer] = useTimer();
  const [menuTimer] = useTimer();
  const handleClose = useRef();
  const thisEl = useRef();
  const listEl = useRef();
  const isActive = useRef();
  const isListClick = useRef();
  const [stateListStyle, setStateListStyle] = useState({});
  const [hideList, setHideList] = useState(false);
  useEffect(() => {
    handleClose.current = (e) => {
      const target = e.target;
      if (thisEl.current.contains(target)) {
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

  const handler = {
    thisEl,
    listEl,
    dropdownClick: (e) => {
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
    listClick: (e) => {
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
    ...restProps,
    handler,
    className: thisClass,

    /* Styles */
    propsListStyle,
    stateListStyle,

    /* Status */
    hideList,

    /* Component */
    list,
  };
};

const Dropdown = (props) => <DropdownUI {...useDropdown(props)} />;

export default Dropdown;
