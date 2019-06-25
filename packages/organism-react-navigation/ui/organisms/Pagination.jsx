import React from 'react';
import callfunc from 'call-func';
import get from 'get-object-value';

import {
  build,
  min,
  mixClass,
  lazyInject,
  Item,
  Menu,
} from 'react-atomic-molecule';

const isArray = Array.isArray;
const plusOne = i => i + 1;
const getFromTo = (from, to) => {
  return plusOne(from) + '-' + plusOne(to);
};

const BasePage = props => {
  const {onPageChange, component, className, children, style, url, rel} = props;
  const classes = mixClass(
    get(component, ['props', 'className']),
    className,
    'item link',
  );
  const onClick = onPageChange ? 
    () => callfunc(onPageChange, [{
      begin: props[0],
      end: props[1],
      page: props['currentPage'],
      perPageNum: props['perPageNum']
    }]):
    null;
  return build(component)(
    {
      rel,
      title: getFromTo(props[0], props[1]),
      className: classes,
      href: url,
      style,
      onClick,
      'data-begin': props[0],
      'data-end': props[1],
      'data-page': props['currentPage'],
      'data-per-page-num': props['perPageNum'],
    },
    children,
  );
};

const Page = props => <BasePage {...props}>{props.currentPage}</BasePage>;

const Forward = ({isLastPage, text, ...props}) => (
  <BasePage {...props} style={{display: 'inline'}} rel="next">
    {isLastPage ? props.currentPage : text}
  </BasePage>
);

const Backward = ({text, ...props}) => {
  return (
    <BasePage {...props} style={{display: 'inline'}} rel="prev">
      {props.currentPage === 1 ? props.currentPage : text}
    </BasePage>
  );
};

const Current = props => (
  <Item
    title={getFromTo(props[0], props[1])}
    className="active"
    style={{display: 'inline'}}>
    {props.currentPage}
  </Item>
);

const FirstPage = props => <Page {...props} />;

const LastPage = props => <Page {...props} />;

const Ellipsis = props => (
  <Item
    className="disabled ellipsis"
    style={{ minWidth: 0, width: 0 }}>
    ...
  </Item>
);

const Pagination = pg => {
  injects = lazyInject(injects, InjectStyles);
  const {linkComponent, onPageChange, forwardText, backwardText} = pg;
  let firstPage;
  let firstEllipsis;
  let lastPage;
  let lastEllipsis;
  if (pg.firstPage) {
    firstPage = (
      <FirstPage
        {...pg.firstPage}
        component={linkComponent}
        onPageChange={onPageChange}
      />
    );
    firstEllipsis = <Ellipsis />;
  }
  if (pg.lastPage) {
    lastPage = (
      <LastPage
        {...pg.lastPage}
        component={linkComponent}
        onPageChange={onPageChange}
      />
    );
    lastEllipsis = <Ellipsis />;
  }
  const pgList = pg.list;
  if (!isArray(pgList)) {
    console.error('Page list not array', pg);
  }
  return (
    <Menu className="compact pagination">
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
          return (
            <Page
              key={k}
              {...v}
              component={linkComponent}
              onPageChange={onPageChange}
            />
          );
        } else {
          const re = [];
          if (current.backward) {
            re.push(
              <Backward
                text={backwardText}
                {...current.backward}
                component={linkComponent}
                onPageChange={onPageChange}
              />,
            );
          }
          re.push(
            <Current
              key={k}
              {...current}
              component={linkComponent}
              onPageChange={onPageChange}
            />,
          );
          if (current.forward) {
            re.push(
              <Forward
                isLastPage={pgList.length - 2 === k}
                {...current.forward}
                component={linkComponent}
                text={forwardText}
                onPageChange={onPageChange}
              />,
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
  linkComponent: 'a',
  forwardText: '> Next',
  backwardText: '<',
};
export default Pagination;

let injects;
const pgCssSelector = '.pagination.ui.menu:not(.vertical) .item';
const InjectStyles = {
  hidePg: [
    {
      display: 'none',
      minWidth: '2rem',
      justifyContent: 'center',
    },
    pgCssSelector,
  ],
  showPg: [
    {
      display: 'flex',
    },
    [min.sm, pgCssSelector],
  ],
};
