import { useRef, useEffect } from "react";
import { queryFrom } from "css-query-selector";
import getoffset from "getoffset";

const scrollToSelect = (selectEl, menuEl, isTop) => {
  if (selectEl) {
    const selOffset = getoffset(selectEl, menuEl);
    if (isTop) {
      menuEl.scrollTop = 0;
    } else {
      menuEl.scrollTop = selOffset.top - selOffset.scrollInfo.scrollNodeHeight;
    }
  }
};

const useScrollToSelect = (props = []) => {
  const lastRoot = useRef();
  const selIndex = props["data-selected-index"];
  useEffect(() => {
    scrollToSelect(
      queryFrom(lastRoot.current).one(".selected"),
      queryFrom(lastRoot.current).one(".menu"),
      !selIndex
    );
  }, [selIndex]);
  return [lastRoot];
};

export default useScrollToSelect;
