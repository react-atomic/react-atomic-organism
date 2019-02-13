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
import {doc} from 'win-doc';

class SortLink extends PureComponent {
  static defaultProps = {
    component: 'a',
    icon: true,
    sortKeyName: 'sort'
  };

  state = {};

  handleClick = e => {
    const {onClick, sortKeyName} = this.props;
    const target = e.currentTarget;
    const nextSort = target.getAttribute('data-sort');
    const nextDesc = this.getNextDesc();
    const sort2 = target.getAttribute('data-sort2');
    const slice = target.getAttribute('data-slice');
    let url = target.getAttribute('data-url') || doc().URL;
    if (nextSort) {
      url = seturl(sortKeyName, nextSort, url);
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
    const props = this.props;
    const nextSort = get(props, ['data-sort']);
    return nextSort === props.sort;
  }

  render() {
    const {
      icon,
      iconStyle,
      component,
      children,
      sortKeyName,
      sort,
      desc,
      ...props
    } = this.props;
    let {href} = this.state;

    if (!href) {
      const thisSort = get(props, ['data-sort'], '');
      href = '#' + thisSort;
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
        <SemanticUI style={Styles.inner}>
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
    height: 12,
  },
  inner: {
    whiteSpace: 'nowrap',
  },
};
