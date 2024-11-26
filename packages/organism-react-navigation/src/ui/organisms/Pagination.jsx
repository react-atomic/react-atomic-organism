// @ts-check

import * as React from "react";
import callfunc from "call-func";
import get from "get-object-value";

import {
  build,
  min,
  mixClass,
  useLazyInject,
  Item,
  Menu,
} from "react-atomic-molecule";
import { options } from "count-pagination";

const { CURRENT_PAGE, BACKWARD_PAGE, FORWARD_PAGE, BEGIN, END } = options;

const isArray = Array.isArray;
const plusOne = (/**@type number*/ i) => i + 1;
const getFromTo = (/**@type number*/ from, /**@type number*/ to) => {
  return plusOne(from) + "-" + plusOne(to);
};

const BasePage = (/**@type any*/ props) => {
  const { onPageChange, component, className, children, style, url, rel } =
    props;
  const classes = mixClass(
    get(component, ["props", "className"]),
    className,
    "item link"
  );
  const onClick = onPageChange
    ? () =>
        callfunc(onPageChange, [
          {
            begin: props[BEGIN],
            end: props[END],
            page: props["currentPage"],
            perPageNum: props["perPageNum"],
          },
        ])
    : null;
  return build(component)(
    {
      rel,
      title: getFromTo(props[BEGIN], props[END]),
      className: classes,
      href: url,
      style,
      onClick,
      "data-begin": props[BEGIN],
      "data-end": props[END],
      "data-page": props["currentPage"],
      "data-per-page-num": props["perPageNum"],
    },
    children
  );
};

const Page = (/**@type any*/ props) => (
  <BasePage {...props}>{props.currentPage}</BasePage>
);

const Forward = ({ isLastPage, text, ...props }) => (
  <BasePage {...props} rel="next">
    {isLastPage ? props.currentPage : text}
  </BasePage>
);

const Backward = ({ text, ...props }) => {
  return (
    <BasePage {...props} rel="prev">
      {props.currentPage === 1 ? props.currentPage : text}
    </BasePage>
  );
};

const Current = (/**@type any*/ props) => (
  <Item
    style={props.style}
    title={getFromTo(props[BEGIN], props[END])}
    className={mixClass("active", props.className)}
  >
    {props.currentPage}
  </Item>
);

const FirstPage = (/**@type any*/ props) => <Page {...props} />;

const LastPage = (/**@type any*/ props) => <Page {...props} />;

const Ellipsis = (/**@type any*/ props) => (
  <Item
    className="disabled ellipsis"
    style={{ minWidth: 0, width: 0, ...props.style }}
  >
    ...
  </Item>
);

const Pagination = (/**@type any*/ pg) => {
  injects = useLazyInject(InjectStyles, injects);
  const {
    linkComponent = "a",
    forwardText = "> Next",
    backwardText = "<",
    onPageChange,
    ui,
    currentPageProps = {},
    pageList,
    navigate,
  } = pg;
  let firstPage;
  let firstEllipsis;
  let lastPage;
  let lastEllipsis;
  const pageProps = pg.pageProps || {};
  pageProps.onPageChange = onPageChange;
  pageProps.component = linkComponent;
  const ellipsisProps = { ...pageProps, onPageChange: null };
  if (navigate.firstPage) {
    firstPage = <FirstPage {...navigate.firstPage} {...pageProps} />;
    firstEllipsis = <Ellipsis {...ellipsisProps} />;
  }
  if (navigate.lastPage) {
    lastPage = <LastPage {...navigate.lastPage} {...pageProps} />;
    lastEllipsis = <Ellipsis {...ellipsisProps} />;
  }
  if (!isArray(pageList)) {
    console.error("Page list not array", pg);
  }

  return (
    <Menu className="compact pagination" ui={ui}>
      {firstPage}
      {firstEllipsis}
      {pageList.map((/**@type any*/ v, /**@type number*/ k) => {
        switch (v.navigate) {
          case CURRENT_PAGE:
            return (
              <Current
                {...pageProps}
                key={k}
                {...v}
                {...currentPageProps}
                style={{
                  ...pageProps.style,
                  ...currentPageProps.style,
                  display: "flex",
                }}
              />
            );
          case BACKWARD_PAGE:
            return (
              <Backward
                {...pageProps}
                key={k}
                {...v}
                style={{ ...pageProps.style, display: "flex" }}
                text={backwardText}
              />
            );
          case FORWARD_PAGE:
            return (
              <Forward
                {...pageProps}
                key={k}
                {...v}
                style={{ ...pageProps.style, display: "flex" }}
                text={forwardText}
                isLastPage={pageList.length - 2 === k}
              />
            );
          default:
            return <Page {...pageProps} key={k} {...v} />;
        }
      })}
      {lastEllipsis}
      {lastPage}
    </Menu>
  );
};
export default Pagination;

let injects;
const pgCssSelector = ".pagination.ui.menu:not(.vertical) .item";
const InjectStyles = {
  hidePg: [
    {
      display: "none",
      minWidth: "2rem",
      justifyContent: "center",
    },
    pgCssSelector,
  ],
  showPg: [
    {
      display: "flex",
    },
    [min.sm, pgCssSelector],
  ],
};
