import { useRef, useEffect } from "react";
import { queryFrom } from "css-query-selector";
import getoffset from "getoffset";

const useScrollToSelect = (props = []) => {
  const lastRoot = useRef();
  useEffect(() => {
    const selectEl = queryFrom(lastRoot.current).one(".selected");
    if (selectEl) {
      const menuEl = queryFrom(lastRoot.current).one(".menu");
      const selOffset = getoffset(selectEl, menuEl);
      menuEl.scrollTop = selOffset.top - selOffset.scrollInfo.scrollNodeHeight;
    }
  }, [props["data-selected-index"]]);
  return [lastRoot];
};

export default useScrollToSelect;
