import React, { useRef, useState } from "react";
import seturl, { getUrl } from "seturl";
import SortIcon from "ricon/Sort";
import Dropdown from "ricon/Dropdown";
import { build, SemanticUI, Icon } from "react-atomic-molecule";
import get from "get-object-value";
import { doc } from "win-doc";
import callfunc from "call-func";

const useSortLink = (props) => {
  const {
    "data-sort": nextSort = "",
    component = "a",
    sortKeyName = "sort",
    icon = true,
    iconStyle,
    children,
    onClick,
    sort: currentSort,
    desc,
    ...others
  } = props;
  const lastProps = useRef({});

  lastProps.current = {
    ...props,
    currentSort,
    nextSort,
  };

  const isSorted = () => {
    const { nextSort, currentSort } = lastProps.current;
    return nextSort === currentSort;
  };

  const getNextDesc = (thisDesc) => {
    thisDesc = thisDesc ?? lastProps.current.desc ?? getUrl("desc");
    let nextDesc;
    const bSorted = isSorted();
    if (bSorted) {
      nextDesc = 0 === thisDesc * 1 ? 1 : 0;
    } else {
      nextDesc = 1;
    }
    return nextDesc;
  };

  const [{ href: stateHref, desc: stateDesc }, setState] = useState(() => {
    return { href: "#" + nextSort, desc: !getNextDesc() * 1 };
  });
  others["data-sort"] = nextSort;
  others["data-desc"] = stateDesc;

  const handler = {
    click: (e) => {
      const { sortKeyName, onClick } = lastProps.current;
      const target = e.currentTarget;
      const nextDesc = getNextDesc(target.getAttribute("data-desc"));
      target.setAttribute("data-desc", nextDesc);
      const nextSort = target.getAttribute("data-sort");
      const sort2 = target.getAttribute("data-sort2");
      const slice = target.getAttribute("data-slice");

      /**
       * Call before get data-url
       * because onclick possible change url.
       */
      e.nextSort = nextSort;
      e.nextDesc = nextDesc;
      const isContinue = callfunc(onClick, [e]);
      // end call onClick --->

      let url = target.getAttribute("data-url") || doc().URL;
      if (nextSort) {
        url = seturl(sortKeyName, nextSort, url);
        url = seturl("desc", nextDesc, url);
      }
      if (sort2) {
        url = seturl("sort2", sort2, url);
        url = seturl("slice", slice, url);
      }
      target.href = url;
      setState({ href: url, desc: nextDesc });
      return isContinue;
    },
  };

  return {
    children,
    component,
    handler,
    href: stateHref,
    desc: stateDesc,
    icon,
    iconStyle,
    isSorted,
    getNextDesc,
    others,
  };
};

const SortLink = (props) => {
  const {
    children,
    component,
    handler,
    href,
    desc,
    icon,
    iconStyle,
    isSorted,
    getNextDesc,
    others,
  } = useSortLink(props);
  let child = children;
  if (icon) {
    const bSorted = isSorted();
    const thisIcon = bSorted ? (
      <Dropdown type={desc ? null : "up"} />
    ) : (
      <SortIcon style={{ ...Styles.sortIcon, ...iconStyle }} />
    );
    child = (
      <SemanticUI style={Styles.inner}>
        {children}
        <Icon style={Styles.icon}>{thisIcon}</Icon>
      </SemanticUI>
    );
  }
  return build(component)(
    {
      ...others,
      onClick: handler.click,
      href,
    },
    child
  );
};

export default SortLink;

const Styles = {
  sortIcon: {
    fill: "#ccc",
  },
  icon: {
    width: 12,
    height: 12,
  },
  inner: {
    whiteSpace: "nowrap",
  },
};
