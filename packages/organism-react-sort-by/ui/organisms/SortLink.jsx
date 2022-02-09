import React, { useCallback, useState } from "react";
import seturl, { getUrl } from "seturl";
import SortIcon from "ricon/Sort";
import Dropdown from "ricon/Dropdown";
import { build, SemanticUI, Icon } from "react-atomic-molecule";
import get from "get-object-value";
import { doc } from "win-doc";
import callfunc from "call-func";

const useSortLink = ({
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
}) => {
  const [href, setHref] = useState(() => {
    return "#" + nextSort;
  });
  const handler = {
    click: useCallback(
      (e) => {
        const nextDesc = util.getNextDesc();
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
      [onClick, sortKeyName]
    ),
  };
  const util = {
    isSorted: () => nextSort === currentSort,
    getNextDesc: () => {
      desc = desc || getUrl("desc");
      let nextDesc;
      const bSorted = util.isSorted();
      if (bSorted) {
        nextDesc = 0 === desc * 1 ? 1 : 0;
      } else {
        nextDesc = 1;
      }
      return nextDesc;
    },
  };

  return { component, handler, href, icon, iconStyle, children, util, others };
};

const SortLink = (props) => {
  const { component, handler, href, icon, iconStyle, children, util, others } =
    useSortLink(props);
  let child = children;
  if (icon) {
    const bSorted = util.isSorted();
    const thisIcon = bSorted ? (
      <Dropdown type={util.getNextDesc() ? "up" : null} />
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
