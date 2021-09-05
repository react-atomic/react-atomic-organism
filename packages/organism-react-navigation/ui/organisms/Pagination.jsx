import React from "react";
import callfunc from "call-func";
import get from "get-object-value";

import {
  build,
  min,
  mixClass,
  lazyInject,
  Item,
  Menu,
} from "react-atomic-molecule";

const isArray = Array.isArray;
const plusOne = (i) => i + 1;
const getFromTo = (from, to) => {
  return plusOne(from) + "-" + plusOne(to);
};

const keys = Object.keys;

const BasePage = (props) => {
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
            begin: props[0],
            end: props[1],
            page: props["currentPage"],
            perPageNum: props["perPageNum"],
          },
        ])
    : null;
  return build(component)(
    {
      rel,
      title: getFromTo(props[0], props[1]),
      className: classes,
      href: url,
      style,
      onClick,
      "data-begin": props[0],
      "data-end": props[1],
      "data-page": props["currentPage"],
      "data-per-page-num": props["perPageNum"],
    },
    children
  );
};

const Page = (props) => <BasePage {...props}>{props.currentPage}</BasePage>;

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

const Current = (props) => (
  <Item
    style={props.style}
    title={getFromTo(props[0], props[1])}
    className={mixClass("active", props.className)}
  >
    {props.currentPage}
  </Item>
);

const FirstPage = (props) => <Page {...props} />;

const LastPage = (props) => <Page {...props} />;

const Ellipsis = (props) => (
  <Item
    className="disabled ellipsis"
    style={{ minWidth: 0, width: 0, ...props.style }}
  >
    ...
  </Item>
);

const Pagination = (pg) => {
  injects = lazyInject(injects, InjectStyles);
  const {
    linkComponent,
    onPageChange,
    forwardText,
    backwardText,
    ui,
    currentPageProps = {},
  } = pg;
  let firstPage;
  let firstEllipsis;
  let lastPage;
  let lastEllipsis;
  const pageProps = pg.pageProps || {};
  pageProps.onPageChange = onPageChange;
  pageProps.component = linkComponent;
  const ellipsisProps = { ...pageProps, onPageChange: null };
  if (pg.firstPage) {
    firstPage = <FirstPage {...pg.firstPage} {...pageProps} />;
    firstEllipsis = <Ellipsis {...ellipsisProps} />;
  }
  if (pg.lastPage) {
    lastPage = <LastPage {...pg.lastPage} {...pageProps} />;
    lastEllipsis = <Ellipsis {...ellipsisProps} />;
  }
  const pgList = pg.list;
  if (!isArray(pgList)) {
    console.error("Page list not array", pg);
  }
  return (
    <Menu className="compact pagination" ui={ui}>
      {firstPage}
      {firstEllipsis}
      {pgList.map((v, k) => {
        const current = pg.currentPage;
        if (v.currentPage) {
          if (
            (current.backward &&
              current.backward.currentPage === v.currentPage) ||
            (current.forward && current.forward.currentPage === v.currentPage)
          ) {
            return null;
          }
          return <Page {...pageProps} key={k} {...v} />;
        } else {
          const re = [];
          if (current.backward) {
            re.push(
              <Backward
                text={backwardText}
                {...current.backward}
                {...pageProps}
                style={{ ...pageProps.style, display: "flex" }}
              />
            );
          }
          re.push(
            <Current
              key={k}
              {...pageProps}
              {...current}
              {...currentPageProps}
              style={{
                ...pageProps.style,
                ...currentPageProps.style,
                display: "flex",
              }}
            />
          );
          if (current.forward) {
            re.push(
              <Forward
                isLastPage={pgList.length - 2 === k}
                {...current.forward}
                text={forwardText}
                {...pageProps}
                style={{ ...pageProps.style, display: "flex" }}
              />
            );
          }
          return re;
        }
      })}
      {lastEllipsis}
      {lastPage}
    </Menu>
  );
};
Pagination.defaultProps = {
  linkComponent: "a",
  forwardText: "> Next",
  backwardText: "<",
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
