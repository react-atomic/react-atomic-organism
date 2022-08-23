import { useRef, useEffect } from "react";
import { queryFrom } from "css-query-selector";
import getoffset from "getoffset";

const scrollToSelect = (selectEl, menuEl) => {
  if (selectEl) {
    const selOffset = getoffset(selectEl, menuEl);
    menuEl.scrollTop = selOffset.top - selOffset.scrollInfo.scrollNodeHeight;
  }
};

const useScrollToSelect = (props = []) => {
  const lastRoot = useRef();
  useEffect(() => {
    scrollToSelect(
      queryFrom(lastRoot.current).one(".selected"),
      queryFrom(lastRoot.current).one(".menu")
    );
  }, [props["data-selected-index"]]);
  return [lastRoot];
};

export default useScrollToSelect;
