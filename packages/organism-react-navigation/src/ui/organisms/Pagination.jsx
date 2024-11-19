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
import {
  CURRENT_PAGE,
  BACKWARD_PAGE,
  FORWARD_PAGE,
  BEGIN,
  END
} from "../../paginationCalculator";

const isArray = Array.isArray;
const plusOne = (i) => i + 1;
const getFromTo = (from, to) => {
  return plusOne(from) + "-" + plusOne(to);
};

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
    title={getFromTo(props[BEGIN], props[END])}
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
      {pageList.map((v, k) => {
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
