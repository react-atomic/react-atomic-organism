import React, {
  PureComponent,
  isValidElement,
  cloneElement,
  createElement,
} from 'react';
import seturl, {getUrl} from 'seturl';
import SortIcon from 'ricon/Sort';
import Dropdown from 'ricon/Dropdown';
import {SemanticUI, Icon} from 'react-atomic-molecule';
import get from 'get-object-value';

class SortLink extends PureComponent {
  static defaultProps = {component: 'a', icon: true};

  state = {};

  handleClick = e => {
    const {onClick} = this.props;
    const target = e.currentTarget;
    const nextSort = target.getAttribute('data-sort');
    const nextDesc = this.getNextDesc();
    const sort2 = target.getAttribute('data-sort2');
    const slice = target.getAttribute('data-slice');
    let url = target.getAttribute('data-url') || document.URL;
    if (nextSort) {
      url = seturl('sort', nextSort, url);
      url = seturl('desc', nextDesc, url);
    }
    if (sort2) {
      url = seturl('sort2', sort2, url);
      url = seturl('slice', slice, url);
    }
    target.href = url;
    if ('function' === typeof onClick) {
      onClick(e, {nextSort, nextDesc});
    }
    this.setState({href: url});
  };

  getSorted() {
    let {sort} = this.props;
    if (!sort) {
      sort = getUrl('sort');
    }
    return sort;
  }

  getNextDesc() {
    let {desc} = this.props;
    if ('undefined' === typeof desc) {
      desc = getUrl('desc');
    }
    let nextDesc;
    const isSorted = this.isSorted();
    if (isSorted) {
      nextDesc = 0 === desc * 1 ? 1 : 0;
    } else {
      nextDesc = 1;
    }
    return nextDesc;
  }

  isSorted() {
    const nextSort = get(this, ['props', 'data-sort']);
    const sorted = this.getSorted();
    return nextSort === sorted;
  }

  render() {
    const {
      icon,
      iconStyle,
      component,
      children,
      sort,
      desc,
      ...props
    } = this.props;
    let {href} = this.state;

    if (!href) {
      const thisSort = get(props, ['data-sort'], '');
      href ='#' + thisSort;
    }

    const build = isValidElement(component) ? cloneElement : createElement;
    let child = children;
    if (icon) {
      const bSorted = this.isSorted();
      const thisIcon = bSorted ? (
        <Dropdown type={this.getNextDesc() ? 'up' : null} />
      ) : (
        <SortIcon style={{...Styles.sortIcon, ...iconStyle}} />
      );
      child = (
        <SemanticUI>
          {children}
          <Icon style={Styles.icon}>{thisIcon}</Icon>
        </SemanticUI>
      );
    }
    return build(
      component,
      {
        ...props,
        onClick: this.handleClick,
        href,
      },
      child,
    );
  }
}

export default SortLink;

const Styles = {
  sortIcon: {
    fill: '#ccc',
  },
  icon: {
    width: 12,
  }
};
