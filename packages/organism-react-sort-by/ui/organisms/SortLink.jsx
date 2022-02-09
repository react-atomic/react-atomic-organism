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

  others["data-sort"] = nextSort;
  const [href, setHref] = useState(() => {
    return "#" + nextSort;
  });

  const handler = {
    click: (e) => {
      const { sortKeyName, onClick } = lastProps.current;
      const nextDesc = getNextDesc();
      const target = e.currentTarget;
      const nextSort = target.getAttribute("data-sort");
      const sort2 = target.getAttribute("data-sort2");
      const slice = target.getAttribute("data-slice");
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
      e.nextSort = nextSort;
      e.nextDesc = nextDesc;
      callfunc(onClick, [e]);
      setHref(url);
    },
  };

  const isSorted = () => {
    const { nextSort, currentSort } = lastProps.current;
    return nextSort === currentSort;
  };

  const getNextDesc = () => {
    const thisDesc = lastProps.current.desc || getUrl("desc");
    let nextDesc;
    const bSorted = isSorted();
    if (bSorted) {
      nextDesc = 0 === thisDesc * 1 ? 1 : 0;
    } else {
      nextDesc = 1;
    }
    return nextDesc;
  };

  return {
    component,
    handler,
    href,
    icon,
    iconStyle,
    children,
    isSorted,
    getNextDesc,
    others,
  };
};

const SortLink = (props) => {
  const {
    component,
    handler,
    href,
    icon,
    iconStyle,
    children,
    isSorted,
    getNextDesc,
    others,
  } = useSortLink(props);
  let child = children;
  if (icon) {
    const bSorted = isSorted();
    const thisIcon = bSorted ? (
      <Dropdown type={getNextDesc() ? "up" : null} />
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
